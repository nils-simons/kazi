mapboxgl.accessToken = "pk.eyJ1Ijoibmlsc3NpbW9ucyIsImEiOiJjbDZmN2IxNDgwZWp3M2lyd2k0MzF0dzJzIn0.H3x09JSqZ1v9GimpTgmxOw";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/nilssimons/cl6f7jbry000y14ljf24tw7s8",
    center: [6.08400, 50.77535], // starting center in [lng, lat]
    zoom: 13, // starting zoom
    projection: 'globe' // display map as a 3D globe
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('load', () => {
    // Load an image from an external URL.
    map.loadImage(
        '../assets/img/logo.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('dispenser', image);
    });

    features = []

    db.collection('dispensers').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data = doc.data()
            features.push({
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': data.coords
                },
                'properties': {
                    'dispenser_id': doc.id,
                }
            })
        });

        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': features
            }
        });
    
        map.addLayer({
            'id': 'dispensers',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'minzoom': 10,
            'layout': {
                'icon-image': 'dispenser', // reference the image
                'icon-size': 0.09
            }
        });
    
        map.on('click', 'dispensers', (e) => {
            openCase(e.features[0].properties.dispenser_id)
        })
        
    })

    
});



map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);



function openCase(id) {
    window.location.href = `/buy?dispenser_id=${id}`
}
