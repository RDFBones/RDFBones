

//Called from Skull, Vertebral Column, Bony Pelvis,
var CoherentSkeletalRegionOfSkeletalRegion = function(parent, dataToStore, descriptor){
	
	this.parent = parent
	this.dataToStore = dataToStore
	this.descriptor = descriptor
	this.init()
}

CoherentSkeletalRegionOfSkeletalRegion.prototype = {
		
		assemble : function() {

			UI.assemble(this.container, [ 
			      UI.inlineCont("margin10"),                     
			      	this.titleContainer, 
				      	this.classLabel,
				      	this.separator,
				      	this.existingLabel, 
				     this.buttonContainer, 
						this.addNewButton.container,
						this.addExisting.container, 
						this.complete.container,
					this.selectedExistingContainer,
				this.subContainer,
     			this.existingContainer,
 			 		this.existingTitle,
 			 		this.existingBones,
				], [ 0, 1, 2, 1, 2, 2, 2, 0 ])
		},	

		initUI : function(){
			
			this.container = html.div()
			this.titleContainer = html.div("titleContainer1")
				this.classLabel = html.div().text(this.descriptor.label)
				this.separator = html.div("separator")
				this.existingLabel = html.div()
			
			this.buttonContainer = html.div("inlineContainer")
				this.addNewButton = new Button("add", (this.addNew).bind(this));
				this.addExisting = new Button("list",
						(this.selectExisting).bind(this))
				this.complete = new CheckBoxText("complete", this, "addAll", null)
						.hide()	
			
			this.selectedExistingContainer = html.div()
			this.subContainer = html.div("subContainer")

			this.existingContainer = html.div("margin10").hide()
				this.existingTitle = html.div("inline").text("Existing Bone Organs")
				this.existingBones = html.div("subContainer")
		},
		
		init : function(){
			
			this.initUI()
			
			if(this.descriptor.existing != undefined && this.descriptor.existing.length > 0){
				
				this.buttonContainer.hide()
				this.existingLabel.text(this.descriptor.existing.label)
				
			} else {
				
				if(this.descriptor.existingToAdd.length == 0){
					this.addExisting.hide()
					this.addNew()
				} else {
					//Do nothing -> the addNew and the addExisting buttons appear
					this.initExistingToAdd()
				}
			}
			this.assemble()
		},
		
		addNew : function(){

			this.systemicPartSelectors = []
			$.each(this.descriptor.systemicParts, (function(i, sys) {
				this.systemicPartSelectors.push(new SystemicPartAdder(this, this.dataToStore.boneOrgan, sys))
			}).bind(this))
			
			this.addNewButton.hide()
			this.addExisting.hide()
			this.complete.show()
			
			arr = []
			$.each(this.systemicPartSelectors, (function(i, sysSel) {
				arr.push(sysSel.container)
			}).bind(this))
			this.subContainer.append(arr)
		},
		
		
		initExistingToAdd : function(){

			var existing = []
			$.each(this.dataSet.existing, (function(i, ex){
				existing.push(new ExistingCoherentSkeletalRegion(this, ex).container)
			}).bind(this))
			this.existingBones.append(existing)
		},
		
		selectExisting : function(){
			this.addExisting.hide()
			this.existingContainer.show()
		},
		
		addExistingSystemicPart : function(dataSet){
		
			this.dataToStore.push(dataSet)
			this.addNewButton.hide()
			this.addExisting.hide()
			this.buttonContainer.hide()
			this.selectedExistingContainer.append(
					new AddedExistingCoherentSkeletalDivison(this, dataSet).container)
		},
		
		removeExisting : function(dataSet){
			
			this.selectedExistingContainer.empty()
			this.addExisting.show()
			this.buttonContainer.show()
			this.dataToStore.removeElement(dataSet)
		},
}


ExistingCoherentSkeletalRegion = function(coherentSkeletalRegion, data){

	this.coherentSkeletalRegion = coherentSkeletalRegion
	this.data = data
	this.container = html.div("margin5").text(data.label)
	this.addButton = new Button("add", (this.add).bind(this))
	this.container.append(this.addButton.container)
}

ExistingCoherentSkeletalRegion.prototype = {
		
	add : function(){
		this.data.type = "existing"
		this.sysAdder.existingEntry = this
		this.coherentSkeletalRegion.addExistingSystemicPart(this.data)
	}
}

var CoherentSkeletalRegion = function(parent, parentData, descriptor) {

	
	this.parent = parent
	this.descriptor = descriptor
	this.dataToStore = parentData

	
	this.notAdded = true
	this.notComplete = true
	
	this.init()
}

CoherentSkeletalRegion.prototype = {

	
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
			this.dataToStore.label = this.descriptor.existing.label
			
		} else { // New
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
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
