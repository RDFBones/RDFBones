

var OnPageEditor = function(configData){
	
	this.title = html.div("title").text(getData1(configData.title))
	
	this.subject = getData1(configData.subject)
	this.predicate = getData1(configData.predicate)

	this.setContainers()
	
	this.container = html.div()
	this.editContainer = html.div()
	this.valueContainer = html.div()
	
	this.editButton = new Button("edit", (this.edit).bind(this))
	
	this.saveButton = new Button("ok1", (this.cancel).bind(this))
	this.cancelButton = new Button("del", (this.saveChange).bind(this))
	
	this.wait = ImgUI.libSize("waitBar", "small")
	
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
		], [0, 0, 1, 1, -0.1, 1, 1, 1, -0,1])	
	},	
		
	loadData : function(){
		
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
			} else {
				this.value = result.object
			}
			this.setEditField()
			this.setValueField()
			this.assemble()
			
		}).bind(this))
	},
	
	saveChange : function(){
		
		if(this.value != this.getValue()){
			this.value = this.getValue()
			this.setValueDiv()
			this.wait()
			$.ajax({
				url : baseUrl + "ajaxData",
				context : this,
				dataType : "json",
				data : {
					dataOperation : "edit" + this.type,
					subject : this.subject,
					predicate : this.predicate,
					oldValue : this.object,
					newValue : this.newValue,
				}
			}).done((function(result){
				this.setValue()
				this.done()
			}).bind(this))
		} else {
			done()
		}
	},
	
	setValueField : function(){
		this.valueField.text(this.value)
	},
	
	setEditField : function(){
		this.editField.text(this.value)
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
}