var CoherentSkeletalDivision = function() {

	// The dataset is fix
	this.descriptor = pageData.skeletalRegions
	this.init()
}

CoherentSkeletalDivision.prototype = {

	assemble : function() {

		UI.assemble(this.container, [ 
		      UI.inlineCont("margin3"),                     
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
			 ], [ 0, 1, 2, 2, 2, 0, 1, 0, 0, 1, 1])
	},	

	initUI : function(){
		
		this.container = html.div()
		this.titleContainer = html.div("titleContainer1")
			this.classLabel = html.div("inline").text(this.descriptor.label)
			this.separator = html.div("separator").hide()
			this.existingLabel = html.div("inline")
		
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
			this.separator.css("display", "inline-block")
			this.existingLabel.text(this.descriptor.existing.label)
			this.buttonContainer.hide()
			this.dataToStore.type = "existing",
			this.dataToStore.uri = this.descriptor.existing.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.uri
			this.dataToStore.label = this.descriptor.label
		}
		
		this.systemicPartSelectors = []
		//We add anyway the systemic parts
		console.log(this.dataToStore)
		$.each(this.descriptor.systemicParts1, (function(i, systemicPart) {
			
			this.systemicPartSelectors.push(new CoherentSkeletalSubdivision(
							this, this.dataToStore, systemicPart))
		}).bind(this))
		
		arr = []
		$.each(this.systemicPartSelectors, function(i, sysPart){
			
			arr.push(sysPart.container)
		})
		this.systemicPartsContainer.append(arr)
		this.assemble()
	},
	
	saveRoutine : function() {
		
		
		/*
		 * Remove the CoherentSkeletalREIGON
		 */
		arrToRemove = []
		$.each(this.dataToStore.coherentSkeletalDivision, function(i, value){
			if(typeof value.boneOrgan != "undefined" && value.boneOrgan.length == 0){
				arrToRemove.push(value)
			}
		})
		$.each(arrToRemove, (function(i, value){
			this.dataToStore.coherentSkeletalDivision.removeElement(value)	
		}).bind(this))
		
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
					pageUri : "coherentSkeletalDivision",
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
