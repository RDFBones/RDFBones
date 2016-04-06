var DataController = {

	addSystemicPart : function(boneData, classUri){
		
		console.log(boneData)
		UIController.modules["boneEditor"].waitForResult()
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "systemic",
				boneUri : boneData.uri,
				classUri : classUri,
			}
			}).done(function(msg){
				var result = $.parseJSON(msg)
				var newObject = DataController.initCoherentBone(result.systemicUri, classUri, boneData)
				if(! ("systemicParts" in boneData)){
					console.log("addded")
					boneData.systemicParts = []
				} 
				boneData.systemicParts.push(newObject)
				UIController.modules["boneEditor"].show1(newObject)
			})
	},	

	initCoherentBone : function(uri, classUri, parent){
		var newObject = new Object()
		newObject.uri = uri
		newObject.parent = parent
		newObject.label = "Default"
		newObject.classUri = classUri
		newObject.images = []
		newObject.systemicParts = []
		return newObject
	},
	
	saveLiteral : function(literalEditor, old, new_){
		//Save it in the local store
		console.log(literalEditor.data)
		literalEditor.data[literalEditor.id]
				= new_
		console.log(coherentBones)
		console.log(singleBones)
		//Save it in the database
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "editLiteral",
				subject : literalEditor.data.uri,
				predicate : literalEditor.predicate,
				oldValue : old,
				newValue : new_,
				}
			}).done(function(msg){
				literalEditor.saved()
			})
	},
	
	getBones : function(tableLoader){
		$.ajax({
			url : baseUrl + "skeletalInventoryQuery",
			data : {
				skeletalInventory : skeletalInventory,
				dataOperation : tableLoader.module.dataKey,
			}
		}).done(function(msg){
			var results = $.parseJSON(msg)
			console.log(results)
			var length = ""
			$.each(results, function(index, object){
				
				tableLoader.module.dataSet.push(object)
				/*
				object.images = []
				DataController.loadImages(object)
				object.systemicParts = []
				DataController.loadSystemicParts(object)*/
			})
			console.log("Arrived Data")
			console.log(tableLoader.module.dataKey)
			console.log(tableLoader.module.dataSet)
			pageLoader.refreshTables()
		})
	},
	
	loadImages : function(object){
		$.ajax({
			url : baseUrl + "skeletalInventoryQuery",
		    async: false,
			data : {
				boneUri : object.boneUri,
				type : "images",
			}
		}).done(function(msg){
			console.log("laodImagesDones")
			var results = $.parseJSON(msg)
			$.each(results, function(index, value){
				object.images.push(value)
			})
			pageLoader.refreshTables()
		})
	},
	
	loadSystemicParts : function(object, lenght, i){
		$.ajax({
			url : baseUrl + "skeletalInventoryQuery",
		    async: false,
			data : {
				boneUri : object.boneUri,
				type : "systemicParts",
			}
		}).done(function(msg){
			console.log("loadSystemicParts")
			var results = $.parseJSON(msg)
			$.each(results, function(index, value){
				object.systemicParts.push(value)
			})
			if(length == i + 1){
				pageLoader.refreshTables()
			}
			
		})
	},
	
	
	addBone : function(classUri){
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				skeletalInventory : skeletalInventory,
				dataOperation : "newBone",
				classUri : classUri,
			}
		}).done(function(msg){
			result = $.parseJSON(msg)
			var bone = DataController.initCoherentBone(result.boneUri, classUri, null)
			if(classUri == "http://purl.obolibrary.org/obo/FMA_53672" ||
					classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
				coherentBones.push(bone)
			} else {
				singleBones.push(bone)
			}
			console.log("Saving is done")
			Controller.showBoneViewer(bone)
		})
	},
}