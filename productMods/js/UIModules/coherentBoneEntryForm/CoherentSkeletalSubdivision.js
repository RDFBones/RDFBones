/*
 * Called by the CoherentSkeletalDivision
 */

var CoherentSkeletalSubDivision = function(parent, parentData, descriptor){
	
	this.parent = parent
	this.parentData = parentData
	this.descriptor = descriptor
	this.init()
}

CoherentSkeletalSubDivision.prototype = {
		
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
				], [ 0, 1, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 1, 1])
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
				

				if(this.descriptor.existingToSelect.length == 0){
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

			
			this.dataToStore = new Object()
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.labe = this.descriptor.label
			this.dataToStore.type = "new"
			
			this.parentData.push(this.dataToStore)
			this.dataToStore.boneOrgan = []
			
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
			$.each(this.descriptor.existingToSelect, (function(i, ex){
				existing.push(new ExistingCoherentSkeletalRegion(this, ex).container)
			}).bind(this))
			this.existingBones.append(existing)
		},
		
		selectExisting : function(){
			this.addExisting.hide()
			this.existingContainer.show()
		},
		
		addExistingSystemicPart : function(dataSet){
		
			dataSet.type = "existing"
			this.parentData.push(dataSet)
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