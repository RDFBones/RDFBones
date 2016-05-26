
/*
 * This class will be passed to each classes and take care that the cardinalities
 * are taken into accoutn.
 * This class is the bridge between the "parent" and the child variable.
 * If to the child variable instances added or removed, then 
 * this class is the one that informs the parent class if the user is 
 * allowed to save the process.
 */

var DataController = function(dataField, outputVar, dataField){
	
	//We have to pass the dataField to be able to controler the 
	//save and cancel button
	this.dataField = dataField
	this.inputVar = dataField.varName
	
	this.outputVar = outputVar
	
	this.getCardinality()
}

DataController.prototype = {
		
	getCardinality : function(){
		
		this.cardinality = new Object
		if(properties[this.variable.property].domain = "varName"){
			// We have to check theinverse cardinality
			if(properties[this.variable.property].inverseMinCardinality != undefined){
				this.cardinality.type = "min",
				this.cardinality.value	= properties[this.variable.property].inverseMinCardinality
			} else if(properties[this.variable.property].inverseMaxCardinality != undefined){
				this.cardinality.type = "max",
				this.cardinality.value	= properties[this.variable.property].inverseMaxCardinality
			} if(properties[this.variable.property].inverseCardinality != undefined){
				this.cardinality.value	= properties[this.variable.property].inverseCardinality
			}
		} else {
			if(properties[this.variable.property].minCardinality != undefined){
				this.cardinality.type = "min",
				this.cardinality.value	= properties[this.variable.property].minCardinality
			} else if(properties[this.variable.property].inverseMaxCardinality != undefined){
				this.cardinality.type = "max",
				this.cardinality.value	= properties[this.variable.property].maxCardinality
			} if(properties[this.variable.property].inverseCardinality != undefined){
				this.cardniality.value	= properties[this.variable.property].cardinality
			}
		}
	},
		
	add : function(){
		
	},
		
	remove : function(){
		
		
	}
}