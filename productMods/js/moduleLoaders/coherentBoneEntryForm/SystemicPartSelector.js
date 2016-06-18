
var SystemicPartSelector = function(classSelector, classDef, dataToStore) {

	
	this.classDef = classDef
	this.classSelector = classSelector
	this.dataToStore = dataToStore	
	
	this.notAdded = true

	this.container = html.div("namedContainer")
	this.selectContainer = html.span("middle")
		this.titleContainer = html.div("namedTitle").text(classDef.label)
		this.button = new Button("add", (this.addInstance).bind(this))
		this.subContainer = html.div("inlineContainer")

	this.assemble()
}

SystemicPartSelector.prototype = {

	assemble : function() {

		UI.assemble(this.container,[
		    this.selectContainer,
		    	this.titleContainer,
		    	this.button.container,
		    this.subContainer],
			[0, 1, 1, 0])
	},
	
	addInstance : function() {

		this.notAdded = false
		this.selectContainer.hide()
		this.subContainer.append(new BoneSegmentField(
				this, this.classDef, this.dataToStore).container)
		this.classSelector.refresh()
	},
	
	reset : function(){
		this.notAdded = true
		this.selectContainer.show()
		this.subContainer.empty()
		this.classSelector.refresh()
	},
	
	
	deleteSection : function(){
		
	}
}