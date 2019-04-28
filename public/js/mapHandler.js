var map;
var position = {coords:{latitude:47.202,longitude:38.93}}
var userMarker;
var clickMarker;
var userMarkerIcon;
var markerArray = []
function initMap() {
    //Location Access Granted
    initFingerPrint()
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(function(userPosition){
        position = userPosition
      })

      navigator.geolocation.watchPosition(function(userPosition){
        position = userPosition;
        userMarker.setMap(null)
        userMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude})
        //uncomment when will a button wich have logic
        //map.panTo(userMarker.getPosition());
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
      userMarker.addListener("click",openSubmitWindow)

    initMarkers(map)  
}
  


function initVariables(){
    
userMarker=new google.maps.Marker()
clickMarker=new google.maps.Marker()
clickMarker.addListener("click",openSubmitWindow)

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
                icon: image
              });
            trashMarker.set("id", item.id);
            trashMarker.addListener("click",trashClick)
            markerArray.push(trashMarker)
        })
       
    });
}

function trashClick(event)
{
    var markerID = this.get("id")
    var newFormObj  = new FormData();
    newFormObj.append('id', markerID);
   
    $.ajax({
        url:'/getMarkerInfo',
        type:'post',
        enctype: 'multipart/form-data',
        processData: false,  // Important!
        contentType: false,    
        data: newFormObj  
    }).done(function( data ) {
       var currentTrash = data[0]
       //try{$('#trash-card')[0].remove()}catch(e){}
       var card = createCard(currentTrash.id,currentTrash.caption,currentTrash.description,currentTrash.rate, "img/"+currentTrash.imgPath)
       $("#card-container").html(card)
       var elems = document.querySelectorAll('.materialboxed');
       var instances = M.Materialbox.init(elems);
       M.Modal.init($(".modal"),)[0].open()
    });
}

function setMapForMarkers(markerArray,map)
{
  markerArray.map(function(item,index){
    item.setMap(map)
  })
}

function openSubmitWindow(){
  //Getting LAT and LNG 
  var lat  = this.position.lat()
  var lng  = this.position.lng()
  //get info from form
  
  //append this info to data
  //data.append('lat', lat);
  //data.append('lng', lng);
  var infowindow = new google.maps.InfoWindow({

      content: createUploadModal(function(){
        var data = new FormData($('#submit-form')[0])
        data.append("lat",lat)
        data.append("lng",lng)

          $.ajax({
              url:'/submitPlace',
              type:'post',
              data: data,
              processData: false,
              contentType: false,    
          }).done(function( data ) {
            if(data.status == 200)
            {
              console.log(data)
              setMapForMarkers(markerArray,null)
              markerArray = []
              initMarkers(map);
            }
            else
            {
              alert("BAD",console.log(data))
            }
            infowindow.close()
            console.log(infowindow)
          })
////////////////////Set CallBack function wich delete InfoWindow
  })
    });
    infowindow.open(map, this);

}