function init() {
  buildMap();
  // getData();
  // getOptions();
};

init();

function buildMap() {
  
  // Mapbox API
  var mapbox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
               "access_token=pk.eyJ1IjoiYmhhcmF0aHktbmF0cyIsImEiOiJjamRoa2RrdHcwem12MndvMXpmM2Z5YnM1In0.4zch_H0WTdg4af5YTLvImg." + 
               "T6YbdDixkOBWH_k9GbS8JQ";

  // Make map title layer
  var myMap = L.map("mapid", {
    center: [38.32, -95.67],
    zoom: 4.1,
    minZoom: 4,
    maxZoom: 10,
    scrollWheelZoom: false
  });
  
  // Adding tile layer to the map
  L.tileLayer(mapbox).addTo(myMap)
  
  // API Query URL
  var url = '/cluster_data';

  // // Grabbing the data with d3..
  Plotly.d3.json(url, function(error, response) {
    if (error) return console.warn(error);
      // Creating a new marker cluster group
      var markers = L.markerClusterGroup();
      // Loop through our data...
      for (var i = 0; i < response.length; i++) {
        // set the data location property to a variable
        var location= response[i].coordinates;
        console.log(location);
        // If the data has a location property...
        markers.addLayer(L.marker([location[0], location[1]]).bindPopup(("<h3>Region: " + response[i].region + "</h3><hr><h4>Number of Grape Varieties: " + response[i].variety_count +"</h4>" ) ));
      };
      
      // Add our marker cluster layer to the map
      myMap.addLayer(markers);
  });

};

// function getData() {
//   // Use a request to grab the entire data set
//   Plotly.d3.json("/tabledata", function(error, data) {
//       if (error) return console.warn(error);
//       // need to set timeout conditional on data loading
//       buildTable(data);
//   });
// };

// function buildTable(data) {
//   var tableArray =[];
//   for (i = 0; i < data.length; i++) { 
//       tableArray.push([data[i]["country"], data[i]["description"], data[i]["points"], data[i]["price"], data[i]["province"], data[i]["region_1"], data[i]["title"], data[i]["variety"], data[i]["winery"]]);
//   }
//   $(document).ready(function() {
//       $('#rawData').DataTable( {
//           data: tableArray,
//           columns: [
//               { title: "Country" },
//               { title: "Description" },
//               { title: "Points" },
//               { title: "Price" },
//               { title: "State" },
//               { title: "Region" },
//               { title: "Title" },
//               { title: "Variety" },
//               { title: "Winery" },            
//           ]
//       } );
//   } );
// };

// function getOptions(){
//   var selector = document.getElementById('selDataset');
//   Plotly.d3.json('/states', function(error, stateNames) {
//       console.log(stateNames);
//       for (var i = 0; i < stateNames.length;  i++) {
//           var currentOption = document.createElement('option');
//           currentOption.text = stateNames[i];
//           currentOption.value = stateNames[i]
//           selector.appendChild(currentOption);
//       }

//       getrawData(stateNames[0], buildCharts);
//   })
// }

// function getrawData(state, callback) {
//   console.log("GetData");
//   // Use a request to grab the json data needed for all charts
//   Plotly.d3.json(`/stateData/${state}`, function(error, stateData) {
//       if (error) return console.warn(error);
//       console.log("Executed");
//       callback(stateData);
//       });
//   }

// function buildCharts(stateData) {
//   console.log("BuuildCharts");

//   var trace1 = {
//       x: stateData[0]['Variety'],
//       y: stateData[0]['Avg_Price'],
//       name: 'Avg Price',
//       type: 'bar'
//       };

//       var trace2 = {
//       x: stateData[0]['Variety'],
//       y: stateData[0]['Avg_Points'],
//       name: 'Avg Points',
//       type: 'bar'
//       };

//       var data = [trace1, trace2];

//       var layout ={
//           barmode: 'group',
//           xaxis:{title:"Varieties of Grapes"},
//           yaxis:{title:"Price and Points"}
//       };

//       Plotly.newPlot('bar', data, layout);
  
//       for (var st in stateData) {
//           string = stateData[st];
//           }

// }

// function optionChanged(newState) {
//   console.log("optionchanged");
//   // Fetch new data each time a new sample is selected
//   getData(newState, buildCharts);
// }

// function updateChart(){

// }



