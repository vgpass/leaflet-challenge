// Store our API endpoint as queryUrl.
var queryUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-01-23&endtime=2023-02-06&maxlongitude=-65&minlongitude=-125&maxlatitude=50&minlatitude=25'
// var quakeMarkers = [];

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data);//.features[0].geometry.coordinates);
  // var quakeMarkers = [];



  // makeMarkers(data);
  // L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});
// var myMap = L.map("map", {
//   center: [40.76031, -111.88822],
//   zoom: 5.49,
//   layers: [street, quakeLocations]
// });


// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(magnitude) {
  return magnitude * 500000;
};

// Define a markerColor function that will give each marker a different color based on it's depth.
function markerColor(depth) {
  let color = [];
  if (depth < 10) {
    color = 'green'
  } else if (depth <= 30) {
    color = 'lightgreen'
  } else if (depth <= 50) {
    color = 'yellow'
  } else if (depth <= 70) {
    color = 'lightorange'
  } else if (depth <= 90) {
    color = 'orange'
  } else color = 'red'
};
L.control.layers(baseMaps).addTo(myMap);
// var quakeMarkers = [];
//function to make Markers for earthquakes within the past two weeks in the continental US.
// function makeMarkers(data) {
  let quakes = data.features;
  // console.log(quakes.length);
// Loop through the earthquake array, and create one marker for each earthquake object.
    for (var i = 0; i < quakes.length; i++) {
      // create the markers for each earthquake in the array.
      // console.log(quakes[i].properties.place)
      quakeMarkers.push(
        L.circle([quakes[i].geometry.coordinates[1], quakes[i].geometry.coordinates[0]], {
        fillOpacity: 0.5,
        color: 'red',
        fillColor: 'red',
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its magnitude.
        radius: markerSize(quakes[i].properties.mag)
        }).bindPopup(`<h1>Location: ${quakes[i].properties.place}</h1> <hr> <h3>Location: ${quakes[i].geometry.toLocaleString()}</h3>`)//.addTo(myMap)
      );
  
};


// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create two separate layer groups: one for the city markers and another for the state markers.
var quakeLocations = L.layerGroup(quakeMarkers);
console.log(quakeLocations);
// var cities = L.layerGroup(cityMarkers);

// Create a baseMaps object.
var baseMaps = {
"Street Map": street
// "Topographic Map": topo
};

// Create an overlay object.
var overlayMaps = {
"Earthquakes": quakeMarkers,
};

// Define a map object.
var myMap = L.map("map", {
center: [40.76031, -111.88822],
zoom: 5.49,
layers: [street, quakeLocations]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps).addTo(myMap);
// // console.log(quakeMarkers);
// // Create the base layers.
// var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

// // Create two separate layer groups: one for the city markers and another for the state markers.
// // var quakeLocations = L.layerGroup(quakeMarkers);
// // var cities = L.layerGroup(cityMarkers);

// // Create a baseMaps object.
// var baseMaps = {
//   "Street Map": street
//   // "Topographic Map": topo
// };

// // Create an overlay object.
// var overlayMaps = {
//   "Earthquakes": quakeMarkers,
// };

// // Define a map object.
// var myMap = L.map("map", {
//   center: [40.76031, -111.88822],
//   zoom: 5.49,
//   layers: [street, quakeLocations]
// });

// Pass our map layers to our layer control.
// Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);



// create geojson layer from USGS earthquakes data
// const quakeLayer = L.GeoJSONLayer({
//     url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson?format=geojson"
//    }).addTo(myMap);


// // store USGS url in a variable  
// const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php";

// // Promise Pending
// const dataPromise = d3.json(url, format=geojson);
//     console.log("Data Promise: ", dataPromise);
// // d3.selectAll("#selDataset").on("change", function() {
// //   console.log(this.value)
// // });
// require(["esri/layers/GeoJSONLayer"], function(GeoJSONLayer){
//     // points to the states layer in a service storing U.S. census data
//     const geojsonlayer = new GeoJSONLayer({
//       url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
//       copyright: "USGS Earthquakes"
//     });
//     map.add(geojsonlayer);  // adds the layer to the map
//   });

//   // create a geojson layer from geojson feature collection
// const geojson = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         id: 1,
//         geometry: {
//           type: "Polygon",
//           coordinates: [
//             [
//               [100.0, 0.0],
//               [101.0, 0.0],
//               [101.0, 1.0],
//               [100.0, 1.0],
//               [100.0, 0.0]
//             ]
//           ]
//         },
//         properties: {
//           prop0: "value0",
//         }
//       }
//     ]
//   };
  
//   // create a new blob from geojson featurecollection
//   const blob = new Blob([JSON.stringify(geojson)], {
//     type: "application/json"
//   });
  
//   // URL reference to the blob
//   const url = URL.createObjectURL(blob);
//   // create new geojson layer using the blob url
//   const layer = new GeoJSONLayer({
//     url
//   });
// // Function to build charts on initial load and again when a new test subject is selected

// const geojsonLayer = new GeoJSONLayer({
//     url: url,
//     copyright: "USGS Earthquakes",
//     popupTemplate: template
//   });

// function mapBuilder(sampleId) {
// // Fetch the JSON data and console log it
//     d3.json(url).then(function(data) {
//     console.log(data);
// })};  



// Create the tile layer that will be the background of our map.
// var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
// var myMap = L.map("map", {
//     center: [40.76031, -111.88822],
//     zoom: 5.49
//   });
  
//   // Adding a tile layer (the background map image) to our map:
//   // We use the addTo() method to add objects to our map.
// baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson?format=geojson&maxlongitude=-65&minlongitude=-125&maxlatitude=50&minlatitude=25'
// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function (data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createFeatures(data.features);
//   console.log(data);
// });