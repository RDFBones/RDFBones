

var EditButtonLink = function(parent, configData){
	ParentButtonLink.call(this, parent, configData, "edit")
}

EditButtonLink.prototype = Object.create(ParentButtonLink.prototype)

var DeleteButtonLink = function(parent, configData){
	
	this.configData = configData
	this.parent = parent
	this.assembleData()
	this.container = new Button("del", (this.routine).bind(this)).container
}
 

DeleteButtonLink.prototype = {
		
	assembleData : function(){
		data = new Object()
		$.each(this.configData.linkDataInputs, (function(i, value){
			data[value.key] = getData(this, value)
		}).bind(this))
		this.data = data
	},	
		
	routine : function(){
		
		$.ajax({
			url : baseUrl + "delete",
			context : this,
			dataType : "json",
			data : this.data
		}).done(function(result){
			location.reload();
		})
	}
}