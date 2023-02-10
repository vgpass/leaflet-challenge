// Store our API endpoint as queryUrl.
var queryUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-01-23&endtime=2023-02-06&maxlongitude=-65&minlongitude=-125&maxlatitude=50&minlatitude=25'
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data);//.features[0].geometry.coordinates);
  // var quakeMarkers = [];
 
L.control.layers(baseMaps).addTo(myMap);
  let quakes = data.features;
  for (var i = 0; i < quakes.length; i++) {
    // create the markers for each earthquake in the array.
    // console.log(quakes[i].geometry.coordinates[0])
    L.circle([quakes[i].geometry.coordinates[1], quakes[i].geometry.coordinates[0]], {
      fillOpacity: .50,
      color: 'black',
      weight: .75,
      fillColor: markerColor(quakes[i].geometry.coordinates[2]),
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its magnitude.
      radius: markerSize(quakes[i].properties.mag)
    }).bindPopup(`<h1>Location: ${quakes[i].properties.place}</h1> <hr> <h3>Location: ${quakes[i].geometry.toLocaleString()}</h3>`).addTo(myMap)
}

});

// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(magnitude) {
  return magnitude * magnitude * 5000
};
// Define a markerColor function that will give each marker a different color based on it's depth.
function markerColor(depth) {
  //let color = [];
  if (depth < 10) {
    return 'lime'
  } else if (depth <= 30) {
    return 'greenyellow'
  } else if (depth <= 50) {
    return 'yellow'
  } else if (depth <= 70) {
    return 'gold'
  } else if (depth <= 90) {
    return 'orange'
  } else return 'red'
};
// var quakeMarkers = [];
//function to make Markers for earthquakes within the past two weeks in the continental US.
// function makeMarkers(data) {
//   var quakeMarkers = [];
//   let quakes = data.features;
//   // console.log(quakes.length);
// // Loop through the earthquake array, and create one marker for each earthquake object.
//     for (var i = 0; i < quakes.length; i++) {
//       // create the markers for each earthquake in the array.
//       console.log(quakes[i].properties.place)
//       quakeMarkers.push(
//         L.circleMarker([quakes[i].geometry.coordinates[0], quakes[i].geometry.coordinates[1]], {
//         fillOpacity: .25,
//         color: 'red',
//         fillColor: 'red',
//         // Setting our circle's radius to equal the output of our markerSize() function:
//         // This will make our marker's size proportionate to its magnitude.
//         radius: quakes[i].properties.mag * 10000000//markerSize(quakes[i].properties.mag)
//       }).bindPopup(`<h1>Location: ${quakes[i].properties.place}</h1> <hr> <h3>Location: ${quakes[i].geometry.toLocaleString()}</h3>`)//.addTo(myMap)
//       );
//   return quakeMarkers
  // var quakeLocations = L.layerGroup(quakeMarkers);

// }};
// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// var cities = L.layerGroup(cityMarkers);
// Create a baseMaps object.
var baseMaps = {
"Street Map": street
// "Topographic Map": topo
};
// Define a map object.
var myMap = L.map("map", {
center: [40.76031, -111.88822],
zoom: 5.49,
minZoom: 1,
layers: [street]
});
