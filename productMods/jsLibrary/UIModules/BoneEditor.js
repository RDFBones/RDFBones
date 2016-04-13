var BoneEditor = function(data) {

	/*******************************************************************************
	 * Initiate the boneeditor function
	 ******************************************************************************/
	this.data = data
	this.fullScreenContainer = this.getFullScreenContainer(data.id)
	this.outerContainer = this.getOuterContainer()
	this.innerContainer = this.getInnerContainer()
	this.tableTitle = new TableTitle()
	this.backToParent = new BackToParent()
	this.labelEditor = new LiteralEditor(this, "Label", "label", "rdfs:label", true)
	this.descriptionEditor = new LiteralEditor(this, "Description","description","rdfbones:description", false)
	this.imageEditor = new ImageEditor(this)
	this.subboneEditor = new SubboneEditor(this)
	this.waitingGif = new WaitingGif()
	this.done = new Done(this.fullScreenContainer)
	this.addElements()
}

BoneEditor.prototype.addElements = function(data){
	this.fullScreenContainer
		.append(this.outerContainer
			.append(this.backToParent.container)
			.append(this.tableTitle.container)
			.append(this.innerContainer
					.append(this.labelEditor.container)
					.append(this.descriptionEditor.container)
					.append(this.imageEditor.container)
					.append(this.subboneEditor.container))
			.append(this.done.container))
			.hide()
}

BoneEditor.prototype.hideElements = function(data){
	this.tableTitle.container.hide()
	this.backToParent.container.hide()
	this.innerContainer.hide()
	this.done.container.hide()
}

BoneEditor.prototype.show1 = function(data){
	this.data = data
	this.fullScreenContainer.show()
	this.innerContainer.show()
	this.tableTitle.show(data.classUri)
	this.waitingGif.remove()
	this.backToParent.show(data)
	this.labelEditor.show1(data, data.label)
	this.descriptionEditor.show1(data, data.description)
	this.imageEditor.show1(data)
	this.subboneEditor.show1(data)
	this.done.show()
}

BoneEditor.prototype.waitForResult = function(){
	this.fullScreenContainer.show()
	this.hideElements()
	this.outerContainer.append(this.waitingGif)
}

BoneEditor.prototype.getFullScreenContainer = function(){
	return html.getNewDiv("fullScreenContainer")
}

BoneEditor.prototype.getOuterContainer = function(){
	return html.getNewDiv("outerContainer")
}

BoneEditor.prototype.getInnerContainer = function(){
	return html.getNewDiv("innerContainer")

}
