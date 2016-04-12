var Controller = {
		
	showBoneViewer : function(data){
		UIController.modules["boneEditor"].show1(data)
	},
		
	/***************************************************************************
	 * Creating new bones
	 **************************************************************************/
	addNewBone : function(classUri){
		UIController.modules["boneEditor"].waitForResult()
		console.log("ClassUri " + classUri)
		DataController.addBone(classUri)
	},

	addSystemicPart : function(boneData, classUri){
		UIController.modules["boneEditor"].waitForResult()
		DataController.addSystemicPart(boneData, classUri)
	},
	
	deleteBone : function(coherent, index){
		DataController.deleteBones(coherent, index)
	},
	
	refreshPage : function(){
		$("#pageContainer").empty()
		pageLoader.init()
	},
	
	/***************************************************************************
	 * Old operations
	 **************************************************************************/
	
	showPlus : function(icon) {
		icon.next().css("display", "inline-block")
		icon.hide()
	},

	showMinus : function(icon) {
		icon.prev().css("display", "inline-block")
		icon.hide()
	},
	
	plusImage : function(icon, childrenContainer){
		this.showPlus(icon, $(this))
		childrenContainer.show()
	},

	minusImage : function(icon, childrenContainer){
		this.showMinus(icon, $(this))
		childrenContainer.hide()
	},
}