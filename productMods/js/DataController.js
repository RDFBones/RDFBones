var DataController = {

	addBone : function(classUri){
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "newBone",
				skeletalInventory : skeletalInventory,
				classUri : classUri,
				label : "Default",
			}
		}).done(function(msg){
			result = $.parseJSON(msg)
			var bone = DataController.boneObject(null, result)
			if(classUri == "http://purl.obolibrary.org/obo/FMA_53672" ||
					classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
				coherentBones.push(bone)
			} else {
				singleBones.push(bone)
			}
			console.log("Saving is done")
			console.log(bone)
			Controller.showBoneViewer(bone)
		})
	},

	addSystemicPart : function(parent, classUri){
		console.log("Add Systemic Part")
		console.log(parent)
		UIController.modules["boneEditor"].waitForResult()
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "systemic",
				parentUri : parent.uri,
				classUri : classUri,
				label : "Default",
			}
			}).done(function(msg){
				var result = $.parseJSON(msg)
				var newObject = DataController.boneObject(parent, result)
				parent.systemicParts.push(newObject)
				Controller.showBoneViewer(newObject)
			})
	},	

	saveLiteral : function(literalEditor, old, new_){
		//Save it in the local store
		literalEditor.data[literalEditor.id]
				= new_
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "editLiteral",
				boneUri : literalEditor.data.uri,
				predicate : literalEditor.predicate,
				oldValue : old,
				newValue : new_,
				}
			}).done(function(msg){
				literalEditor.saved()
			})
	},
	
	deleteBones : function(coherent, index){
		var data = null
		if(coherent){
			data = coherentBones[index]
			coherentBones.splice(index,1)
		} else {
			data = singleBones[index]
			singleBones.splice(index,1)
		}
		$.ajax({
			url : baseUrl + "skeletalInventoryData",
			data : {
				dataOperation : "delete",
				skeletalInventory : skeletalInventory,
				completeness : data.completeness,
				boneUri : data.uri,
				classUri : data.classUri,
				label : data.label,
			}
		}).done(function(){
			console.log("Data is deleted")
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
			var length = results.length
			$.each(results, function(index, object){
				tableLoader.module.dataSet.push(
						DataController.boneObject(null, object))
				//DataController.loadSystemicParts(tableLoader, object, length, index)
				//DataController.loadImages(object)
			})
			tableLoader.refresh()
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
	
	loadSystemicParts : function(tableLoader, parent, lenght, i){
		$.ajax({
			url : baseUrl + "skeletalInventoryQuery",
			data : {
				parentUri : parent.uri,
				dataOperation : "systemic",
			}
		}).done(function(msg){
			console.log("loadSystemicParts")
			var results = $.parseJSON(msg)
			$.each(results, function(index, value){
				object.systemicParts.push(
						DataController.boneObject(parent, value))
			})
			tableLoader.refresh()
		})
	},
	
	boneObject : function(parent, object){
		var newObject = new Object()
		newObject.uri = object.boneUri
		newObject.classUri = object.classUri
		newObject.completeness = object.completeness
		newObject.label = object.label
		newObject.description = object.description
		newObject.classUri = object.classUri
		newObject.parent = parent
		newObject.images = []
		newObject.systemicParts = []
		return newObject
	},
	
	getClassObject : function(classUri){
		var toReturn
		$.each(treeStructure, function(index, value){
			//console.log(value.uri + "  " + classUri)
			if(value.uri === classUri){
				toReturn = value
				return false
			} else {
				$.each(value.children, function(index1, value1){
					//console.log("innner " + value1.uri + "  " + classUri)
					if(value1.uri === classUri){
						toReturn = value1
						return false
					} 
				})
			}
		})
		return toReturn
	}
}