


var PartlySymmetricSystemicPartSelector = function(){
	
	this.sysParts = pageData.systemicParts
	this.symmetricBoneOrgans = pageData.symmetricBoneOrgans
	this.dataToStore = new Object()
	this.dataToStore.boneOrgan = []
	this.dataToStore.uri = pageData.classUri
	this.dataToStore.type = "new"

	this.container = html.div()
	this.title = html.div("titleTable").text("Add bone segment")
	this.systemicPartContainer = html.div()
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton =  new TextButton("Save", (this.saveRoutine).bind(this)).disable()
	this.cancelButton =  new TextButton("Cancel", (this.cancelRoutine).bind(this), "rightAligned")
	
	this.initSystemicParts()
	this.assemble()
}

PartlySymmetricSystemicPartSelector.prototype = {
		
		
	assemble : function(){
		
		UI.assemble(this.container, [
		   this.title,
		   this.systemicPartContainer,
		   this.saveContainer,
				this.saveButton.container,
				this.cancelButton.container], 
		    [0, 0, 0, 1, 1])
	},

	initSystemicParts : function(){
		
		buf = []
		$.each(this.sysParts, (function(index, sysPart){
			buf.push(new SystemicPartSelector(this, sysPart, this.dataToStore.boneOrgan).container)
		}).bind(this))

		$.each(this.symmetricBoneOrgans, (function(index, symsysPart){
			buf.push(new SymmetricBoneOrganSelector(symsysPart, this.dataToStore.boneOrgan).container)
		}).bind(this))
		this.systemicPartContainer.append(buf)
	},
	
	saveRoutine : function(){
		var toSend = { 
				individual : pageData.individual,
				boneDivision : this.dataToStore
		}
	},
	
	cancelRoutine : function(){
		
	}
}