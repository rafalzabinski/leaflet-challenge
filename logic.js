
var myMap = L.map("map", {
  center: [20, 0],
  zoom: 2
});

// Adding tile layer
L.tileLayer(MAP_URL, {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  //tileSize: 512,
  id: 'mapbox/light-v10',
  accessToken: API_KEY
}).addTo(myMap);

function markerSize(x) {
  return x*30;
}

function determineColor(mag) {
  return mag > 5 ? '#ff6666':
    mag > 4 ? '#ff8c66':
     mag > 3 ? '#ffd966':
      mag > 2 ? '#b3ff66':
      '#66ff66';
    }

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

async function getSat() {
  const response = await fetch(url);
  const data = await response.json();
  var features = data.features;
  // console.log(features[0].geometry.coordinates[0]);
  // console.log(features[0].geometry.coordinates[1]);
  // console.log(features[0].properties.place);
  // console.log(features[0].properties.time);

  for (var i = 0; i < features.length; i++) {
    var Location = [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]
    var mag = + (features[i].properties.mag*1000);

    L.circle(Location, {
    fillOpacity: 0.75,
    color: determineColor(features[i].properties.mag),
    fillColor: determineColor(features[i].properties.mag),
    radius: markerSize(mag)
  }).bindPopup("<h2>Place: " + features[i].properties.place + "</h2> <hr> <h3>Magnitude: " + features[i].properties.mag + "</h3>").addTo(myMap);
    }

};
getSat()
