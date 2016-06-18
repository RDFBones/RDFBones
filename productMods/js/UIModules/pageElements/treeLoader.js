var treeLoader = {

	showTree1 : function(module, treeData) {
		
		var treeContainer = html.getDivId(module.id)
		//TreeTitle
		treeContainer.append(UI.getTitle(module.title))
		//Treedata
		$.each(treeData, function(index, value) {
			treeContainer.append(treeLoader.getChildrenDiv(value, false))
		})
		return treeContainer
	},

	showTree2 : function(module, treeData) {
		
		var treeContainer = html.getDivId(module.id)
		//TreeTitle
		treeContainer.append(UI.getTitle(module.title))
		//Treedata
		$.each(treeData, function(index, value) {
			treeContainer.append(treeLoader.getChildrenDiv(value, true))
		})
		return treeContainer
	},

	getChildrenDiv : function(parent, single) {
		
		var container = treeUI.getChildrenContainer()
		var classNameNameContainer = treeUI.getClassNameDiv()
		var className1 = treeUI.getClassNameDiv(parent.label)
		var searchHit = treeUI.getSearchHitDiv()
		var className2 = treeUI.getClassNameDiv()
		classNameNameContainer.append(className1).append(searchHit).append(
				className2)

		var childrenContainer = html.getNewDiv()
		if ("children" in parent){
			$.each(parent.children, function(index, value) {
				childrenContainer.append(treeLoader.getChildrenDiv(value, single))
			})
			if (parent.children.length > 0) {
				var plusImage = treeUI.getPlusImg().click(function() {
					Controller.plusImage($(this), childrenContainer)
				})
				parent.plusButton = plusImage
				var minusImage = treeUI.getMinusImg().click(function() {
					Controller.minusImage($(this), childrenContainer)
				})
				parent.minusButton = minusImage
				// Initially every element is closed
				container.prepend(minusImage.hide()).prepend(plusImage)
				classHierarcyVars.saveChildrenGroupDiv(childrenContainer)
				if (!single) {
					classNameNameContainer.append(treeUI
							.addInstanceImg(parent.uri))
				}
			}
		} else {
			var fillerDiv = treeUI.getFillerDiv()
			container.prepend(fillerDiv)
			if(single){
				classNameNameContainer.append(treeUI
						.addInstanceImg(parent.uri))
			}
		}
		container.append(classNameNameContainer)
		container.append(childrenContainer.hide())

		parent.div = container
		parent.className1 = className1
		parent.searchHit = searchHit
		parent.className2 = className2
		parent.childrenContainer = childrenContainer
		return container
	},

	
}