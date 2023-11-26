const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const stripe = require("stripe")('sk_test_51NgNsFHS5jXyHOGy69LH4E7Sq5Le7aQusKIyH9UVb5hRko0VP2YXXtNDwC9AmNX4ebEQWE266UhTC8jGa9USjEGR003XiIvHes');


exports.createPaymentSession = onRequest({ cors: true }, async (req, res) => {
    console.log('------------------------------- NEW REQUEST -------------------------------');
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const data = req.body;
    res.setHeader('Content-Type', 'application/json');
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: data.prodPrice,
            quantity: data.prodAmount
          }
        ],
        mode: 'payment',
        metadata: {
            user: data.user,
            dispenser: data.dispenser,
            quantity: parseInt(data.prodAmount),
            product: data.name,
            price: data.price,
        },
        success_url: `https://kazi.nilssimons.me/success?user=${data.user}&dispenser=${data.dispenser}`,
        cancel_url: `http://kazi.nilssimons.me/buy?dispenser_id=${data.dispenser}&reffer=cancel_buy`,
    });
    
    return res.status(200).json({url: session.url});
});


exports.paymentSessionCompleted = onRequest({ cors: true }, async (req, res) => {
    console.log('------------------------------- NEW REQUEST -------------------------------');
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const data = req.body;
    res.setHeader('Content-Type', 'application/json');
    
    if (data.data.object.status !== 'complete' && data.data.object.payment_status !== 'paid') {
        res.status(405)
    }

    const disRef = admin.firestore().collection('dispensers').doc(data.data.object.metadata.dispenser);
    const doc = await disRef.get();
    var disData = doc.data();
    disData.product.stock = (parseInt(disData.product.stock) - parseInt(data.data.object.metadata.quantity))
    await disRef.update({
        product: disData.product
    });

    admin.database().ref(`/${disRef.id}`).update({
        dispense: parseInt(data.data.object.metadata.quantity)
    })

    
    await admin.firestore().collection('users').doc(data.data.object.metadata.user).collection('purchases').doc().set({
        date: new Date(),
        dispenser: disRef.id,
        productName: data.data.object.metadata.product,
        productAmount: data.data.object.metadata.quantity,
        productPrice: data.data.object.metadata.price,
    })

    return res.status(200).json({
        success: true
    });
});
