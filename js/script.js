

var map = L.map('mapdiv')
map.setView([-40.331846, 175.661509],11);

//var bertrudeMarker = L.marker([-40.331846, 175.661509]).addTo(map).bindPopup("<h3 id='sensor1' class='text-center'> Bertrude</h3><img src='img/alan.png' width=200px >");
L.esri.basemapLayer('Imagery').addTo(map);
// L.esri.basemapLayer('ImageryLabels').addTo(map);
// Alternative basemap
// var backgroundLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
// map.addLayer(backgroundLayer);


//LOAD DATA INTO A POPUP WITH TIME DATE
$("#temp").click(function(){
  $.ajax({
    //url:'resources/sensortest.geojson',
    url:'https://kreskos.co.nz/api/temperature/72e306f5-f465-4498-b235-d754721eb9d1',
    type:'GET',
    success: function(response){
      console.log(response[0].degrees_c);
      console.log(response[0].location.latitiude)
      console.log(response[0].location.longitude)

      // bertrudeMarker.setLatLng([next_assetX,next_assetY]);


      // $("#resultsTable").html(response);
      bertrudeMarker.bindPopup(String('The temperature is: ' + response[0].degrees_c)).openPopup();

    },
  })
});


//LOAD THE ANALYSIS
var bufferLayer;
$('#btnBuffer').click(function(){
  if ($('#btnBuffer').html() == 'Buffer') {

    $('#btnBuffer').html("Remove Buffer");
    console.log('no buffer for you buddy')

  } else {

    $('#btnBuffer').html("Buffer");
    }
});



// var mywms = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
//     layers: 'nexrad-n0r-900913',
//     format: 'image/png',
//     transparent: true,
//     attribution: "Weather data © 2012 IEM Nexrad"
// });
// mywms.addTo(map);

$("#zoomTo").click(function(){
  map.setView([-40.331846, 175.661509], 16);
});

map.on('mousemove', function(e){
  var str = "Latitude: "+e.latlng.lat.toFixed(5)+"   Longitude:"+e.latlng.lng.toFixed(5)+"    Zoom Level: "+map.getZoom();
  $("#map_coords").html(str);
});

// code to add pointer to map
// map.on('click', function(e) {
//   L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
// });

// var geojson = new L.GeoJSON.AJAX('geotest.geojson', {pointToLayer:
// function(feature, latlng) {
//   var str = "<h4>" feature.properties.name +"</h4><hr>";
//   str += "<h4>" feature.properties.temp +"</h4><hr>";
// }}
//
//Json test
// var tempSensorJson = new L.GeoJSON.AJAX('https://kreskos.co.nz/api/temperature/7ed3ba02-3799-11e7-a094-eb7aca4253c9/')








//Watermark
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/logo.png';
        img.style.width = '200px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);
