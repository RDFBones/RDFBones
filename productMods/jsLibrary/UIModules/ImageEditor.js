var ImageEditor = function(boneEditor){
	this.boneEditor = boneEditor
	this.container = html.getNewDiv()
	this.container.append(this.getTitleDiv("Images"))
	this.outerContainer = this.getOuterContainer()
	this.innerContainer = this.getInnerContainer()
	
	this.imageUpload = html.getForm()
		.attr("id", "imageForm").attr("enctype","multipart/form-data")
		.append(html.getFileUploadId("datafile").attr("name", "datafile"))
		
	this.submitButton = this.getSubmitButton()
	
	html.getNewDiv("button1")
		.text("Upload")
		.click(ImageEditor.submitImage)
		
	this.container
			.append(this.outerContainer
					.append(this.innerContainer))
					.append(html.getNewDiv("newLine"))
			.append(this.imageUpload)
			.append(this.submitButton)
			.append(html.getNewDiv("newLine"))
}

ImageEditor.prototype.show1 = function(data){
	this.boneData = data
	this.refreshImages()
	this.container.show()
}

ImageEditor.prototype.refreshImages = function(){
	this.innerContainer.empty()
	_this = this
	$.each(this.boneData.images, function(index, img){
		_this.innerContainer.append(
				_this.getImg(img))
	})
}

ImageEditor.prototype.getSubmitButton = function(){
	var _this = this
	return html.getNewDiv("button1")
				.text("Upload")
				.click(function(){
	
		var fd = new FormData(document.getElementById("imageForm"));
		$.ajax({
		  url : baseUrl + "skeletalInventoryFile",
		  type: "POST",
		  data: fd,
		  processData: false,  // tell jQuery not to process the data
		  contentType: false   // tell jQuery not to set contentType
		}).done(function(msg){
			var result = $.parseJSON(msg)
			result["boneUri"] = _this.boneData.uri
			result["dataOperation"] = "saveImage"
			console.log(result)
			//I have to cut the last / element
			_this.boneData.images.push(
					baseUrl.substring(0, baseUrl.length - 1) + result.downloadLocation)
			$.ajax({
			  url : baseUrl + "skeletalInventoryData",
			  data: result
			}).done(function(msg){
				_this.refreshImages()
			})
		})
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

ImageEditor.prototype.getImg = function(src) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(src, "previewImg","viewer"))
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
