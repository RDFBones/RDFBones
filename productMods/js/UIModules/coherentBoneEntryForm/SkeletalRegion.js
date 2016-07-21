var SkeletalRegion = function() {

	// The dataset is fix
	this.descriptor = pageData.partlySymmetricSkeletalDivision
	this.init()
}

//SkeletalRegion.prototype = 
	//Object.create(CoherentSkeletalRegion.prototype)

SkeletalRegion.prototype =  {

	assemble : function() {

		UI.assemble(this.container, [ 
		      UI.inlineCont("margin10"),                     
		      	this.titleContainer, 
			      	this.classLabel,
			      	this.separator,
			      	this.existingLabel, 
			     this.buttonContainer, 
					this.complete.container,
				 this.systemicPartsContainer,
				 this.saveContainer,
				 	this.saveButton.container,
				 	this.cancelButton.container,
			this.subContainer ], [ 0, 1, 2, 2, 2,  1, 2, 1, 1, 2, 2, 0 ])
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
		
		this.systemicPartsContainer = html.div("subContainer")
		
		this.saveContainer = html.div("saveContainer")
			this.saveButton = new TextButton("Save",
				(this.saveRoutine).bind(this)).disable()
			this.cancelButton = new TextButton("Cancel",
				(this.cancelRoutine).bind(this), "rightAligned")
	},
	
	init : function(){
		
		this.initUI()
		
		this.dataToStore = new Object()
		this.dataToStore.coherentSkeletalDivision = []
		
		if(this.descriptor.existing.uri != undefined){
			this.existingLabel.text(pageData.existingSkeletalRegion)
			this.buttonContainer.hide()
			this.dataToStore.type = "existing",
			this.dataToStore.existing.uri = this.descriptor.existing.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.label = this.descriptor.label
		}
		//We add anyway the systemic parts
		$.each(this.descriptor.systemicParts1, (function(i, systemicPart) {
			this.systemicPartSelectors.push(new CoherentSkeletalRegionOfSkeletalRegion(
							this, this.dataToStore.coherentSkeletalDivision, systemicPart))
		}).bind(this))
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

}


CoherentBoneRegionSelectorPartlySymmetric = function() {

	this.descriptor = pageData.skeletalRegions

	

	this.init()
}


//Neurocranium, Viscerocranium
CoherentBoneRegionSelectorPartlySymmetric.prototype = {

	initUI : function(){
		
		this.container = html.div()
		this.addButton = new Button("add", (this.addSkeletalDivision).bind(this))
		// Coherent Bone Region

		this.selector = UI.classSelector(this.descriptor.systemicParts1)
		this.subContainer = html.div()
		
		this.saveContainer = html.div("saveContainer")
		this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
				.disable()
		this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
				.bind(this), "rightAligned")

		this.saveContainer.append(this.saveButton.container).append(
				this.cancelButton.container)
	},
		
	init : function(){
		
		this.initUI()
		if(pageData.skeletalRegions.existing.uri != undefined){
			
			//We add the Coherent Skeletal Region immediately
			//We extend the data structure of it with the existing
			this.selector.hide()
			this.addButton.container.hide()
			this.dataToStore = new Object()
			var descriptor = this.descriptor.systemicParts1.getObjectByKey("uri", pageData.skeletalRegions.existing.type)

			//This will be checked in the CoherentSkeletalRegion object
			descriptor.existing = new Object()
			descriptor.existing.uri = pageData.skeletalRegions.existing.uri
			
			//$.extend(descriptor, pageData.skeletalRegions.existing)
			this.skeletalRegionSelector = new CoherentSkeletalRegion(this, this.dataToStore, descriptor)
			this.subContainer.append(this.skeletalRegionSelector.container)
		}
		this.assemble()
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
		this.dataToStore = new Object()
		var descriptor = this.descriptor.systemicParts1.getObjectByKey("uri", this.selector.val())
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
					skeletalDivision : msg.object.boneDivision.uri,
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
					skeletalRegion : pageData.skeletalRegions.uri
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


//Every other
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


var ExistingCoherentBoneRegionSelectorSymmetric = function(){
	
	CoherentBoneRegionSelectorPartlySymmetric.call(this)
}


ExistingCoherentBoneRegionSelectorSymmetric.prototype = Object.create(CoherentBoneRegionSelectorPartlySymmetric.prototype)	


ExistingCoherentBoneRegionSelectorSymmetric.prototype.init = function(){
	//Select the existing 
	this.assemble()
	this.addSkeletalDivision()
}

ExistingCoherentBoneRegionSelectorSymmetric.prototype.addSkeletalDivision = function(){
	
	this.selector.hide()
	this.addButton.container.hide()
	this.dataToStore = []
	//From the initital ontological we get the type of the existing
	var descriptor = pageData.skeletalRegions.subClasses1.getObjectByKey("uri", 
			pageData.existingBoneDision.type)
	this.skeletalRegionSelector = new ExistingCoherentSkeletalRegion(this, this.dataToStore, descriptor)
	this.subContainer.append(this.skeletalRegionSelector.container)
}
