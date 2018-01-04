


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


// zoom
$("#zoomTo").click(function(){
  map.setView([-40.331846, 175.661509], 16);
});
