var csv2rdfClickEvents = {

	selectInstanceToTriple : function(div){

		switch(csv2rdfData.saveType){
			case csv2rdfStateConstants.saveType.instanceAsSubject :
				csv2rdfController.saveSubject(div)
				break;
			case csv2rdfStateConstants.saveType.instanceAsObject :
				csv2rdfController.saveObject(div,csv2rdfStateConstants.objectTypes.instance)
				break;
		}
	},
	
	selectLiteralToTriple : function(div){
		
		if(csv2rdfData.saveType == csv2rdfStateConstants.saveType.literalAsObject){
			csv2rdfController.saveObject(div, csv2rdfStateConstants.objectTypes.literal)		
		}
	},

	addNewTriple : function(){
		if(csv2rdfData.saveMode == csv2rdfStateConstants.saveMode.initial){
			csv2rdfController.addTriple()
		}
	},
	
	/***************************************************************************
	 * EditGUI
	 **************************************************************************/
	modifyTriple : function(editContainer, num){
		if(csv2rdfStateConstants.isInitialMode()){
			return csv2rdfController.enterModifyTripleState(editContainer, num)
		}
	},
	
	exitModifyMode : function(saveButton, num){
		return csv2rdfController.exitSaveModeState(saveButton, num)
	},
	
	deleteTriple : function(deleteContainer, num){
		if(csv2rdfStateConstants.isInitialMode()){
			csv2rdfController.deleteTriple(deleteContainer, num)
		}
	},
	
	saveModification : function(saveButton){
		if(csv2rdfData.pendingModification == 0){
			csv2rdfData.modifyState = false
			csv2rdfUI.replaceSaveButtonToImg(csv2rdfData.reference, saveButton)
			csv2rdfData.resetReference()
		}
	},
	
	/***************************************************************************
	 * Modify EVENTS
	 **************************************************************************/
	modifySubject : function(){
		//We just define for the click event
		if(csv2rdfData.saveMode == csv2rdfStateConstants.saveMode.modifyTriple){
			csv2rdfData.saveType = csv2rdfStateConstants.saveType.instanceAsSubject
			csv2rdfController.selectSubject()
		}
	},

	modifyPredicate : function(){
		if(csv2rdfData.saveMode == csv2rdfStateConstants.saveMode.modifyTriple){
			ontologyViewerElements.startPropertyViewer()
		}
	},

	modifyObject : function(event){
		csv2rdfStateConstants.mapObjectTypeToSaveType(event.data.objectType)
		csv2rdfController.selectObject(event.data.objectType)
	},
}