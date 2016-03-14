var clickEvents = {

	plusImage : function(icon, childrenContainer){
		UIController.showPlus(icon, $(this))
		childrenContainer.show()
		console.log("Plus")
		console.log(childrenContainer)
	},

	minusImage : function(icon, childrenContainer){
		UIController.showMinus(icon, $(this))
		childrenContainer.hide()
		console.log(childrenContainer)
	}
}


var classTreeController = {
	
	init : function (){
		console.log(classes)
		dataOperations.createClassHierachryData(classes)
		this.showHiearchy()
	},	
		
	showHiearchy : function(){
		console.log(classHierarcyVars.parents)
		$.each(classHierarcyVars.parents, function(index, value){
			UIElements.classViewer.append(classTreeController.getChildrenDiv(value, false))
		})
	},

	getChildrenDiv : function (parent, hidden){
		
		var container = UIElements.getChildrenContainer()
		var className = UIElements.getClassNameDiv(parent.label)
		var childrenContainer = ui.getNewDiv()
		$.each(parent.children, function(index, value){
			childrenContainer.append(classTreeController.getChildrenDiv(value,true))
		})
		
		if(parent.children.length > 0){
			var plusImage = UIElements.getPlusImg().click(function(){
				clickEvents.plusImage($(this), childrenContainer)
			})
			var minusImage = UIElements.getMinusImg().click(function(){
				clickEvents.minusImage($(this), childrenContainer)
			})
			container.append(plusImage.hide()).append(minusImage)
		} else {
			var fillerDiv = UIElements.getFillerDiv()
			container.append(fillerDiv)
		}
		container.append(className)
		container.append(childrenContainer)
		return hidden ? container : container 
	}
}

classTreeController.init()

