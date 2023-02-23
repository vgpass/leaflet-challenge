// logic.js file for Vincent Passanisi, Module 15 Challenge BONUS ASSIGNMENT

// Get current date and the date two weeks prior and store to variables
const date = new Date();
var fortNight = new Date(Date.now() - 12096e5);
var today = date.toISOString().replace(/T\S+/, '');
var twoWeeksago = fortNight.toISOString().replace(/T\S+/, '');

// Store our API endpoint as queryUrl using two weeks of data
var queryUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${twoWeeksago}&endtime=${today}`;

// var techtonicUrl = 'https://github.com/fraxen/tectonicplates/blob/339b0c56563c118307b1f4542703047f5f698fae/GeoJSON/PB2002_boundaries.json'

// Promise function to retrieve the data
d3.json(queryUrl).then(function (data) {
  
  var myStyle = {
    "color": "#FF00FF",
    "weight": 3.75,
    "opacity": 0.65
  };
  
    // variable to hold the earthquake features data
    let quakes = data.features;
    // create a layer group for the circle markers
    var circles = L.layerGroup();
    // add the layer group to the map
    myMap.addLayer(circles);
    // loop to create the circle markers for the map
    for (var i = 0; i < quakes.length; i++) {

      // create the markers for each earthquake in the array.
      L.circle([quakes[i].geometry.coordinates[1], quakes[i].geometry.coordinates[0]], {
        fillOpacity: .50,
        color: 'black',
        weight: .75,
        // Setting the circle color based on the depth of the earthquake
        fillColor: markerColor(quakes[i].geometry.coordinates[2]),
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its magnitude.
        radius: markerSize(quakes[i].properties.mag)
      }).bindPopup(`<h1>Location: ${quakes[i].properties.place}</h1> <hr> <h2>Magnitude: ${quakes[i].properties.mag}</h2> 
                    <hr> <h2>Depth: ${quakes[i].geometry.coordinates[2]} km</h2>`).addTo(circles)
    };

    d3.json('static/js/data.json').then(function (geoData) {
      // create layer group for techtonic plates
      var plates = L.layerGroup();
      // add the layer group to the map
      myMap.addLayer(plates);
      // create the techtonic markers
      L.geoJson(geoData, {
        style: myStyle
      }).addTo(plates);
      // wait for the data to fully load before assigning the variable
      if (typeof plates !== 'undefined' | typeof circles !== 'undefined') {
        var overlayMaps = {
          "Techtonic Plates": plates,
          "Earthquakes": circles
          };
          // L.control.layers(baseMaps, overlayMaps).addTo(myMap); 
        };
  
      L.control.layers(baseMaps, overlayMaps).addTo(myMap); 
      });  // overlayMaps.push("Earthquakes", circles)
  
  // Create the legend using the same colors as the markers
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<h3>Event Depth (km)</h3>";
    var grades = [-10, 10, 30, 50, 70, 90];
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

var ocean = L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy;' + 'http://alexurquhart.github.io/free-tiles/#'
});
var outdoor = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>'
});
var mapLink = '<a href="http://www.esri.com/">Esri</a>';
var wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
var satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; '+mapLink+', '+wholink,
});
var gray = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>'
});


// Create a baseMaps object.
var baseMaps = {
"Satellite": satellite,
"Grayscale": gray,
"Outdoor": outdoor,
"World Ocean Base": ocean
};

// Define a map object.
var myMap = L.map("map", {
center: [40.76031, -111.88822],
zoom: 5.49,
minZoom: 1,
layers: [satellite]
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
