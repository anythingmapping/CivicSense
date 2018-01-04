var mymap;

// basemapsv
var lyrOSM;
var lyrStamenToner;
var lyrImageryESRI;
var lyrTopoESRI;
var ctrlLayers;
var objBasemaps;
var objOverlays;
var lyrFarm;

// drawings
var fgpFarm;
var mrkFarm;
var plnFarm;
var plyFarm;
var ctrlDraw;



//map configurations
var markerCurrentLocation;
var ctrlZoom;
var ctrlAttribution;
var ctrlScale;
var ctrlMousePosition;

// plugins
var ctrlMeasure;
var ctrlEasyButton;
var ctrlSideBarv2;
var ctrlSearch;



$(document).ready(function(){
    mymap = L.map('mapdiv',
      {center:[-40.331846, 175.661509],
      zoom: 8,
      doubleClickZoom: true,
      dragging: true,
      zoomControl: true,
      attributionControl: false
    });


  lyrOSM = L.tileLayer.provider('Stamen.Toner');


  lyrOSM = L.tileLayer.provider('OpenStreetMap.Mapnik');
  lyrStamenToner = L.tileLayer.provider('Stamen.Toner');
  lyrImageryESRI = L.tileLayer.provider('Esri.WorldImagery');
  lyrTopoESRI = L.tileLayer.provider('Esri.WorldTopoMap');
  mymap.addLayer(lyrStamenToner);

  lyrFarm = L.imageOverlay('img/overlay/overlay2.png',
   [[-40.292278, 175.688011],[-40.298890, 175.693911]],{opacity:0.5}).addTo(mymap);

   mrkFarm = L.marker([-40.29502, 175.68916], {draggable:true});
   mrkFarm.bindTooltip("a thing");

   plnFarm = L.polyline([[[-40.29502, 175.68916],
     [-40.29515, 175.68912]],[[-40.29502, 175.68916],[-40.29515, 175.687]]],
     {draggable:true, color: 'red'});

   plyFarm = L.polygon([[-40.29546, 175.69228],
     [-40.29554, 175.69276],
     [-40.296, 175.69262],
     [-40.29589, 175.69218]], {color:'red', fillColor:'yellow', fillOpacity:0.8});

  fgpFarm = L.featureGroup([plyFarm, plnFarm]).addTo(mymap);

  objBasemaps = {
    "Open Street Maps": lyrOSM,
    "Stamen Toner": lyrStamenToner,
    "World Imagery": lyrImageryESRI,
    "Topo Map": lyrTopoESRI,
  };

  objOverlays = {
    'Farm':lyrFarm,
    'fgpFarm':fgpFarm,
  };

  ctrlLayers = L.control.layers(objBasemaps,objOverlays).addTo(mymap);

  // using the esri plugin to load imagery
  // L.esri.basemapLayer('Imagery').addTo(mymap);


  // ctrlZoom = L.control.zoom({zoomInText:'In',
  // zoomOutText:'Out',
  // position:'bottomright'});
  // ctrlZoom.addTo(mymap);

  // open cage geocoder
  var openCageOptions = {
    key: 'b6772ae97e684ad9abd89a431efaacd7',
    limit: 10,
    position: 'topleft',
    errorMessage: 'Nothing found.',
    showResultIcons: false,
    collapsed: 'click',
    expand: 'click',
  };
  ctrlSearch =  L.Control.openCageSearch(openCageOptions).addTo(mymap);




  ctrlAttribution = L.control.attribution({position:'bottomleft'}).addTo(mymap);
  ctrlAttribution.addAttribution('&copy; <a href="kreskos.co.nz"> Kreskos Innovation Ltd </a>');
  ctrlScale = L.control.scale({position:'bottomleft',metric:true,imperial:false}).addTo(mymap);
  ctrlMousePosition = L.control.mousePosition({position:'bottomright'}).addTo(mymap);
  ctrlMeasure = L.control.polylineMeasure({position:'topleft'}).addTo(mymap);
  ctrlEasyButton = L.easyButton('glyphicon-menu-hamburger', function(){
    ctrlSideBarv2.toggle();
  }).addTo(mymap);
  ctrlSideBarv2 = L.control.sidebar('side-bar').addTo(mymap);


  ctrlDraw = new L.Control.Draw();

  ctrlDraw.addTo(mymap);
  mymap.on('draw:created', function(e){
    console.log(e);
    console.log(e.layer);
  });





  //  ************* telemetry ****************
  var sensorList = [['Lucas', '72e306f5-f465-4498-b235-d754721eb9d1'],
                    ['Alan', '52a5a888-b381-4882-8f59-1aef0dd8df49'],
                    ['Tobin', 'f2a8b351-6698-49fc-9e6f-71525711f9f5']];

  function setMarker(device){
    deviceID = device[0]['device']
    // console.log(device);

    var deviceID = L.marker([device[0]['location']['latitiude'],device[0]['location']['longitude']])
                  .addTo(mymap)
                  .bindPopup("DeviceID: "+ deviceID + "<br>"+ "Temperature: " +device[0]['degrees_c'] + "<br>"+ "As at: " +device[0]['as_at']);
    }
    // Sensor list is an idea for user information lists.... it will become external and attached to the user account
    var sensorList = [['Lucas', '72e306f5-f465-4498-b235-d754721eb9d1'],
                      ['Alan', '52a5a888-b381-4882-8f59-1aef0dd8df49'],
                      ['Tobin', 'f2a8b351-6698-49fc-9e6f-71525711f9f5']];

    var sensorLength = sensorList.length;
    for (var i = 0; i < sensorLength; i++) {
        sensor[i] = 'https://kreskos.co.nz/api/temperature/' + sensorList[i][1];
        //console.log(sensor[i])
        // var sensors = L.marker([-40.331846, 175.661509]).addTo(mymap);
    };


    for (var i = 0; i < sensorLength; i++) {
      $.ajax({
        url: 'https://kreskos.co.nz/api/temperature/last/',
        // url:sensor[i],
        type:'GET',
        headers: { 'kreskos-api-id': 1, 'kreskos-api-secret': '+XC3sPP0IWmOOJ7iXg+3kOOL0mN8fMw0wLMyu0/vDvkUO2Xktm43mynqv3xDLSNK' },
        success: function(response){
          console.log(response[0]['location']['latitiude']);
          setMarker((response));
          console.log(response);
        },
      })
    };














  // FOR MOBILE locator
  // setInterval(function(){
  //   mymap.locate()
  // }, 5000);



  mymap.on('click', function(e){
    if (e.originalEvent.shiftKey) {
      console.log(mymap.getZoom());
    } else {
      console.log(e.latlng.toString());
    }
  });
  //
  //
  // mymap.on('keypress', function(e) {
  //    if (e.originalEvent.key=='l') {
  //      mymap.locate();
  //    }
  // });


  //MAP EVENTS

  mymap.on('keypress', function (e){
    if (e.originalEvent.key == 'r') {
      markerCurrentLocation.remove()
    }});


    // need to research the accuracy math /2 or not?
  mymap.on('locationfound', function(e) {
    //console.log(e);
    if (markerCurrentLocation){
      markerCurrentLocation.remove()
    }
    markerCurrentLocation = L.circle(e.latlng, {radius:e.accuracy/2}).addTo(mymap);
    mymap.setView(e.latlng, 14);
  });

  mymap.on('locationerror', function(e){
    console.log(e);
    console.log("location was not found");
  });


  mymap.on('contextmenu', function(e) {
    var dtCurrentTime = new Date();
    L.marker(e.latlng).addTo(mymap).bindPopup(e.latlng.toString()+ "<br>"+dtCurrentTime.toString());
  });

  mymap.on('zoomend', function(){
    $('#zoom-level').html(mymap.getZoom());
  });

  mymap.on('moveend', function(){
    $('#map-center').html(LatLngToArrayString(mymap.getCenter()));
  });

  mymap.on('mousemove', function(e){
    $('#mouse-location').html(LatLngToArrayString(e.latlng));
  });

  mrkFarm.on("dragend", function(){
    mrkFarm.setTooltipContent("we're moving");
  });




//
// BUTTON INTERACTION
//
  $("#btnFarm").click(function(){
    mymap.setView([-40.29502, 175.68916], 17);
    mrkFarm.setLatLng([-40.29502, 175.68916]);
    mrkFarm.setTooltipContent("The Farm");
  });

  $("#btnLineFarm").click(function(){
    mymap.fitBounds(plnFarm.getBounds());

  });

  $("#btnLocate").click(function() {
    mymap.locate();
  });

  $("#sldOpacity").on('change', function(){
    $('#image-opacity').html(this.value);
    lyrFarm.setOpacity(this.value);
  });

  $("#btnAddfgp").click(function() {
    fgpFarm.addLayer();
  });




  //Watermark
  L.Control.Watermark = L.Control.extend({
      onAdd: function(map) {
          var img = L.DomUtil.create('img');
          img.src = 'img/klogo.png';
          img.style.width = '100px';
          return img;
      },
      onRemove: function(map) {
          // Nothing to do here
      }
  });

  L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
  }

  L.control.watermark({ position: 'bottomright' }).addTo(mymap);

});


function LatLngToArrayString(ll){
  // console.log(ll);
  return "["+ll.lat.toFixed(5)+", "+ll.lng.toFixed(5)+"]";
};
