d.getElementById('buy').addEventListener('click', async (e) => {
    e.target.disabled = true;
    e.target.textContent = '...';
    d.getElementById('amount').disabled = true;

    var resp = await fetch(`${GCF_SERVER}createPaymentSession`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prodPrice: DISPENSER_DATA.product.stripePrice,
            prodAmount: parseInt(d.getElementById('amount').value),
            user: auth.currentUser.uid,
            dispenser: dis_id,
            name: DISPENSER_DATA.product.name,
            price: DISPENSER_DATA.product.price
        }),
        redirect: 'follow'
    })

    if (!resp.ok) {
        alert('Error creating payment session: ');
        return
    }

    var resp = await resp.json()
    console.log(resp)
    window.location.href = resp.url;
});