var ImageEditor = function(boneEditor){
	this.boneEditor = boneEditor
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Images"))
	this.outerContainer = this.getOuterContainer()
	this.innerContainer = this.getInnerContainer()
	this.container
			.append(this.outerContainer
					.append(this.innerContainer))
					.append(html.getNewDiv("newLine"))
	this.fileUpload = html.getForm()
		.append(html.getFileUploadId("datafile")
				.on('change', prepareUpload))
				
	this.container.append(this.fileUpload)
}

ImageEditor.prototype.show1 = function(imageList, edit){
	this.container.show()
	this.imageList = imageList
	if(edit){
		var func = this.getEditImg
	} else{
		var func = this.getImg
	}
	this.innerContainer.empty()
	object = this
	$.each(imageList, function(index, img){
		object.innerContainer.append(
				func(img.src, img.uri))
	})
	
}

ImageEditor.prototype.getTitleDiv = function(title) {
	this.titleDiv = html.getNewDiv("moduleTitle").text(title)
	return this.titleDiv
}
ImageEditor.prototype.getOuterContainer = function(){
	this.innerContainer = html.getNewDiv("imgEditOuterContainer")
	return this.innerContainer
}

ImageEditor.prototype.getInnerContainer = function(){
	return html.getNewDiv("imagesInnerContainer")
}

ImageEditor.prototype.getImg = function(src, index) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(testImgSource + src, "previewImg",index))
},

ImageEditor.prototype.getEditImg = function(src, index){
	return html.getNewDiv("imageContainer")
			.append(html.getPreviewImage(testImgSource + src, "previewImg", index))
			.append(html.getNewDiv("imgCheckBoxContainer")
					.append(html.getCheckBox()))
	/*	<div class = "imageContainer">
			<img src="" class = "image">
			<div class = "imgCheckBoxContainer">
				<input type = "checkbox"/>
			</div>	
		</div> 	*/
},
	
ImageEditor.prototype.getNewLine = function() {
		return html.getNewDiv("newLine")
}

function prepareUpload(event)
{
  files = event.target.files;
  uploadFiles(event)
}

function uploadFiles(event){
	
	event.stopPropagation(); 
	event.preventDefault(); 
	var fileName = files[0].name;
	var extension = fileName.split("\.")[1].toLowerCase()
	console.log(extension)
	if(extension == "png" || extension== "jpg" || extension == "jpeg" || 
			extension == "tiff"){
		var data = new FormData();
		$.each(files, function(key, value)
		{
    		data.append(key, value);
		});

		$.ajax({
   			url: baseUrl + "skeletalInventoryData",
    		type: 'POST',
    		data: data ,
    		cache: false ,
    		dataType: 'json',
    		processData: false ,  
    		contentType: false ,         		
		success: function(data, textStatus, jqXHR){
        			if(typeof data.error === 'undefined'){
            			// Success so call function to process the form
            			submitForm(event, data);
        			} else {
            			// Handle errors here
          			  	console.log('ERRORS: ' + data.error);
        			}
    	},
    	error: function(jqXHR, textStatus, errorThrown)
    	{
    	  console.log('ERRORS: ' + textStatus);
    	}

	});
	} else {
		alert("Please upload an image!")
	}
}
