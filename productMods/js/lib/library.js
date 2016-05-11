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

var l = function(param){
	console.log(param)
}
var k = function(){
	console.log("abcdefghijklmnopqrstuxzy")
}

var folder = "img/"
var ImgSrc = {
		add : this.folder + "add.png",
		addInstance : this.folder + "addInstance.png",
		arrows : this.folder + "arrows.png",
		backToParent : this.folder + "backToParent.png",
		close : this.folder + "close.png",
		del : this.folder + "delete.png",
		edit : this.folder + "edit.png",
		loadingGif : this.folder + "loading.gif",
		minus : this.folder + "minus.png",
		modify : this.folder + "modify.png",
		ok : this.folder + "ok.png",
		plus : this.folder + "plus.png",
		jump : this.folder + "jump.png",
	}
