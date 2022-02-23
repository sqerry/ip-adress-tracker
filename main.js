const searchInputValue = document.querySelector("#searchInputValue");
const searchBtn = document.querySelector("#search-btn");
const ipAddressDiv = document.querySelector("#ip-address");
const locationDiv = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const ispValue = document.querySelector("#ispValue");

let lat = 0;
let lng = 0;
var map = map = L.map('map').setView([lat, lng], 13);
let marker = L.marker([lat, lng]).addTo(map);

function setUpMap(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibmF3ZmVsc2VrcmFmaSIsImEiOiJja3lpanl4MGsyY3llMnBwOG50cmM5Mzc4In0.D_BIGmuTHKQIRJEPv-M3XQ'
    }).addTo(map);
}

searchBtn.addEventListener('click', function(){
 getData(searchInputValue.value);
});

searchInputValue.addEventListener('keyup', function(e){
    if(e.code =='Enter')getData(searchInputValue.value);
 })

//get geo location data
function getData(ipAddress){
    let Apilink = "https://geo.ipify.org/api/v2/country,city?apiKey=at_YpbtjU2JPJmlduQFc5y5yV3xJeu3Z";
    if (ipAddress === undefined){
        fetch(Apilink)
        .then(res => res.json())
        .then(data =>{
            ipAddressDiv.innerHTML = data.ip;
            ispValue.innerHTML = data.isp;
            locationDiv.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
            timezone.innerHTML = `UTC ${data.location.timezone}`;
             lat = data.location.lat;
             lng = data.location.lng;
             map.panTo(new L.LatLng(lat, lng));
             marker = L.marker([lat, lng]).addTo(map);
            });
       
    }else {
        Apilink += "&ipAddress="+ ipAddress;
        fetch(Apilink)
        .then(res => res.json())
        .then(data =>{
            ipAddressDiv.innerHTML = data.ip;
            ispValue.innerHTML = data.isp;
            locationDiv.innerHTML = `${data.location.city}, ${data.location.region} ${ data.location.postalCode}`
            timezone.innerHTML = `UTC ${data.location.timezone}`
             lat = data.location.lat;
             lng = data.location.lng;
             map.panTo(new L.LatLng(lat, lng));
             marker = L.marker([lat, lng]).addTo(map);
            });
    }
        
}

window.addEventListener('load', function() {
    setUpMap();
    getData();
})

