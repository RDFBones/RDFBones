var Controller = {
		
	showBoneViewer : function(data){
		UIController.modules["boneEditor"].show1(data)
	},
		
	/***************************************************************************
	 * Creating new bones
	 **************************************************************************/
	addNewBone : function(classUri){
		UIController.modules["boneEditor"].waitForResult()
		DataController.addBone("new", null, classUri)
	},

	addSystemicPart : function(boneData, classUri){
		UIController.modules["boneEditor"].waitForResult()
		DataController.addBone("systemic", boneData.uri, classUri)
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