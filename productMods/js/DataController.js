var DataController = {
		
	addSystemicPart : function(bone, classUri){
		var newObject = this.initCoherentBone(bone, classUri)
		console.log(newObject)
		bone.systemicParts.push(newObject)
		return newObject
	},	

	initCoherentBone : function(parent, classUri){
		var newObject = new Object()
		newObject.uri = Math.random()
		newObject.parent= parent
		newObject.label = "Default label"
		newObject.classUri = classUri
		newObject.images = []
		newObject.systemicParts = []
		return newObject
	},
	
	saveLiteral : function(data, key, value){
		console.log(key)
		data[key] = value
	},
	
	getCoherentBones : function(){
		this.ajaxQuery("getCoherent")
	},

	getCoherentBone : function(){
		this.ajaxQuery("getSingle")
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
			
			var result = $.parseJSON(msg);
			console.log(result)
			DataController.saveAndShowBone(classUri, result)
			/*
			var varToStore = null
			switch(type){
				case "getSingle" :
				  varToStore = singleBones
				  break
				case "getCoherent" :
				  varToStore = coherentBones
			}
			$.each(results, function(index, bone){
				varToStore.push(bone)
			})*/
		})
	},
	
	saveAndShowBone : function(classUri, newObject){
		newObject.images = []
		if(classUri == "http://purl.obolibrary.org/obo/FMA_53672" 
			|| classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
			console.log("coherentBones")
			coherentBones.push(newObject)
		} else {
			console.log("singleBones")
			singleBones.push(newObject)
		}
		Controller.showBoneViewer(newObject)
	}
		

		
		

}