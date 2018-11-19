var map = L.map('map').setView([-33.91, 18.41], 11)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const appId = 'XwmXLP8nd3wWtksuCDTN'
const appCode = 'WvsY2YbVLAdw4aKx_16qtw'

const autocompleteUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&query="
  
const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&searchtext="

var app = new Vue({
    el: '#app',
    data: {
        startAddress: '',
        destinationAddress: '',
        autoCompleteResults: [],
        startPoint: undefined,
        endPoint: undefined,
    },
    methods: {
        autocomplete: function () {
            var _this = this
            if(this.startAddress.length < 5) {
                return false
            }

            fetch(autocompleteUrl + this.startAddress)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    _this.autoCompleteResults = response.suggestions
                })
        },
        autocompleteDestination: function () {
            var _this = this
            if(this.destinationAddress.length < 5){
                return false
            }

            fetch(autocompleteUrl + this.destinationAddress)
                .then(function(response){
                    return response.json()
                })
                .then(function(response){
                    _this.autoCompleteResults = response.suggestions
                })
        },
        resultSelect: function (result) {
            var _this = this
            fetch(geocodeUrl + result.label)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    var location = response.Response.View[0].Result[0].Location.DisplayPosition
                    _this.startPoint = L.marker([location.Latitude, location.Longitude]).addTo(map)
                    _this.autoCompleteResults = []                    
                })
        },

        resultSelect: function (result) {
            var _this = this
            fetch(geocodeUrl + result.label)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    var location = response.Response.View[0].Result[0].Location.DisplayPosition
                    _this.endPoint = L.marker([location.Latitude, location.Longitude]).addTo(map)
                    _this.autoCompleteResults = []                    
                })
        },
    }
})

// create a client here: https://developer.whereismytransport.com/clients
var CLIENT_ID = '14f336f1-f201-4a9c-a472-23f920c7bb5b';
var CLIENT_SECRET = 'gbKKscA6LgKUQKAUMKhQktoFfXOc4UeV4W5I51YjTos=';
var payload = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  grant_type: 'client_credentials',
  scope: 'transportapi:all'
};
var request = new XMLHttpRequest();
request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
request.addEventListener('load', function () {
  var response = JSON.parse(this.responseText);
  var token = response.access_token;
  window.token = token;
});
request.setRequestHeader('Accept', 'application/json');
var formData = new FormData();

for (var key in payload) {
  formData.append(key, payload[key]);
}

request.send(formData);

var token = window.token; // retrieved in previous request;

var body = {
  geometry: {
    type: 'Multipoint',
    coordinates: [[18.395448, -33.909531], [18.416798, -33.912683]]
  }
};
var request = new XMLHttpRequest();
request.addEventListener('load', function () {
  var response = JSON.parse(this.responseText);
  console.log('Response', response);
});
request.open('POST', 'https://platform.whereismytransport.com/api/journeys', true);
request.setRequestHeader('Accept', 'application/json');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', 'Bearer ' + token);
request.send(JSON.stringify(body));





