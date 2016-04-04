var Controller = {
		
	/***************************************************************************
	 * Creating new bones 
	 **************************************************************************/
	plusImage : function(icon, childrenContainer){
		this.showPlus(icon, $(this))
		childrenContainer.show()
	},

	minusImage : function(icon, childrenContainer){
		this.showMinus(icon, $(this))
		childrenContainer.hide()
	},
	
	addBone : function(classUri){
		var newObject = DataController.initCoherentBone(null, classUri)
		console.log(classUri)
		if(classUri == "1" || classUri == "2"){
			coherentBones.push(newObject)
		} else {
			singleBones.push(newObject)
		}
		UIController.modules["boneEditor"].show1(newObject)
	},
	
	refreshPage : function(){
		$("#pageContainer").empty()
		pageLoader.init()
	},
	
	showPlus : function(icon) {
		icon.next().css("display", "inline-block")
		icon.hide()
	},

	showMinus : function(icon) {
		icon.prev().css("display", "inline-block")
		icon.hide()
	},
}