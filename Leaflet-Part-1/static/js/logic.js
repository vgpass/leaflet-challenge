// logic.js file for Vincent Passanisi, Module 15 Challenge

// Get current date and the date two weeks prior and store to variables
const date = new Date();
var fortNight = new Date(Date.now() - 12096e5);
var today = date.toISOString().replace(/T\S+/, '');
var twoWeeksago = fortNight.toISOString().replace(/T\S+/, '');

// Store our API endpoint as queryUrl using two weeks of data
var queryUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${twoWeeksago}&endtime=${today}&maxlongitude=-65&minlongitude=-125&maxlatitude=50&minlatitude=25`;


// Promise function to retrieve the data
d3.json(queryUrl).then(function (data) {
  // Console log the query response
  console.log(data);
 
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
      }).bindPopup(`<h1>Location: ${quakes[i].properties.place}</h1> <hr> <h2>Magnitude: ${quakes[i].properties.mag}</h2> 
                    <hr> <h2>Depth: ${quakes[i].geometry.coordinates[2]} km</h2>`).addTo(myMap)
  }
  // Create the legend using the same colors as the markers
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<h3>Event Depth (km)</h3>";
    var grades = [0, 10, 30, 50, 70, 90];
    var labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var m = 0; m < grades.length; m++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[m] + 1) + '"></i> ' +
            grades[m] + (grades[m + 1] ? '&ndash;' + grades[m + 1] + '<br>' : '+');
    }
    
    return div;
  };

  legend.addTo(myMap);

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


// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
var baseMaps = {
"Street Map": street,
"Topographic Map": topo
};

// Define a map object.
var myMap = L.map("map", {
center: [40.76031, -111.88822],
zoom: 5.49,
minZoom: 1,
layers: [street]
});

// getColor function for legend to create colors to match marker colors
function getColor(d) {
  return d > 90  ? 'red' :
         d > 70  ? 'orange' :
         d > 50  ? 'gold' :
         d > 30  ? 'yellow' :
         d > 10  ? 'greenyellow' :
                   'lime';
};
