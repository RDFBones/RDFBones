var DataController = {
	
		
	addSystemicPart : function(boneData, classUri){
		
		console.log(boneData)
		UIController.modules["boneEditor"].waitForResult()
		$.ajax({
			url : baseUrl + "skeletalInventory",
			data : {
				dataOperation : "newData",
				type : "systemic",
				boneUri : boneData.uri,
				classUri : classUri,
			}
			}).done(function(msg){
				var result = $.parseJSON(msg)
				var newObject = DataController.initCoherentBone(result.uri, classUri, boneData)
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
		newObject.label = "Default label"
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
			url : baseUrl + "skeletalInventory",
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
			url : baseUrl + "skeletalInventory",
			data : {
				skeletalInventory : skeletalInventory,
				dataOperation : "query",
				type : tableLoader.module.dataKey,
			}
		}).done(function(msg){
			var results = $.parseJSON(msg)
			console.log("Answer!")
			console.log(results)
			$.each(results, function(index, obj){
				obj.images = []
				tableLoader.dataSet.push(obj)
			})
			pageLoader.refreshTables()
		})
	},
	
	addBone : function(type, boneUri, classUri){
		$.ajax({
			url : baseUrl + "skeletalInventory",
			data : {
				skeletalInventory : skeletalInventory,
				dataOperation : "newData",
				type : type,
				classUri : classUri,
				boneUri : boneUri,
			}
		}).done(function(msg){
			result = $.parseJSON(msg)
			bone = new Object()
			bone.uri = result.uri
			bone.classUri = classUri
			bone.parent = null
			bone.images = []
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