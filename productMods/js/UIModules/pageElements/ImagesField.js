var ImagesField = function(parent, configData) {

	
	//We do not use the input params at all
	this.images = []
	
	this.container = html.div()

	this.title = html.div("title").text("Images");

	this.outerContainer = html.div("imgEditOuterContainer")
	this.innerContainer = html.div("imagesInnerContainer")

	this.waitGif = ImgUI.libImg("waitBar", "margin10")

	this.noImageMsg = html.getNewDiv("margin10").text(
			"There is no image loaded to this bone")

	this.form = html.form("margin10").attr("id", "imageForm").attr("enctype","multipart/form-data")
	this.fileUpload = html.fileUpload("datafile").attr("name", "datafile")
						.addClass("uploadField")
	this.submitButton = new TextButtonSmall("Upload", (this.submit).bind(this), "uploadImgButton")

	this.assemble()
	this.queryImages()
}

ImagesField.prototype = {

	assemble : function() {

		UI.assemble(this.container, [ 
		  this.title,
		  this.outerContainer,
		  	this.innerContainer,
		  		this.waitGif,
		  this.noImageMsg,
		  this.form,
		  	this.fileUpload,
		  	this.submitButton.container,
		], [0, 0, 1, -2, 0, 0, 1, 1])
	},

	queryImages : function() {

		this.container.show()
		this.showWaitGif()
		$.ajax({
			url : baseUrl + "ajaxQuery",
			dataType : "json",
			data : {
				dataOperation : "imagesOfIndividual",
				subject : pageData.individual
			}
		}).done(
				(function(result) {

					this.images = []
					if (!("noResult" in result)) {
						// if(result.noResult == null){
						$.each(result, (function(index, value) {
							this.images.push(baseUrl.substring(0,
									baseUrl.length - 1)
									+ value.downloadLocation)
						}).bind(this))
					}
					this.refreshImages()
				}).bind(this))
	},

	showWaitGif : function() {
		this.innerContainer.prepend(this.waitGif)
	},
	
	refreshImages : function() {
		this.innerContainer.empty()
		if (this.images.length > 0) {
			this.outerContainer.show()
			this.noImageMsg.hide()
			this.showWaitGif();
			$.each(this.images, (function(index, img) {
				this.innerContainer.append(this.getImgElement(img))
			}).bind(this))
		} else {
			this.outerContainer.hide()
			this.noImageMsg.show()
		}
	},

	submit : function() {

		this.showWaitGif()
		var fd = new FormData(document.getElementById("imageForm"));
		$.ajax({
			url : baseUrl + "ajaxFile",
			type : "POST",
			data : fd,
			processData : false, // tell jQuery not to process the
			// data
			contentType : false
		// tell jQuery not to set contentType
		}).done(
				/*
				 * The second part of the loading process
				 */
				(function(msg) {
					var result = $.parseJSON(msg)
					result["subject"] = pageData.individual
					result["dataOperation"] = "saveImage"
					
					this.images.unshift(baseUrl.substring(0,
							baseUrl.length - 1)
							+ result.downloadLocation)
					$.ajax({
						url : baseUrl + "ajaxData",
						data : result
					}).done((function(msg) {
						this.refreshImages()
					}).bind(this))
				}).bind(this))
	},

	getImgElement : function(src) {
		return html.getNewDiv("boneImageContainer").append(
				html.getPreviewImage(src, "boneImage", "viewer"))
	},

}