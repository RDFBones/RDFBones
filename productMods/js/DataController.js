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
	}
}