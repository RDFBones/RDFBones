/*
 * Called by the two selector classes
 */
var SkeletalDivision = function(parent, parentData, descriptor) {

	this.parent = parent
	this.descriptor = descriptor
	this.dataToStore = parentData
	this.notAdded = true
	this.notComplete = true
	this.init()
}

SkeletalDivision.prototype = {

	assemble : function() {

		UI.assemble(this.container, [ 
		      UI.inlineCont("margin10"),                     
		      	this.titleContainer, 
			      	this.classLabel,
			      	this.separator,
			      	this.existingLabel, //Here we do not have button container
			    this.buttonContainer,  
					this.complete.container,
			  this.subContainer],
			  [ 0, 1, 2, 2, 2, 1, 2, 0])
	},	
		
	initUI : function(){
		
		this.container = html.div()
		this.titleContainer = html.div("titleContainer1")
			this.classLabel = html.div().text(this.descriptor.label)
			this.separator = html.div("separator")
			this.existingLabel = html.div()
	
		this.buttonContainer = html.div("inlineContainer")
			this.complete = new CheckBoxText("complete", this, "addAll", null)
					.hide()	
		this.subContainer = html.div("subContainer")
	},
	
	init : function() {

		this.initUI()
		//Check if existing or new 
		if(this.descriptor.existing != undefined){ //Existing 
			//We have to display the label of the coherent bone division and the
			// label of the 
			this.existingLabel.text(this.descriptor.existing.label)
			this.dataToStore.type = "existing"
			this.dataToStore.uri = this.descriptor.existing.uri			
			
		} else { // New
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.label = this.descriptor.label
		}
		this.addSystemicParts()
		this.assemble()
	},	
	
	addSystemicParts : function(){

		this.systemicPartSelectors = []
		this.dataToStore.boneOrgan = []
		$.each(this.descriptor.systemicParts, (function(i, sys) {
			this.systemicPartSelectors.push(new SystemicPartAdder(this, this.dataToStore.boneOrgan, sys))
		}).bind(this))
		arr = []
		$.each(this.systemicPartSelectors, (function(i, sysSel) {
			arr.push(sysSel.container)
		}).bind(this))
		this.subContainer.append(arr)
	},
	
	appendToParentData : function(){
		this.parentData.push(this.dataToStore)
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
		this.parent.refresh()
	}
}
