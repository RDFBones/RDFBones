var SkeletalRegion = function() {

	// The dataset is fix
	this.descriptor = pageData.partlySymmetricSkeletalDivision
	this.mainData()
	this.addSaveContainer()
	CoherentSkeletalRegion.call(this, null,
			this.dataToStore.coherentSkeletalDivision,
			pageData.partlySymmetricSkeletalDivision)
	this.saveContainer.appendTo(this.container)
}

SkeletalRegion.prototype = Object.create(CoherentSkeletalRegion.prototype)

$.extend(SkeletalRegion.prototype,{

	mainData : function() {

		this.dataToStore = new Object()
		this.dataToStore.coherentSkeletalDivision = []
		console.log(this.descriptor)
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
					this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.label = this.descriptor.label
		}
	},

	initData : function() {

	},

	addSaveContainer : function() {

		this.saveContainer = html.div("saveContainer")
		this.saveButton = new TextButton("Save",
				(this.saveRoutine).bind(this)).disable()
		this.cancelButton = new TextButton("Cancel",
				(this.cancelRoutine).bind(this), "rightAligned")

		this.saveContainer.append(this.saveButton.container)
				.append(this.cancelButton)

	},

	saveRoutine : function() {

		var toSend = {
			operation : "addSkeletalRegion",
			individual : pageData.individual,
			skeletalSubdivision : this.dataToStore
		}
		console.log(toSend)
		PopUpController.init()

		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataInput",
			data : "dataToStore=" + JSON.stringify(toSend)})
			.done((function(msg) {
				if (pageData.existingBoneDivisionType == undefined) {
					pageData.existingBoneDivisionType = this.dataToStore.uri
				}

				var urlObject = {
					pageUri : "skeletalDivision",
					individual : msg.object.skeletalSubdivision.uri,
					skeletalDivision : msg.object.skeletalSubdivision.uri,
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
				}

				if (pageData.pageUri != "phalanges") {
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

	addNew : function() {

		this.systemicPartSelectors = []
		// Check if we can add existing to add
		$
				.each(
						this.descriptor.systemicParts1,
						(function(i, systemicPart) {
							this.systemicPartSelectors
									.push(new CoherentSkeletalRegion(
											this,
											this.dataToStore.coherentSkeletalDivision,
											systemicPart))
						}).bind(this))

		this.addNewButton.hide()
		this.addExisting.hide()
		this.complete.show()
		// this.exitButton.show()
		this.appendFields()
	},

	refresh : function() {

		var thereIsNotAdded = false
		var thereIsAdded = false

		this.saveButton.disable()
		$.each(this.systemicPartSelectors,
				(function(i, sysSel) {
					if (sysSel.notAdded) {
						thereIsNotAdded = true
					} else {
						this.saveButton.enable()
					}
					if (sysSel.notComplete) {
						this.complete.reset()
					}
				}).bind(this))
	},

})

CoherentBoneRegionSelectorPartlySymmetric = function() {

	this.descriptor = pageData.skeletalRegions

	this.container = html.div()
	this.addButton = new Button("add", (this.addSkeletalDivision).bind(this))
	// Coherent Bone Region

	this.subContainer = html.div()
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
			.disable()
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
			.bind(this), "rightAligned")

	this.saveContainer.append(this.saveButton.container).append(
			this.cancelButton.container)

	this.initSelector()
	this.assemble()
}

CoherentBoneRegionSelectorPartlySymmetric.prototype = {

	initSelector : function() {
		this.selector = UI.classSelector(this.descriptor.systemicParts1)
	},

	assemble : function() {
		this.container
			.append(this.selector)
			.append(this.addButton.container)
			.append(this.subContainer)
			.append(this.saveContainer)
	},

	addSkeletalDivision : function(){
		
		this.selector.hide()
		this.addButton.container.hide()
		this.dataToStore = []
		var descriptor = this.descriptor.systemicParts1.getObjectByKey(this.selector.val())
		this.skeletalRegionSelector = new CoherentSkeletalRegion(this, this.dataToStore, descriptor)
		this.subContainer.append(this.skeletalRegionSelector.container)
	},
	
	refresh : function(){

		console.log(this.dataToStore)
		var thereIsNotAdded = false
		var thereIsAdded = false

		if(this.skeletalRegionSelector.notAdded){
			this.saveButton.disable()
		} else {
			this.saveButton.enable()
		}		
	},
	
	saveRoutine : function(){

		var toSend = {
			operation : "addCoherentBoneRegion",
			individual : pageData.individual,
			boneDivision : this.dataToStore[0]
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

				if (pageData.pageUri != "phalanges") {
					urlObject.cefPageUri = "phalanges"
				}

				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(urlObject)
				window.location = baseUrl + "pageLoader?"
						+ DataLib.getUrl(urlObject)
			}).bind(this))
		
	},
	
	cancelRoutine : function(){
		
		window.location = baseUrl
			+ "pageLoader?skeletalInventory="
			+ pageData.individual
			+ "&pageUri=skeletalInventory"
	}
}

var CoherentBoneRegionSelectorSymmetric = function() {
	
	CoherentBoneRegionSelectorPartlySymmetric.call(this)
}

CoherentBoneRegionSelectorSymmetric.prototype = Object.create(CoherentBoneRegionSelectorPartlySymmetric.prototype)	


$.extend(CoherentBoneRegionSelectorSymmetric.prototype, {
	
	initSelector : function() {
		this.selector = UI.classSelector(this.descriptor.subClasses1)
	},

	addSkeletalDivision : function(){
		
		this.selector.hide()
		this.addButton.container.hide()
		this.dataToStore = []
		var descriptor = this.descriptor.subClasses1.getObjectByKey("uri", this.selector.val())
		this.skeletalRegionSelector = new CoherentSkeletalRegion(this, this.dataToStore, descriptor)
		this.subContainer.append(this.skeletalRegionSelector.container)
	},
})
