var map;
var position = {coords:{latitude:47.202,longitude:38.93}}

var userMarker;
var clickMarker;
var userMarkerIcon;
function initMap() {

    //Location Access Granted
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(function(userPosition){
        position = userPosition
      })

      navigator.geolocation.watchPosition(function(userPosition){
        position = userPosition;
        userMarker.setMap(null)
        userMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude})
        map.panTo(userMarker.getPosition());
        userMarker.setMap(map)

      }, function(error){
          //ERROR HANDLER
      });
    }
    //Location Access Denied 
    else 
    {
        //Handle Error Location
        console.log("Access denied")
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 16
    })
    map.addListener("click",mapClicked)
    initVariables()
    
    userMarker = new google.maps.Marker({
        position: {lat: position.coords.latitude, lng: position.coords.longitude},
        icon: userMarkerIcon
      });

    initMarkers(map)  
}
  


function initVariables(){
    
userMarker=new google.maps.Marker()
clickMarker=new google.maps.Marker()
clickMarker.addListener("click",function(){
    var infowindow = new google.maps.InfoWindow({
        content: createUploadModal(function(){
            $.ajax({
                url:'/submitPlace',
                type:'post',
                data: new FormData($('#submit-form')[0]),
                processData: false,
                contentType: false,    
                success:function(){
                  infowindow.close()
                  console.log(infowindow)
                    //  $('#submit-form')[0].remove();
                }
            }).done(function( data ) {
                
                
            })
////////////////////Set CallBack function wich delete InfoWindow
        //made for not relaod page after button click    

    })
      });
      infowindow.open(map, this);

})

userMarkerIcon = {
    url:  "icons/user.svg",
    scaledSize: new google.maps.Size(24, 24),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };

}
function mapClicked(event)
{
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    clickMarker.setMap(null)
    clickMarker.setPosition(new google.maps.LatLng(latitude,longitude))
    clickMarker.setMap(map)
    
}
function initMarkers(map){
    $.ajax({
        url:"/getMarkers"
    }).done(function( data ) {
        data.map(function(item,index){
            var image = {
                url:  "icons/trash.png",
                scaledSize: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
              };
            var trashMarker = new google.maps.Marker({
                position: {lat: item.lat, lng: item.lang},
                map: map,
                id: item.id,
                icon: image
              });
        
        })
       
    });
}