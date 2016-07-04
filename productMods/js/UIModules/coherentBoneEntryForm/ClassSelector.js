var ClassSelector = function() {

	this.dataToStore = new Object()
	
	this.dataSet = pageData.boneDivisions
	this.systemicPartSelectors = []
	
	this.container = html.div("table")
	
	this.headerContainer = html.div("headerContainer")
	this.header = html.div("headerText").text("Select Bone Division")
	this.exitButton = new CustomButton("del", (this.exitRoutine).bind(this), "rightAligned")
	
	this.selectorContainer = html.span("middleSpan margin10")
	this.selectorField = UI.classSelector(this.dataSet)
	this.button = new Button("add", (this.selectBoneDivision).bind(this))
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton =  new TextButton("Save", (this.saveRoutine).bind(this)).disable()
	this.cancelButton =  new TextButton("Cancel", (this.cancelRoutine).bind(this), "rightAligned")

	this.subContainer = html.div("subContainer")
	
	this.addAllButton = new TextButton(
				"Add all", (this.addAll).bind(this)).hide()
	
	if(pageData.existingBoneDivisionType != undefined){
		this.assembleForExisting()
		this.selectExistingBoneDivision()
	} else {
		this.assemble()
	}
}

ClassSelector.prototype = {

		
	assemble : function() {
		
		UI.assemble(this.container, [
			this.headerContainer,
				this.header,
				this.exitButton.container,
			this.selectorContainer,
				this.selectorField,
				this.button.container,
			this.subContainer,
			this.addAllButton.container,
			this.saveContainer,
				this.saveButton.container,
				this.cancelButton.container],
			[0, 1, -1, 0, 1, 1, 0, 0, 0, 1, 1])
	
	},

	assembleForExisting : function(){
		
		UI.assemble(this.container, [
     			this.subContainer,
     			this.saveContainer,
     				this.saveButton.container,
     				this.cancelButton.container],
     			[0, 0, 1, 1])
   
	},

	exitRoutine : function(){
		
		this.selectorContainer.show()
		this.header.text("Select Bone Division")
		this.exitButton.hide()
		this.subContainer.empty()
		this.saveButton.hide()
		this.addAllButton.hide()
		$.each(this.systemicPartSelectors, function(i, selector){
			selector.reset()
		})
		this.dataToStore = []
		this.systemicPartSelectors = []
	},
	
	selectExistingBoneDivision : function(){
		
		$.each(this.dataSet, (function(index, value) {
			if (value.uri == pageData.existingBoneDivisionType) {
				
				this.dataToStore.uri = pageData.existingBoneDivision
				this.dataToStore.type = "existing"
				this.dataToStore.boneOrgan = []
				this.setTitle(value.label)
				this.loadSubObject(value)
				return false
			}
		}).bind(this))
	},
	
	selectBoneDivision : function() {
		/*
		 * Search for the element in the list which were set
		 */
		$.each(this.dataSet, (function(index, value) {
			if (value.uri == this.selectorField.val()) {
				
				this.dataToStore.uri = value.uri
				this.dataToStore.label = value.label
				this.dataToStore.type = "new"
				this.dataToStore.boneOrgan = []
				this.setTitle(value.label)
				this.loadSubObject(value)
				return false
			}
		}).bind(this))
	},

	setTitle : function(label){
		this.exitButton.show()
		this.selectorContainer.hide()
		this.header.text(label)
	},
	
	/*
	 * DataSet is the bone division descriptor which has the field systemic parts
	 */
	loadSubObject : function(dataSet) {
		
		console.log(dataSet)
		// It is already an object


		/*
		 * If the systemic part has a subClass then multiple value has to be createds
		 */
		
		this.subContainer.append(this.titleCont = html.div("titleTable").text("Add bone segment"))
		
		if (dataSet.systemicParts[0].subClasses != undefined) {

			// We create to classSelector
			$.each(dataSet.systemicParts, (function(index, value) {
				
				//The value in the subClass will be extended with actual systemic part
				var extendWith = new Object()
				extendWith.uri = value.uri
				extendWith.label = value.label

				//Cloneing the array
				var obj = $.extend({}, value.subClasses)
				var subClasses = Object.keys(obj).map(function (key) {return obj[key]})
				
				subClasses.unshift(extendWith)
				
				if(pageData.existingBoneOrgans != undefined){

					if(!DataLib.joinArrays(subClasses, "uri", pageData.existingBoneOrgans, "type")){
						this.systemicPartSelectors.push(new NamedSystemicPartSelector(
								this, subClasses, this.dataToStore.boneOrgan))
					}
				} else {
						this.systemicPartSelectors.push(new NamedSystemicPartSelector(
								this, subClasses, this.dataToStore.boneOrgan))	
				}
			}).bind(this))
			this.appendFields()
		} else {
			// Here we can add only one
			$.each(dataSet.systemicParts, (function(index, value) {
				
				if(pageData.existingBoneOrgans != undefined){
					if(pageData.existingBoneOrgans.getObjectByKey("type", value.uri) == null){
						this.systemicPartSelectors.push(new SystemicPartSelector(
								this, value, this.dataToStore.boneOrgan))
					}
				} else {
					this.systemicPartSelectors.push(new SystemicPartSelector(
							this, value, this.dataToStore.boneOrgan))
				}

			}).bind(this))
			this.appendFields()
			this.addAddAllField()
		}
	},

	appendFields : function(){
		if(this.systemicPartSelectors.length > 0){
			$.each(this.systemicPartSelectors, (function(i, sysSel){
				this.subContainer.append(sysSel.container)
			}).bind(this))
			//this.addAllButton = undefined
			this.addAllButton.hide()
			this.saveButton.show().disable()
		} else {
			this.addAllButton.hide()
			this.subContainer.append(html.div("margin10").text("The bone division is complete!"))
		}
	},
	
	addAddAllField : function(){
		this.addAllButton.show()
	},
	
	addAll : function(){
		$.each(this.systemicPartSelectors, function(i, sysSel){
			if(sysSel.notAdded){
				sysSel.addInstance()
			}
		})
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
		if(this.addAllButton != undefined){
			this.refreshAddAllButton(thereIsNotAdded)
		}
	},
	
	refreshSaveButton : function(thereIsAdded){
		
		if(thereIsAdded){
			this.saveButton.enable()
		} else {
			this.saveButton.disable()
		}
	},
	
	refreshAddAllButton : function(thereIsNotAdded){
		
		if(thereIsNotAdded){
			this.addAllButton.enable()
		} else {
			this.addAllButton.disable()
		}
	},
	
	saveRoutine : function(){
		
		var toSend = { 
				operation : "addCoherentBoneRegion",
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
		
	window.location = baseUrl 
				+ "pageLoader?skeletalInventory=" + pageData.individual
				+ "&pageUri=skeletalInventory"
	}
}


