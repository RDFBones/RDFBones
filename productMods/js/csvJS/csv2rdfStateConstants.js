var csv2rdfStateConstants =  {
	
	saveMode : {
		initial : "csv2rdfStateConstants_mode_initial" ,
		saveNewTriple : "csv2rdfStateConstants_mode_saveNewTriple",
		modifyTriple : "csv2rdfStateConstants_mode_modifyTriple",
	},
	
	saveType : {
		//This for the case when we want to disable the literal and instance additions
		disabled : "csv2rdfStateConstants_saveType_disabled",
		instanceAsSubject : "csv2rdfStateConstants_saveType_instanceAsSubject",
		instanceAsObject : "csv2rdfStateConstants_saveType_instanceAsObject",
		literalAsObject : "csv2rdfStateConstants_saveType_literalAsObject",
	},
	
	objectTypes : {
		literal : "csv2rdfStateConstants_objectTypes_literal",
		instance : "csv2rdfStateConstants_objectTypes_instance",
	},
	
	mapObjectTypeToSaveType : function(objectType){
		switch(objectType){
		case this.objectTypes.literal :
			csv2rdfData.saveType = this.saveType.literalAsObject
			break;
		case this.objectTypes.instance :
			csv2rdfData.saveType = this.saveType.instanceAsObject
			break;
		}
	},
	
	setInitialMode : function(){
		csv2rdfData.saveMode = this.saveMode.initial
	},
	
	isInitialMode : function(){
		return (csv2rdfData.saveMode == this.saveMode.initial)
	},
	
	setSaveNewTripleMode : function(){
		csv2rdfData.saveMode = this.saveMode.saveNewTriple
	},
		
	setModifyMode : function(){
		csv2rdfData.saveMode = this.saveMode.modifyTriple
	}
}
