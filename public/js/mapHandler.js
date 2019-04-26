var map;
var  position = {coords:{latitude:0,longitude:0}}
function initMap() {
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(function(gotPosition){
        position = gotPosition
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 14
        })
      });
    } else 
    {
        console.log("adaw")
        position = {coords:{latitude:0,longitude:0}}
    }

}
  
