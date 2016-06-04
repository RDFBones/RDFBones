var UIController = {

	/***************************************************************************
	 * Modules that are callable
	 **************************************************************************/

	modules : new Object(),	
	
	showBoneEditor : function(data){
		this.modules["boneEditor"].show(data)
	},
	
	/***************************************************************************
	 * Search Results
	 **************************************************************************/
	deleteResults : function() {
		$.each(classHierarcyVars.parents, function(index, value) {
			value.div.hide()
		})
	},

	showSearchResults : function() {
		// console.log(classHierarcyVars.parents)
		$.each(classHierarcyVars.parents, function(index, value) {
			if (value.toDisplay) {
				// console.log("ToDisplay " + index + " label " + value.label)
				value.div.show()
				if (value.searchIndex > -1) {
					UIController.displaySearchHit(value)
				} else {
					UIController.displayNoSearchHit(value)
				}
				if (value.childToDisplay) {
					UIController.setDisplay(value)
					UIController.showChildrenDiv(value)
				}
			} else {
				// value.div.addClass("redBorder")
				value.div.hide()
			}
		})
	},

	showChildrenDiv : function(parent) {
		$.each(parent.children, function(index, value) {
			if (value.toDisplay) {
				// console.log("ToDisplay " + index + " label " + value.label)
				value.div.show()
				if (value.searchIndex > -1) {
					UIController.displaySearchHit(value)
				} else {
					UIController.displayNoSearchHit(value)
				}
				if (value.childToDisplay) {
					UIController.setDisplay(value)
					showChildrenDiv(value)
				}
			} else {
				value.div.hide()
			}
		})
	},

	displaySearchHit : function(element) {
		console.log("searchindex + " + element.searchIndex)
		element.className1
				.text(element.label.substring(0, element.searchIndex))
		element.searchHit.text(element.label.substring(element.searchIndex,
				element.searchIndex + classHierarcyVars.searchStringLength))
		element.className2.text(element.label.substring(element.searchIndex
				+ classHierarcyVars.searchStringLength))
	},

	displayNoSearchHit : function(element) {
		element.className1.text(element.label)
		element.searchHit.text("")
		element.className2.text("")
	},

	setDisplay : function(element) {

		element.childrenContainer.show()
		if (element.children.length > 0) {
			if (element.childToDisplay) {
				element.plusButton.hide()
				element.minusButton.show()
			} else {
				element.plusButton.hide()
				element.minusButton.show()
			}
		}
	},
}
