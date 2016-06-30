


var PartlySymmetricSystemicPartSelector = function(){
	
	this.sysParts = pageData.systemicParts
	this.symmetricBoneOrgans = pageData.symmetricBoneOrgans
	this.dataToStore = new Object()
	this.dataToStore.boneOrgan = []
	this.dataToStore.uri = pageData.classUri
	this.dataToStore.label = pageData.classLabel
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
		
		this.systemicPartSelectors = []
		$.each(this.sysParts, (function(index, sysPart){
			this.systemicPartSelectors.push(new SystemicPartSelector(this, sysPart, this.dataToStore.boneOrgan))
		}).bind(this))

		$.each(this.symmetricBoneOrgans, (function(index, symsysPart){
			this.systemicPartSelectors.push(new SymmetricBoneOrganSelector(this, symsysPart, this.dataToStore.boneOrgan))
		}).bind(this))
		this.appendContainers()
	},
	
	appendContainers : function(){
		buf = []
		$.each(this.systemicPartSelectors, (function(index, sysSelector){
			buf.push(sysSelector.container)
		}).bind(this))
		this.systemicPartContainer.append(buf)
	},
	
	saveRoutine : function(){
		var toSend = { 
				individual : pageData.individual,
				boneDivision : this.dataToStore
		}
		console.log(toSend)
		PopUpController.init()
		$.ajax({
			type: 'POST',
			context : this,
			dataType: 'json',
			url : baseUrl + "dataInput",
			data : "dataToStore=" + JSON.stringify(toSend)
			}).done((function(msg){
				
				var urlObject = {
					pageUri : "boneDivision",
					individual : msg.object.boneDivision.uri,
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : this.dataToStore.uri,
					classUri : pageData.classUri,
				}
				window.location = baseUrl
					+ "pageLoader?" + DataLib.getUrl(urlObject)
		}).bind(this))
	},
	
	cancelRoutine : function(){
		
	},
	
	refresh : function(){
		
		var thereIsNotAdded = false
		var thereIsAdded = false
		$.each(this.systemicPartSelectors, function(i, sysSel){
			if(sysSel.notAdded){
				thereIsNotAdded = true
			} else {
				thereIsAdded = true
			}
		})
		this.refreshSaveButton(thereIsAdded)
	},
	
	refreshSaveButton : function(thereIsAdded){
		
		if(thereIsAdded){
			this.saveButton.enable()
		} else {
			this.saveButton.disable()
		}
	},
}