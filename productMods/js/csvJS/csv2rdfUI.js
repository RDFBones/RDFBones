var csv2rdfUI = {

	addNewInstance : function(varName) {
		return csv2rdfUIConstant.instanceDiv(varName).appendTo(
				csv2rdfHTML.instancesDiv)
	},

	addTypeTriple : function(classUri) {
		csv2rdfUIConstant.rdfTypeDiv(classUri).appendTo(
				csv2rdfHTML.newInstanceTriple)
	},

	addCSVTitles : function(name) {
		return csv2rdfUIConstant.literalDiv().text(name)
	},

	/***************************************************************************
	 * Field selector state functions
	 **************************************************************************/


	setInstanceSelectState : function() {
		csv2rdfHTML.instancesDiv.css("border", "2px solid red")
		$('.instanceField').addClass("modifyNode")
	},

	setLiteralSelectState : function() {
		csv2rdfHTML.literalsDiv.css("border", "2px solid red")
		$('.literalField').addClass("modifyNode")
	},

	resetInstanceSelectState : function() {
		csv2rdfHTML.instancesDiv.css("border", "2px solid white")
		$('.instanceField').removeClass("modifyNode")
	},

	resetLiteralSelectState : function() {
		csv2rdfHTML.literalsDiv.css("border", "2px solid white")
		$('.literalField').removeClass("modifyNode")
	},

	/***************************************************************************
	 * Subject
	 **************************************************************************/

	addSubjectTmpDiv : function() {
		var subTmpDiv = csv2rdfUIConstant.objectTmpDiv("Select instance!")
		csv2rdfHTML.subject.append(subTmpDiv)
		return subTmpDiv
	},

	replaceSubjectDivWithTmp : function(subjectDiv) {
		var subTmpDiv = ui.getNewDivT("Select subject!")
		subTmpDiv.insertAfter(subjectDiv)
		subjectDiv.remove()
		return subTmpDiv
	},

	setSubject : function(div) {
		var subjectDiv = csv2rdfUIConstant.instanceTripleField(div.text())
		csv2rdfHTML.subject.append(subjectDiv)
		return subjectDiv
	},

	resetSubject : function(div, currentDiv) {
		this.resetInstanceSelectState()
		var cloneDiv = csv2rdfUIConstant.instanceTripleField(div.text())
		cloneDiv.insertAfter(currentDiv)
		currentDiv.remove()
		return cloneDiv
	},

	/***************************************************************************
	 * Predicate
	 **************************************************************************/
	addPredicateTmpDiv : function() {
		var predicateTmpDiv = csv2rdfUIConstant.predicateTmpDiv()
		csv2rdfHTML.predicate.append(predicateTmpDiv)
		return predicateTmpDiv
	},

	resetPredicate : function(name, oldPredicateDiv) {
		var predicateDiv = ui.getNewDiv("varField", name)
		predicateDiv.insertAfter(oldPredicateDiv)
		oldPredicateDiv.remove()
		return predicateDiv
	},

	/***************************************************************************
	 * Object
	 **************************************************************************/

	replaceObjectDivWithTmp : function(currentObjectDiv, tmpDiv) {
		tmpDiv.insertAfter(currentObjectDiv)
		currentObjectDiv.remove()
	},

	addInstanceTmpDiv : function(tmpDiv) {
		csv2rdfHTML.object.append(tmpDiv)
	},
	
	setObjectSelectorState : function(objectType) {
		switch (objectType) {
		case csv2rdfStateConstants.objectTypes.instance:
			this.setInstanceSelectState()
			return csv2rdfUIConstant.objectTmpDiv("Select instance!")
			break
		case csv2rdfStateConstants.objectTypes.literal:
			this.setLiteralSelectState()
			return csv2rdfUIConstant.objectTmpDiv("Select literal!")
			break
		}
	},
	
	resetObject : function(div, currentDiv, objectType) {
		
		switch (objectType) {
		case csv2rdfStateConstants.objectTypes.instance:
			this.resetInstanceSelectState()
			var cloneDiv = csv2rdfUIConstant.instanceTripleField(div.text())
			break
		case csv2rdfStateConstants.objectTypes.literal:
			this.resetLiteralSelectState()
			var cloneDiv = csv2rdfUIConstant.literalTripleField(div.text())
			break
		}
		cloneDiv.insertAfter(currentDiv)
		currentDiv.remove()
		return cloneDiv
	},

	/***************************************************************************
	 * Triple Node to select
	 **************************************************************************/
	setTripleNodeClass : function(node, class_) {
		switch (node) {
		case "sub":
			csv2rdfUIElements.subject.addClass(class_)
			break;
		case "pred":
			csv2rdfUIElements.predicate.addClass(class_)
			break;
		case "obj":
			csv2rdfUIElements.object.addClass(class_)
			break;
		}
	},

	resetTripleNodeClass : function(node, class_) {
		switch (node) {
		case "sub":
			csv2rdfUIElements.subject.removeClass(class_)
			break;
		case "pred":
			csv2rdfUIElements.predicate.removeClass(class_)
			break;
		case "obj":
			csv2rdfUIElements.object.removeClass(class_)
			break
		}
	},

	/***************************************************************************
	 * Modify
	 **************************************************************************/

	addModifyCSS : function(nodeDiv) {
		nodeDiv.addClass(csv2rdfCSS.modifyNode)
	},

	removeModifyCSS : function(nodeDiv) {
		nodeDiv.removeClass(csv2rdfCSS.modifyNode)
	},

	replaceEditContainerToSaveButton : function(tripleNum, imgObject) {
		csv2rdfUIConstant.saveImg(tripleNum).insertAfter(imgObject)
		imgObject.remove()
	},

	replaceSaveButtonToEditContainer : function(saveButton, reference) {
		csv2rdfUIConstant.editContainer(reference).insertAfter(saveButton)
		saveButton.remove()
	},

	/***************************************************************************
	 * Remove
	 **************************************************************************/
	removeTripleDivs : function(tripleNum) {
		csv2rdfData.tripleDivs[tripleNum].subject.remove()
		csv2rdfData.tripleDivs[tripleNum].predicate.remove()
		csv2rdfData.tripleDivs[tripleNum].object.remove()
	},

	removeDeleteIcon : function(deleteContainer) {
		deleteContainer.remove()
	}
}
