var NamedSystemicPartSelector = function(classSelector, dataSet, dataToStore) {

	this.dataSet = dataSet
	this.classSelector = classSelector
	this.dataToStore = dataToStore
	
	this.title = dataSet[0].label
	
	this.container = html.div("namedContainer")
	
	this.notAdded = true
	
	this.selectContainer = html.span("middle")
	this.titleContainer = html.div("namedTitle").text(this.title)		
	this.selectorField = UI.classSelector(dataSet)
	this.button = new Button("add", (this.addInstance).bind(this))
	
	this.subContainer = html.div("inlineContainer")
	this.assemble()
}

NamedSystemicPartSelector.prototype = {

	assemble : function() {

		UI.assemble(this.container,[
		    this.selectContainer,
		    	this.titleContainer,
		    	this.selectorField,
		    	this.button.container,
		    this.subContainer],
			[0, 1, 1, 1, 0])
	},

	addInstance : function() {

		// Search for the selected class
		$.each(this.dataSet, (function(index, value) {
			if (value.uri == this.selectorField.val()) {
				this.subContainer.append(new BoneSegmentField(
						this, value, this.dataToStore).container)
			}
		}).bind(this))
		
		this.selectContainer.hide()
		
		this.notAdded = false
		this.classSelector.refresh()
	},

	reset : function(){
		
		this.notAdded = true
		this.selectContainer.show()
		this.subContainer.empty()
		this.classSelector.refresh()
	}
}
