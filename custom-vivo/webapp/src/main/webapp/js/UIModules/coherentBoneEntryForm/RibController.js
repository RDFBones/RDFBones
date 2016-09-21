


var RibController = function(){
	
	console.log(pageData.ribs.subClasses)
	this.container = html.div().text("Ribs")

	this.cnt = 0
	this.dataToStore = new Object()
	this.dataToStore.uri = FMA + "7480",
	this.dataToStore.label = "Rib Cage"
	this.dataToStore.type = "new"
	this.dataToStore.boneOrgan = []
	
	this.selector = UI.classSelector(pageData.ribs.subClasses)
	this.addButton = new Button("add", (this.addRib).bind(this))
	
	this.container = html.div()
	this.subContainer = html.div("subContainer")
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
			.disable()
	
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
			.bind(this), "rightAligned")
	
	this.assemble()		
	
}


RibController.prototype = {
	
	assemble : function(){
			
		UI.assemble(this.container, [
		       html.div("title").text("Rib Cage"),
		       html.div("inlineContainer"),
		       	   this.selector,
		       	   this.addButton.container,
		       this.subContainer,
		       this.saveContainer,
		       	   this.saveButton.container,
		       	   this.cancelButton.container,
			], [0, 0, 1, 1, 0, 0, 1, 1])
	},	
		
	addRib : function(){
		
		this.cnt++
		dataObject = pageData.ribs.subClasses.getObjectByKey("uri", this.selector.val())
		this.subContainer.append(
				new BoneOrganField(this, dataObject, this.dataToStore.boneOrgan, true).container)
		this.refresh()
	},

	refresh : function(){
		if(this.cnt > 0){
			this.saveButton.enable()
		} else {
			this.saveButton.disable()
		}
	},
	
	reset : function(uri, boneOrganField){
		this.cnt--
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
					cefPageUri : "phalanxOfToe",
					individual : msg.object.boneDivision.uri,
					skeletalDivision : msg.object.boneDivision.uri,
					skeletalDivisionType : pageData.skeletalDivisionType, 
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
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

var SingleRibController = function(){
	
	RibController.call(this)
}

SingleRibController.prototype = Object.create(RibController.prototype)

$.extend(SingleRibController.prototype, {
		
		
		saveRoutine : function(){

			var toSend = {
				operation : "addSingleBoneRegion",
				individual : pageData.individual,
				skeletalDivisionClass : pageData.skeletalDivisionClass,
				boneOrgan : this.dataToStore.boneOrgan
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
								
				var urlObject = {
						pageUri : "skeletalInventory",
						individual : pageData.individual,
					}
					
					window.location = baseUrl
							+ "pageLoader?"
							+ DataLib.getUrl(urlObject)
				}).bind(this))
		},
		
		cancelRoutine : function(){
			
			window.location = baseUrl
				+ "pageLoader?skeletalInventory="
				+ pageData.individual
				+ "&pageUri=skeletalInventory"
		}	
})