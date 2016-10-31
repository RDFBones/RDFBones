
var elementMap = {
	adder	 : Adder ,
	selector : Selector,
	stringInput : StringInput,
}

var MainForm = function(){
	
	/*
	 * This will be sent to the server
	 */
	this.parentContainer = null
	this.dataObject = new Object()
	this.load()
}

MainForm.prototype = {
		
	load : function(){

		elements = []
		$.each(formDescription, (function(i, value){
			elements.push(new elementMap[value.type](value, this).container)
		}).bind(this))

		//SubmitButton
		this.submitButton = new TextButton("Submit", (this.submit).bind(this))//.disable()
		elements.push(this.submitButton.container)
		
		$("#form").append(elements)	
	},
	
	submit : function(){
		console.log(this.dataObject)
	}
}


var SubForm = function(parentForm, dataObject){
	
	this.parentContainer = parentForm.formContainer
	this.parentForm = parentForm
	
	this.container = parentForm.subContainer
	this.descriptor = parentForm.descriptor.subform
	
	//The subform does not modify the dataObject. It just saves it
	this.dataObject = dataObject;
	
	DataController.loadSubformData(this)
}

SubForm.prototype = {

	//This is called by the dataController if the data arrived
	init : function(){
	
		elements = []
		
		if(this.parentForm.descriptor.style != "offerAll"){
			elements.push(html.div("title").text(this.dataObject.label))
		}
		
		this.subFormContainer = html.div()
		if(this.descriptor.style !== undefined){
			this.subFormContainer.addClass("flexInlineContainer")
		}
		
		$.each(this.descriptor.elements, (function(i, descriptor){
			this.subFormContainer.append(new elementMap[descriptor.type](descriptor, this).container)
		}).bind(this))
		
		elements.push(this.subFormContainer)
		this.container.append(elements)
	}, 	

	remove : function(){
		
		/*
		 * Later this handles the data 
		 * Moreover it has to ask its parent form if it is abmissible to 
		 * delete the entry. 
		 */
	}	
}

