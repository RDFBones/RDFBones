var dataEdit = {
		
	getSaveButton : function(type){
		return $("#" + type + "Save")
	},
	
	getClearButton : function(type){
		return $("#" + type + "Clear")
	},
	
	getEditButton : function(type){
		return $("#" + type + "Edit")
	},

	getAddButton : function(type){
		return $("#" + type + "Add")
	},
	
	getTextField : function(type){
		return $("#" + type + "TextField")
	},

	getValueField : function(type){
		return $("#" + type + "ValueDiv")
	},
	
	setDivValue : function(type){
		this.getValueDiv(type).text(
				this.getTextField.val())
	},
	
	setTexBotValue : function(type){
		this.getValueDiv(type).text(
				this.getTextField.val())
	},
	
	enableClear : function(type){
		this.getClearButton(type).addClass("disabledButton")
	},
	
	disableClear : function(type){
		this.getClearButton(type).addClass("enabledButton")
	},
}
