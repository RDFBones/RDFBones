var BoneEditor = function(data) {

	/*******************************************************************************
	 * Initiate the boneeditor function
	 ******************************************************************************/
	this.data = data
	this.fullScreen = html.getFullScreen(data.id)
	this.container = html.getFullScreenContainer()
	this.close = new Close(this.fullScreen)
	this.labelEditor = new LiteralEditor(this, "Label", "label", "rdfs:label", true)
	this.descriptionEditor = new LiteralEditor(this, "Description","description","rdfbones:description", false)
	this.imageEditor = new ImageEditor(this, data.images)
	this.subboneEditor = new SubboneEditor(this)
	this.waitingGif = new WaitingGif()
	this.addElements()
	this.fullScreen.append(this.container).hide()
}
BoneEditor.prototype.addElements = function(data){
	this.container
	.append(this.close.container)
	.append(this.labelEditor.container)
	.append(this.descriptionEditor.container)
	.append(this.imageEditor.container)
	.append(this.subboneEditor.container)	
}

BoneEditor.prototype.hideElements = function(data){
	this.close.container.hide()
	this.labelEditor.container.hide()
	this.descriptionEditor.container.hide()
	this.imageEditor.container.hide()
	this.subboneEditor.container.hide()
}

BoneEditor.prototype.show1 = function(data){
	console.log("show1")
	console.log(data)
	this.data = data
	this.waitingGif.remove()
	this.fullScreen.show()
	$("#backToParent").remove()
	this.container.append(BackToParent(data.parent))
	this.addElements()
	this.close.show()
	this.labelEditor.show1(data, data.label)
	this.descriptionEditor.show1(data, data.description)
	this.imageEditor.show1(data.images, false)
	this.subboneEditor.show1(data)
}

BoneEditor.prototype.waitForResult = function(){
	this.fullScreen.show()
	this.hideElements()
	this.container.append(this.waitingGif)
}
