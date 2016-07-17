
var SkeletalRegion = function() {

	// The dataset is fix
	this.descriptor = pageData.partlySymmetricSkeletalDivision
	this.mainData()
	this.addSaveContainer()
	CoherentSkeletalRegion.call(this, null, this.dataToStore.coherentSkeletalDivision,
			pageData.partlySymmetricSkeletalDivision)
	this.saveContainer.appendTo(this.container)	
}

SkeletalRegion.prototype = Object.create(CoherentSkeletalRegion.prototype)

$.extend(SkeletalRegion.prototype, {

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
			data : "dataToStore=" + JSON.stringify(toSend)
		}).done((function(msg) {
				if (pageData.existingBoneDivisionType == undefined) {
					pageData.existingBoneDivisionType = this.dataToStore.uri
				}
				
				var urlObject = {
					pageUri : "skeletalDivision",
					individual : msg.object.skeletalSubdivision.uri,
					skeletalDivision :  msg.object.skeletalSubdivision.uri,
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

		this.systemicPartSelectors = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts1, (function(i, systemicPart) {
			this.systemicPartSelectors.push(new CoherentSkeletalRegion(this,
					this.dataToStore.coherentSkeletalDivision,
					systemicPart))
		}).bind(this))
		
		this.addNewButton.hide()
		this.addExisting.hide()
		this.complete.show()
		//this.exitButton.show()
		this.appendFields()
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
			if(sysSel.notComplete){
				this.complete.reset()
			}
		}).bind(this))
	},
	
})


CoherentBoneRegion = function(){

	
}

$.extend(CoherentBoneRegion.prototype, {
		
		saveRoutine : function() {

			var toSend = {
				operation : "addSkeletalRegion",
				individual : pageData.individual,
				boneDivision : this.dataToStore.coherentSkeletalDivision,
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
						pageUri : "skeletalInventory",
						individual : "http://testIndividual",
					}
					
					if(pageData.pageUri != "phalanges"){
						urlObject.cefPageUri = "phalanges"
					}
					
					window.location = baseUrl
							+ "pageLoader?"
							+ DataLib.getUrl(urlObject)
				}).bind(this))
				
		},
		
})

var ExistingSkeletalRegion = function(){
	
	
}

ExistingSkeletalRegion.prototype = {
	
	
}

