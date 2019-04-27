function createUploadModal(onSubmit,onCancle){
    var form = document.createElement("form");
    var wraper = document.createElement("div");
    var submitButton = document.createElement("button");
    var cancleButton = document.createElement("button");
    var captionInput = document.createElement("input");
    var descriptionInput = document.createElement("textarea");
    var imagesInput = document.createElement("input");
    form.id = "submit-form"
    form.setAttribute("enctype","multipart/form-data")
    //assign class names to attributes



    //

    submitButton.onclick =  onSubmit
    submitButton.innerHTML  = "OK"
    submitButton.setAttribute("type","button")
    cancleButton.onclick = onCancle
    imagesInput.setAttribute("type", "file")    
    imagesInput.setAttribute("accept", "image/*")
    imagesInput.setAttribute("capture", "camera")
    imagesInput.setAttribute("multiple", "multiple")
    imagesInput.setAttribute("name", "imageFile")


    captionInput.setAttribute("name", "caption")

    descriptionInput.setAttribute("name", "description")

    


    wraper.appendChild(imagesInput)
    wraper.appendChild(captionInput)
    wraper.appendChild(descriptionInput)
    wraper.appendChild(submitButton)
    wraper.appendChild(cancleButton)
    form.appendChild(wraper)
    return form


}