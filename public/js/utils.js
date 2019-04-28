function createUploadModal(onSubmit,onCancle){
    var form = document.createElement("form");
    var wraper = document.createElement("div");
    var submitButton = document.createElement("a");
    var captionInput = document.createElement("input");
    var descriptionInput = document.createElement("textarea");
    //var imagesInput = document.createElement("input");
    form.id = "submit-form"
    form.setAttribute("enctype","multipart/form-data")
    //assign class names to attributes
    //

    submitButton.onclick =  onSubmit
    submitButton.innerHTML  = "Отправить"
    submitButton.className = "waves-effect waves-light btn-small"

   

    captionInput.setAttribute("name", "caption")

    descriptionInput.setAttribute("name", "description")
    descriptionInput.className = "materialize-textarea"

    
   



    wraper.appendChild(inputButton())



    wraper.appendChild(captionInput)
    wraper.appendChild(descriptionInput)
    wraper.appendChild(submitButton)
    form.appendChild(wraper)
    return form


}


function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c * 1000;
  }
 
function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}



function inputButton(){
  `<div class="file-field input-field">
      <div class="btn">
      <span>File</span>
      <input type="file">
      </div>

       <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
       </div>
  </div>`


var wraper = document.createElement("div")
wraper.className = "file-field input-field"

var btn = document.createElement("div")
btn.className = "btn"

var span = document.createElement("span")
span.textContent="File"

var imagesInput = document.createElement("input");
imagesInput.setAttribute("type", "file")    
imagesInput.setAttribute("accept", "image/*")
imagesInput.setAttribute("capture", "camera")
imagesInput.setAttribute("multiple", "multiple")
imagesInput.setAttribute("name", "imageFile")

btn.appendChild(span)
btn.appendChild(imagesInput)

wraper.appendChild(btn)
wraper.innerHTML = wraper.innerHTML +` <div class="file-path-wrapper">
<input class="file-path validate" type="text">
</div>`
return wraper
}

function createCard(id,title,description,rate,imgPath)
{
  var card = `
  <div id="modal1" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4>${title}</h4>
    <p>${description}</p>
    <img class="materialboxed" width="650" src="${imgPath}">
  </div>
  <div class="modal-footer">
  <span id="rate-count" class="badge left" data-badge-caption="считают актуально">${rate}</span>

    <a href="#!" class=" waves-effect waves-green btn-flat" markerID=${id} onclick=voteFor(this)>Актуально</a>
    <a href="#!" class="right waves-effect waves-green btn-flat"  markerID=${id} >Центр</a>

  </div>
</div>`
return card

}

function voteFor(calee)
{
  

    var markerID = calee.getAttribute("markerID")
    var newFormObj  = new FormData();
    newFormObj.append('id', markerID);
    newFormObj.append('fingerprint', window.localStorage.getItem("fingerprint"));

   
    $.ajax({
        url:'/vote',
        type:'post',
        enctype: 'multipart/form-data',
        processData: false,  // Important!
        contentType: false,    
        data: newFormObj  
    }).done(function( data ) {
       if(data.status == "200")
       {
        M.toast({html: 'Спасибо за голос',classes:"green"})
        $("#rate-count")[0].textContent = data.rate || 0
       }
       else
         M.toast({html: 'Вы не можете голосовать',classes:"red"})

    });
}




function initFingerPrint() {
  
    setTimeout(function(){
      Fingerprint2.get(function (components) {
        var murmur = Fingerprint2.x64hash128(components.map(function (pair) { 
          return pair.value }).join(), 31); 
          window.localStorage.setItem("fingerprint",murmur)
      })
    },300) 
}