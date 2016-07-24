/*
 * Called by the CoherentSkeletalDivision
 */

var CoherentSkeletalSubdivision = function(parent, parentData, descriptor){
	
	this.parent = parent
	this.parentData = parentData
	this.descriptor = descriptor
	this.init()
}

CoherentSkeletalSubdivision.prototype = {
		
		assemble : function() {

			UI.assemble(this.container, [ 
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
				], [ 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1])
		},	

		initUI : function(){
			
			this.container = html.div()
			this.titleContainer = html.div("iInlineContainer")
				this.classLabel = html.div("inline").text(this.descriptor.label)
				this.separator = html.div("separator inline").hide()
				this.existingLabel = html.div("inline")
			
			this.buttonContainer = html.div("iInlineContainer")
				this.addNewButton = new Button("add", (this.addNew).bind(this));
				this.addExisting = new Button("list",
						(this.selectExisting).bind(this))
				this.complete = new CheckBoxText("complete", this, "addAll", null)
						.hide()	
			
			this.selectedExistingContainer = html.div()
			this.subContainer = html.div("subContainer")

			this.existingContainer = html.div("existingContainer").hide()
				this.existingTitle = html.div("underLined").text("Existing " + this.descriptor.label + "s")
				this.existingBones = html.div("subContainer")
		},
		
		init : function(){
			
			this.initUI()
			if(this.descriptor.existing != undefined && this.descriptor.existing.length > 0){
				this.buttonContainer.hide()
				this.separator.css("display", "inline-block")
				this.existingLabel.text(this.descriptor.existing[0].label)
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
			this.dataToStore.label = this.descriptor.label
			this.dataToStore.type = "new"
			
			this.parentData.coherentSkeletalDivision.push(this.dataToStore)
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
				existing.push(new existingSkeletalDivision(this, ex))
			}).bind(this))
			this.existingBones.append(existing)
		},
		
		selectExisting : function(){
			this.addExisting.hide()
			this.existingContainer.show()
		},
		
		addExistingSystemicPart : function(dataSet){
		
			dataSet.type = "existing"
			console.log(dataSet)
			this.parentData.coherentSkeletalDivision.push(dataSet)
			this.addNewButton.hide()
			this.addExisting.hide()
			this.buttonContainer.hide()
			this.selectedExistingContainer
				.append(new AddedExistingCoherentSkeletalDivison(
							(this.resetExistingEntry).bind(this), dataSet))
			
			this.notAdded = false
			this.existingContainer.hide()
			this.parent.refresh()
		},
		
		closeExisting : function(){
			this.existingContainer.hide()
		},
		
		removeExisting : function(dataSet){
			
			this.selectedExistingContainer.empty()
			this.addExisting.show()
			this.buttonContainer.show()
			this.dataToStore.removeElement(dataSet)
		},
		
		//Deleting the added systemic part
		reset : function(){
			this.selectedExistingContainer.empty()
			this.list.show()
		},
		
		resetExistingEntry : function(dataSet){

			this.parentData.coherentSkeletalDivision.shift()
			this.selectedExistingContainer.empty()
			this.buttonContainer.show()
			this.addExisting.show()
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

existingSkeletalDivision = function(coherentSkeletalSubdivision, data){
	
	this.coherentSkeletalSubdivision = coherentSkeletalSubdivision
	this.data = data
	this.container = html.div("inlineContainer")
	return this.container
				.append(html.div("margin5").text(data.label))
				.append(new Button("add", (this.add).bind(this)).container)
}

existingSkeletalDivision.prototype = {
	
	add : function(){
		//Here there is no check
		this.coherentSkeletalSubdivision.addExistingSystemicPart(this.data)
		this.coherentSkeletalSubdivision.closeExisting(this.data)
	}	
}
