mapboxgl.accessToken = "pk.eyJ1Ijoibmlsc3NpbW9ucyIsImEiOiJjbDZmN2IxNDgwZWp3M2lyd2k0MzF0dzJzIn0.H3x09JSqZ1v9GimpTgmxOw";




function loadmap() {
    // alert("Loading map");
    console.log(DISPENSER_DATA.coords)
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/nilssimons/cl6f7jbry000y14ljf24tw7s8",
        center: DISPENSER_DATA.coords, // starting center in [lng, lat]
        zoom: 17, // starting zoom
        projection: 'globe', // display map as a 3D globe,
        dragPan: false
    });
    
    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });
    
    
    map.on('load', () => {
        map.loadImage(
            '../assets/img/logo.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('dispenser', image);
        });

        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': DISPENSER_DATA.coords
                    },
                    'properties': {}
                }]
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
    });

    d.getElementsByClassName('mapboxgl-ctrl-logo')[0].style.display = 'none';
}