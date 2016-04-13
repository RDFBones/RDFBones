var TableLoader = function(module) {
	this.dataSet = module.dataSet
	this.module = module
	this.columns = module.columns
	this.container = html.getDivId(module.id)
	this.title = UI.getTitle(module.title)
	this.columnTitles = html.getNewDiv()
	this.addColumnTitles()
	this.waitingGif = new WaitingGif()
	this.dataContainer = html.getNewDiv()
	this.appendElements()
	DataController.getBones(this)
}

TableLoader.prototype.getContainer = function(){
	return this.container
}

TableLoader.prototype.appendElements = function(){
	this.container
		.append(this.title)
		.append(this.columnTitles)
		.append(this.waitingGif)
		.append(this.dataContainer)
}

TableLoader.prototype.refresh = function(){
	var _this = this
	this.waitingGif.hide()
	this.dataContainer.empty()
	console.log("dataSet")
	$.each(this.dataSet, function(outerIndex, data) {
		var rowContainer = _this.getRowContainer()
		$.each(_this.module.columns, function(innerIndex, config) {
			var container = null
			if ("cardinality" in config) {
				// List of data
				container = _this.getColumnDiv(
						DataController.getClassObject(data[config.columnName]).label)
			} else { // Simple Data
				container = _this.getColumnDiv(data[config.columnName])
			}
			rowContainer.append(container)
		})
	rowContainer.append(_this.getEditButton(data))
	if(data.classUri == "http://purl.obolibrary.org/obo/FMA_53672" ||
				data.classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
		rowContainer.append(_this.getDeleteButton(true, outerIndex, rowContainer))
	} else {
		rowContainer.append(_this.getDeleteButton(false, outerIndex, rowContainer))
	}
	//rowContainer.append(_this.getDeleteButton(data))
	_this.dataContainer.append(rowContainer)
	})
}

TableLoader.prototype.addColumnTitles = function() {
	var _this = this
	$.each(this.columns, function(index, value) {
		_this.columnTitles.append(_this.getColumnTitle(value.title))
	})
}

TableLoader.prototype.getListElement = function(data, config, inputIndex) {
	var _this = this
	switch (config.ui.type) {
	case "imageList":
		var container = _this.getImageContainer()
		console.log("here")
		$.each(data.images, function(index, img) {
			var src = img[config.dataMap.src]
			var uri = img[config.dataMap.uri]
			var img = null
			if (config.ui.edit) {
				img = _this.getEditImg(src, uri, inputIndex)
			} else {
				img = _this.getImg(src, inputIndex)
			}
			container.find(".imagesInnerContainer").append(img)
		})
		console.log("afterHere")
		break;
	default:
		break;
	}
	return container
}

/*******************************************************************************
 * UI
 ******************************************************************************/
TableLoader.prototype.getColumnTitle = function(title) {
	html.getNewDiv("columnTitle").text(title)
}

TableLoader.prototype.getRowContainer = function(){
	return html.getNewDiv("rowContainer")
},


TableLoader.prototype.getEditButton = function(data){
	return this.getImgRow(ImgSrc.edit).click(function(){
		console.log("editButton clicked")
		UIController.modules["boneEditor"].show1(data)
	})
},
	
TableLoader.prototype.getDeleteButton = function(coherent, number, rowContainer){
	return this.getImgRow(ImgSrc.del16).click(function(){
		rowContainer.remove()
		Controller.deleteBone(coherent, number)
	})
},

TableLoader.prototype.getImgRow = function(src) {
	return html.getNewDiv("imgContainerRow").append(
			html.getImg(src))
},

TableLoader.prototype.getImg = function(src, index) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(testImgSource + src, "previewImg",index))
},

TableLoader.prototype.getColumnTitle = function(title){
	return html.getNewDiv("columnTitle").text(title)
},


	
TableLoader.prototype.getColumnDiv = function(value) {
	return html.getNewDiv("columnContainer").append(
			html.getNewDiv("columnContent").text(value))
},

TableLoader.prototype.getImageContainer = function() {
	// We need a constant div at first the
	return html.getNewDiv("columnContainer").
				append(html.getNewDiv("imagesOuterContainer").
					append(html.getNewDiv("imagesInnerContainer")))
},

TableLoader.prototype.getImg = function(src, index) {
	return html.getNewDiv("imgContainer").append(
			html.getPreviewImage(testImgSource + src, "previewImg",index))
},

TableLoader.prototype.getEditImg = function(src, index){
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

TableLoader.prototype.getNewLineDiv = function() {
	return html.getNewDiv("newLine")
}