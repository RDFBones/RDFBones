var BoneEditor = function(data) {

	/*******************************************************************************
	 * Initiate the boneeditor function
	 ******************************************************************************/
	this.data = data
	this.fullScreen = html.getFullScreen(data.id)
	this.container = html.getFullScreenContainer()
	this.tableTitle = new TableTitle()
	this.backToParent = new BackToParent()
	this.labelEditor = new LiteralEditor(this, "Label", "label", "rdfs:label", true)
	this.descriptionEditor = new LiteralEditor(this, "Description","description","rdfbones:description", false)
	this.imageEditor = new ImageEditor(this, data.images)
	this.subboneEditor = new SubboneEditor(this)
	this.waitingGif = new WaitingGif()
	this.done = new Done(this.fullScreen)
	this.addElements()
	this.fullScreen.append(this.container).hide()
}

BoneEditor.prototype.addElements = function(data){
	this.container
		.append(this.tableTitle.container)
		.append(this.backToParent.container)
		.append(this.labelEditor.container)
		.append(this.descriptionEditor.container)
		.append(this.imageEditor.container)
		.append(this.subboneEditor.container)
		.append(this.done.container)	
}

BoneEditor.prototype.hideElements = function(data){
	
	this.tableTitle.container.hide()
	this.labelEditor.container.hide()
	this.descriptionEditor.container.hide()
	this.imageEditor.container.hide()
	this.subboneEditor.container.hide()
	this.done.container.hide()
}

BoneEditor.prototype.show1 = function(data){

	this.data = data
	this.tableTitle.show(data.classUri)
	this.waitingGif.remove()
	this.fullScreen.show()
	this.backToParent.show(data)
	this.labelEditor.show1(data, data.label)
	this.descriptionEditor.show1(data, data.description)
	this.imageEditor.show1(data, false)
	this.subboneEditor.show1(data)
	this.done.show()
}

BoneEditor.prototype.waitForResult = function(){
	this.fullScreen.show()
	this.hideElements()
	this.container.append(this.waitingGif)
}
