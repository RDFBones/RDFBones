

var OnPageEditor = function(configData){
	
	this.configData = configData
	this.title = html.div("title").text(getData1(configData.title))
	
	this.subject = getData1(configData.subject)
	this.predicate = getData1(configData.predicate)

	this.noData = false
	
	this.setContainers()
	
	this.container = html.div()
	this.editContainer = html.div("margin10")
	this.valueContainer = html.div("margin10")
	
	this.editButton = new Button("edit", (this.edit).bind(this))
	
	this.saveButton = new Button("ok1", (this.saveRoutine).bind(this))
	this.cancelButton = new Button("del", (this.cancel).bind(this))
	
	this.wait = ImgUI.libImg("waitBar", "margin10")
	
	this.loadData()
}

OnPageEditor.prototype = {
		
	assemble : function(){
		UI.assemble(this.container, [
		     this.title,
		     this.valueContainer,
		     	this.valueField,
		     	this.editButton.container,
		     this.editContainer,
		     	this.editField,
		     	this.saveButton.container,
		     	this.cancelButton.container,
		     this.wait,
		], [0, 0, 1, 1, -0.1, 1, 1, 1, -0.1])	
	},	
		
	loadData : function(){
		
		
		if(this.configData.existingValue === undefined){
			$.ajax({
				url : baseUrl + "ajaxQuery",
				context : this,
				dataType : "json",
				data : {
					dataOperation : "get" + this.type,
					subject : this.subject,
					predicate : this.predicate,
				}
			}).done((function(result){
				if(result.noResult != undefined){
					this.value = "There is no data uploaded"
					this.noData = true
				} else {
					this.value = result[0].object
				}
				this.setEditField()
				this.setValueField()
				this.assemble()
				
			}).bind(this))			
		} else {
			this.value = getData1(this.configData.existingValue)
			this.setEditField()
			this.setValueField()
			this.assemble()
		}
	},
	
	saveRoutine : function(){
		
		if(this.validChange()){
			var type = "edit"
				if(this.noData){
					type = "add"
					this.noData = false
				}
			
				
				this.saveChange(type)
		} else {
			this.errorMsg()
		}	
	},
	
	saveChange : function(type){
		
		if(this.value != this.getValue()){
			this.setWait()
			$.ajax({
				url : baseUrl + "ajaxData",
				context : this,
				dataType : "json",
				data : {
					dataOperation : type + this.type,
					subject : this.subject,
					predicate : this.predicate,
					oldValue : this.value,
					newValue : this.getValue(),
				}
			}).done((function(result){
				this.value = this.getValue()
				this.setValueField()
				this.done()
			}).bind(this))
		} else {
			this.editContainer.hide()
			this.done()
		}
	},
	
	setValueField : function(){
		this.valueField.text(this.value)
	},
	
	setWait : function(){
		this.wait.show()
		this.editContainer.hide()
	},
	
	edit : function(){
		this.valueContainer.hide()
		this.editContainer.show()
	},
	
	cancel : function(){
		this.editContainer.hide()
		this.valueContainer.show()
	},
	
	done : function(){
		this.wait.hide()

		this.valueContainer.show()
	},
	
	validChange : function(){
		return true
	}
}