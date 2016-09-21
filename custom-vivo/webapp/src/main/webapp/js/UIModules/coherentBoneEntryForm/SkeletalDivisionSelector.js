
CoherentSkeletalSubdivisionSelector = function() {

	this.descriptor = pageData.skeletalRegions
	this.init()
}


//Neurocranium, Viscerocranium
CoherentSkeletalSubdivisionSelector.prototype = {

	initUI : function(){
		
		this.container = html.div()
		this.addButton = new Button("add", (this.addSkeletalDivision).bind(this))
		// Coherent Bone Region

		this.selector = this.getSelector()
		this.subContainer = html.div()
		
		this.saveContainer = html.div("saveContainer")
		this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
				.disable()
		this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
				.bind(this), "rightAligned")

		this.saveContainer.append(this.saveButton.container).append(
				this.cancelButton.container)
	},
		
	getSelector : function(){
		return UI.classSelector(this.descriptor.systemicParts1)
	},
	
	init : function(){

		this.initUI()
		if(pageData.skeletalRegions.existing.uri != undefined){
			
			//We add the Coherent Skeletal Region immediately
			//We extend the data structure of it with the existing
			this.selector.hide()
			this.addButton.container.hide()
			this.dataToStore = new Object()
		
			//This will be checked in the CoherentSkeletalRegion object
			
			descriptorToPass = this.getDescriptor(pageData.skeletalRegions.existing.type)
			
			descriptorToPass.existing = new Object()
			descriptorToPass.existing.uri = pageData.skeletalRegions.existing.uri
			descriptorToPass.existing.label = pageData.skeletalRegions.existing.label

			//$.extend(descriptor, pageData.skeletalRegions.existing)
			this.skeletalRegionSelector = new SkeletalDivision(this, this.dataToStore, descriptorToPass)
			this.subContainer.append(this.skeletalRegionSelector.container)
		}
		this.assemble()
	},
	
	getDescriptor : function(uri){
		
		return this.descriptor.systemicParts1.getObjectByKey("uri", uri)
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
		var descriptor = this.getDescriptor(this.selector.val())
		this.skeletalRegionSelector = new SkeletalDivision(this, this.dataToStore, descriptor)
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
	
	getName : function(){
		return "coherentSkeletalSubdivisionCEF"
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
					pageUri : "skeletalDivision",
					cefPageUri : this.getName(),
					individual : msg.object.boneDivision.uri,
					skeletalDivision : msg.object.boneDivision.uri,
					skeletalDivisionType : pageData.skeletalDivisionType, 
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
					skeletalRegion : pageData.skeletalRegions.uri
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


SymmetricSkeletalDivisionSelector = function(){
	
	CoherentSkeletalSubdivisionSelector.call(this)
}

SymmetricSkeletalDivisionSelector.prototype = Object.create(CoherentSkeletalSubdivisionSelector.prototype)	

$.extend(SymmetricSkeletalDivisionSelector.prototype, {
	
	getDescriptor : function(uri){
		return this.descriptor.subClasses1.getObjectByKey("uri", uri)
	},
	
	getSelector : function(){
		return UI.classSelector(pageData.skeletalRegions.subClasses1)
	},
	
	getName : function(){
		return "symmetricSkeletalDivisionCEF"
	}
	
})

