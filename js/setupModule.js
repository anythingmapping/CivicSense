var map = L.map('mapdiv')
map.setView([-40.331846, 175.661509],11);

// basemap setup
L.esri.basemapLayer('Imagery').addTo(map);


// mouse move update function
map.on('mousemove', function(e){
  var str = "Latitude: "+e.latlng.lat.toFixed(5)+"   Longitude:"+e.latlng.lng.toFixed(5)+"    Zoom Level: "+map.getZoom();
  $("#map_coords").html(str);
});


var bertrudeMarker = L.marker([-40.331000, 175.661500]).addTo(map).bindPopup("<h3 id='sensor1' class='text-center'> Bertrude</h3><img src='img/alan.png' width=200px >");

// Sensor list is an idea for user information lists.... it will become external and attached to the user account
var sensorList = [['Lucas', '72e306f5-f465-4498-b235-d754721eb9d1'],
                  ['Alan', '52a5a888-b381-4882-8f59-1aef0dd8df49'],
                  ['Tobin', 'f2a8b351-6698-49fc-9e6f-71525711f9f5']];

function setMarker(device){
  deviceID = device[0]['device']
  console.log(device);

  var deviceID = L.marker([device[0]['location']['latitiude'],device[0]['location']['longitude']])
                .addTo(map)
                .bindPopup("<h3 id='" + deviceID + "' class='text-center'>'" + deviceID + "'</h3><img src='img/alan.png' width=200px >");

  //var sensors =  = ([-40.331846, 175.661509]).addTo(map).bindPopup("<h3 id='sensor1' class='text-center'> Bertrude</h3><img src='img/alan.png' width=200px >");
  //console.log(device);
  //console.log(device[0]['location']['latitiude']);
  //console.log(device[0]['location']['longitude']);
}



// Sensor list is an idea for user information lists.... it will become external and attached to the user account
var sensorList = [['Lucas', '72e306f5-f465-4498-b235-d754721eb9d1'],
                  ['Alan', '52a5a888-b381-4882-8f59-1aef0dd8df49'],
                  ['Tobin', 'f2a8b351-6698-49fc-9e6f-71525711f9f5']];

var sensorLength = sensorList.length;
for (var i = 0; i < sensorLength; i++) {
    sensor[i] = 'https://kreskos.co.nz/api/temperature/' + sensorList[i][1];
    //console.log(sensor[i])
    var sensors = L.marker([-40.331846, 175.661509]).addTo(map).bindPopup("<h3 id='sensor1' class='text-center'> Bertrude</h3><img src='img/alan.png' width=200px >");
};


for (var i = 0; i < sensorLength; i++) {
  $.ajax({
    url:sensor[i],
    type:'GET',
    success: function(response){
      //console.log(response[0]['location']['latitiude']);
      setMarker((response));
      //console.log(response);
    },
  })
};
