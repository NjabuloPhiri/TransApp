window.onload = function(){
    loadMap();
}

function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibmphYnVsb3BoaXJpIiwiYSI6ImNqbXQ4anhkajBiZzEzcG8ya2ppMzlxbmQifQ.BsJAlpuLQjIfwiQcLGX8Uw';
    window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [18.4241, -33.9249], // starting position [lng, lat]
    zoom: 9 // starting zoom
    })
    
    //location.assign("file:///home/pgd-swd/Projects/TransApp/Assignment4/route.html");
    window.startPin = new mapboxgl.Marker({draggable: true}).setLngLat([0, 0]).addTo(window.map)
    window.destinationPin = new mapboxgl.Marker({draggable: true}).setLngLat([0, 0]).addTo(window.map)

    window.map.on('click', function(event){
        console.log(event)
        if(window.startPoint == true){
            window.destinationPin.setLngLat(event.lngLat)
            window.startPoint = false
            document.getElementById('destination').value = event.lngLat.lng + ',' + event.lngLat.lat
        } else {
            window.startPin.setLngLat(event.lngLat)
            window.startPoint = true
            document.getElementById('start').value = event.lngLat.lng + ',' + event.lngLat.lat

        }
        
    })
}

const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: 
    'pk.eyJ1IjoibmphYnVsb3BoaXJpIiwiYSI6ImNqbXQ4anhkajBiZzEzcG8ya2ppMzlxbmQifQ.BsJAlpuLQjIfwiQcLGX8Uw' });

    directionsClient
    .getDirections({
      waypoints: [
        {
          coordinates: [13.4301, 52.5109],
          approach: 'unrestricted'
        },
        {
          coordinates: [13.4265, 52.508]
        },
        {
          coordinates: [13.4194, 52.5072],
          bearing: [100, 60]
        }
      ]
    })
    .send()
    .then(response => {
      const directions = response.body;
    });





