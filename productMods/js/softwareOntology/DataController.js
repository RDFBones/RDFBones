
/*
 * This class will be passed to each classes and take care that the cardinalities
 * are taken into accoutn.
 * This class is the bridge between the "parent" and the child variable.
 * If to the child variable instances added or removed, then 
 * this class is the one that informs the parent class if the user is 
 * allowed to save the process.
 */

var DataController = function(dataField, newVar, property, parentDataController){
	
	//We have to pass the dataField to be able to controler the 
	//save and cancel button
	this.parentDataConroller = parentDataController
	this.dataField = dataField
	this.inputVar = dataField.varName
	this.inputClassUri = dataField.classUri
	this.newVar = newVar
 	this.property = property
	this.getCardinality()
	console.log(this.cardinality)
	this.numOfInstance = 0
}

DataController.prototype = {
		
	getCardinality : function(){
		
		this.cardinality = new Object
		if(properties[this.property].domain = "varName"){
			// We have to check the inverse cardinality
			if(properties[this.property].inverseMinCardinality != undefined){
				this.cardinality.type = "min",
				this.cardinality.value	= properties[this.property].inverseMinCardinality
			} else if(properties[this.property].inverseMaxCardinality != undefined){
				this.cardinality.type = "max",
				this.cardinality.value	= properties[this.property].inverseMaxCardinality
			} if(properties[this.property].inverseCardinality != undefined){
				this.cardinality.value	= properties[this.property].inverseCardinality
			}
		} else {
			if(properties[this.property].minCardinality != undefined){
				this.cardinality.type = "min",
				this.cardinality.value	= properties[this.property].minCardinality
			} else if(properties[this.property].inverseMaxCardinality != undefined){
				this.cardinality.type = "max",
				this.cardinality.value	= properties[this.property].maxCardinality
			} if(properties[this.property].inverseCardinality != undefined){
				this.cardinality.value	= properties[this.property].cardinality
			}
		}
	},
		
	add : function(){
		
		this.numOfInstance++
		console.log(this.cardinality)
		if(this.cardinality.type == "min"){
			if(this.numOfInstance >= this.cardinality.value){
				console.log("dsd")
				this.dataField.saveButton.enable()
			}
		}
	},
		
	remove : function(){
		this.numOfInstance--
		if(this.cardinality.type == "min"){
			if(this.numOfInstance < this.cardinality.value){
				this.dataField.saveButton.disable()
			}
		}
	}
}