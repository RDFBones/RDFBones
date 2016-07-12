var CoherentSkeletalRegion = function(parent, parentData, descriptor) {

	this.parent = parent
	this.descriptor = descriptor
	this.parentData = parentData

	this.notAdded = true
	this.notComplete = true
	
	this.initData()
	this.init()
}


CoherentSkeletalRegion.prototype = {

	init : function() {

		this.container = html.div()
		this.titleContainer = html.div("titleContainer1")
		this.subContainer = html.div("subContainer")

		this.buttonContainer = html.div("inlineContainer")
		this.complete = new CheckBoxText("complete", this, "addAll", null)
				.hide()
		this.classLabel = html.div().text(this.descriptor.label)

		if (this.descriptor.existing != undefined) {
			this.separator = html.div("separator")
			this.assembleExisting()
			this.addExisting()
		} else {
			//There is no existing
			this.complete.hide()
			this.addNewButton = new Button("add", (this.addNew).bind(this));
			this.addExisting = new Button("list",
					(this.selectExisting).bind(this))
			this.exitButton = new Button("close", (this.exit).bind(this)).hide()
			this.assembleNew()
			if (this.descriptor.existingToSelect === undefined) {
				this.addNew()
			}
		}
	},	
	
	appendToParentData : function(){
		this.parentData.push(this.dataToStore)
	}, 
	
	assembleExisting : function() {

		UI.assemble(this.container, [ 
		     UI.inlineCont(),                     
                this.titleContainer, 
		        	this.classLabel,
		        	this.sepearator, 
		        	this.existingLabel,  
			this.subContainer], 
			[ 0, 1, 2, 2, 2, 0])
	},

	assembleNew : function() {

		UI.assemble(this.container, [ 
		      UI.inlineCont("margin10"),                     
		      	this.titleContainer, 
			      	this.classLabel,
			     this.buttonContainer, 
					this.addNewButton.container,
					this.addExisting.container, 
					this.complete.container,
					this.exitButton.container, 
			this.subContainer ], [ 0, 1, 2, 1, 2, 2, 2, 2, 0 ])
	},
	
	//@Override
	initData : function() {

		this.dataToStore = new Object()
		this.dataToStore.boneOrgan = []
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
				this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.label = this.descriptor.label
		}
	},

	//@Override
	addExisting : function() {

		var arr = []
		this.systemicPartSelectors = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, (function(i, sys) {
			this.systemicPartSelectors.push(new SystemicPartAdder(this,
					this.dataToStore.boneOrgan, sys))
		}).bind(this))

		this.appendFields()
	},
	
	//@Override
	addNew : function(){

		this.systemicPartSelectors = []
		$.each(this.descriptor.systemicParts, (function(i, sys) {
			this.systemicPartSelectors.push(new SystemicPartAdder(this, this.dataToStore.boneOrgan, sys))
		}).bind(this))
		
		this.addNewButton.hide()
		this.addExisting.hide()
		this.complete.show()
		//this.exitButton.show()
		this.appendFields()
	},
	
	selectExisting : function() {

		// Pop up controller the existing entities
		// this returns to the addExisting
	},

	appendFields : function() {
		
		arr = []
		$.each(this.systemicPartSelectors, (function(i, sysSel) {
			arr.push(sysSel.container)
		}).bind(this))
		this.subContainer.append(arr)
	},
	
	exit : function() {
		
	},
	
	addAll : function(_this){
		
		_this.complete.set()
		_this.notComplete = false
		if(_this.systemicPartSelectors === undefined){
			_this.addNew()
		}
		$.each(_this.systemicPartSelectors, (function(i, sysSel) {
			sysSel.addAll(sysSel)
		}).bind(_this))
	},
	
	refresh : function(){
		
		var thereIsNotAdded = false
		var thereIsAdded = false
		this.notAdded = true
		this.complete.set()

		$.each(this.systemicPartSelectors, (function(i, sysSel) {
			if (sysSel.notAdded) {
				thereIsNotAdded = true
				this.complete.reset()
			} else {
				thereIsAdded = true
				this.notAdded = false
			}
			
			if(sysSel.notComplete){
				this.notComplete = true
				this.complete.reset()
			}
		}).bind(this))
		
		if(!thereIsAdded){
			this.parentData.removeElement(this.dataToStore)
		} else {
			if(this.parentData.indexOf(this.dataToStore) == -1){
				this.parentData.push(this.dataToStore)
			}
		}
		this.parent.refresh()
	},

}
