var CoherentSkeletalRegion = function(parent, parentData, descriptor) {

	this.parent = parent
	this.descriptor = descriptor
	this.parentData = parentData

	this.notAdded = true
	
	this.initData()
	this.init()
}


CoherentSkeletalRegion.prototype = {

	init : function() {

		this.container = html.div()
		this.titleContainer = html.div("titleContainer1")
		this.subContainer = html.div("subContainer")

		this.buttonContainer = html.div("inlineContainer")
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
				.hide()
		this.classLabel = html.div().text(this.descriptor.label)

		if (this.descriptor.existing != undefined) {
			this.separator = html.div("separator")
			this.assembleExisting()
			this.addExisting()
		} else {
			this.addAllButton.hide()
			this.addNewButton = new TextButton("New", (this.addNew).bind(this));
			this.addExisting = new TextButton("Existing",
					(this.selectExisting).bind(this))
			this.exitButton = new Button("exit", (this.exit).bind(this))
			this.assembleNew()
			if (this.descriptor.existingToSelect === undefined) {
				this.buttonContainer.hide()
				this.addNew()
			}
		}
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
					this.addAllButton.container,
					this.exitButton.container, 
			this.subContainer ], [ 0, 1, 2, 1, 2, 2, 2, 2, 0 ])
	},
	
	//@Override
	initData : function() {

		this.dataToStore = new Object()
		this.dataToStore.boneOrgans = []
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
				this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.classUri
			this.dataToStore.label = this.descriptor.label
		}
		this.parentData.push(this.dataToStore)
	},

	//@Override
	addExisting : function() {

		var arr = []
		this.systemicPartSelectors = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, (function(i, sys) {
			this.systemicPartSelectors.push(new SystemicPartAdder(this,
					this.descriptor.existing.systemicParts,
					this.dataToStore.boneOrgans, sys))
		}).bind(this))

		this.appendFields()
	},
	
	//@Override
	addNew : function(){

		this.systemicPartSelectors = []
		$.each(this.descriptor.systemicParts, (function(i, sys) {
			this.systemicPartSelectors.push(new SystemicPartAdder(this, null,
					this.dataToStore.boneOrgans, sys))
		}).bind(this))
		
		this.addNewButton.hide()
		this.addExisting.hide()
		this.addAllButton.show()
		this.exitButton.show()
		
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
	
	addAll : function(){
		
	},
	
	refresh : function(){
		
		var thereIsNotAdded = false
		var thereIsAdded = false
		
		
		this.notAdded = true
		$.each(this.systemicPartSelectors, (function(i, sysSel) {
			if (sysSel.notAdded) {
				thereIsNotAdded = true
			} else {
				this.notAdded = false
			}
		}).bind(this))
		this.parent.refresh()
	}
}

var SkeletalRegion = function() {

	// The dataset is fix
	this.descriptor = pageData.skeletalDivision
	this.mainData()
	CoherentSkeletalRegion.call(this, this, this.dataToStore.coherentBoneDivision,
			pageData.skeletalDivision)
	this.addSaveContainer()
}

SkeletalRegion.prototype = Object.create(CoherentSkeletalRegion.prototype)

$.extend(SkeletalRegion.prototype, {

	mainData : function() {

		this.dataToStore = new Object()
		this.dataToStore.coherentBoneDivision = []
		console.log(this.descriptor)
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
					this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.classUri
			this.dataToStore.label = this.descriptor.label
		}
	},
	
	initData : function(){
		
	},

	addSaveContainer : function(){
		
		this.saveContainer = html.div("saveContainer")
		this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
				.disable()
		this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
				.bind(this), "rightAligned")

		this.saveContainer.append(this.saveButton.container).append(this.cancelButton)
			.appendTo(this.container)
	},

	saveRoutine : function() {

		var toSend = {
			operation : "addCoherentBoneRegion",
			individual : pageData.individual,
			boneDivision : this.dataToStore
		}
		console.log(toSend)
		PopUpController.init()
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataInput",
			data : "dataToStore=" + JSON.stringify(toSend)
		}).done((function(msg) {
				if (pageData.existingBoneDivisionType == undefined) {
					pageData.existingBoneDivisionType = this.dataToStore.uri
				}
				
				var urlObject = {
					pageUri : "boneDivision",
					individual : msg.object.boneDivision.uri,
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
				}
				
				if(pageData.pageUri != "phalanges"){
					urlObject.cefPageUri = "phalanges"
				}
				
				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(urlObject)
			}).bind(this))
	},

	cancelRoutine : function() {

		window.location = baseUrl
				+ "pageLoader?skeletalInventory="
				+ pageData.individual
				+ "&pageUri=skeletalInventory"
	}, 

	addNew : function(){

		var arr = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, (function(i, systemicPart) {
			arr.push(new CoherentSkeletalRegion(this,
					this.dataToStore.coherentBoneDivision,
					systemicPart).container)
		}).bind(this))
		this.subContainer.append(arr)
	},
	
	
	refresh : function() {

		var thereIsNotAdded = false
		var thereIsAdded = false
		
		this.saveButton.disable()
		$.each(this.systemicPartSelectors, (function(i, sysSel) {
			if (sysSel.notAdded) {
				thereIsNotAdded = true
			} else {
				this.saveButton.enable()
			}
		}).bind(this))
		
		if (this.addAllButton != undefined) {
			this.refreshAddAllButton(thereIsNotAdded)
		}
	},
	
})

/*
 * This is called in the bone division page. It can handle the existing
 */


/*
 * This is the case when the page is called from a bone division page
 */


$("#pageContent").append(new SkeletalRegion().container)
