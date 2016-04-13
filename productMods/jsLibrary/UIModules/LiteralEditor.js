var LiteralEditor = function(boneEditor, title, id, predicate, required) {
	this.boneEditor = boneEditor
	this.required = required
	this.title = title
	this.predicate = predicate
	this.id = id
	console.log(this.id)
	this.container = this.getContainerDiv()
	this.container.append(this.getTitleDiv())
	this.container.append(this.getValueDiv())
	this.container.append(this.getTextBox(id))
	this.container.append(this.getButtons())
	this.container.append(html.getNewDiv("newLine"))
}

LiteralEditor.prototype.show = function(data, value){
	this.data = data
	this.container.show()
	if(value != null){
		this.valueDiv.text(value)
		this.editButton.show()
		this.addButton.hide()
	} else {
		this.valueDiv.text("No data")
		this.editButton.show()
		this.addButton.hide()
	}
}

LiteralEditor.prototype.getContainerDiv = function(){
	return html.getDivId(this.id)
}

LiteralEditor.prototype.getTitleDiv = function() {
	this.titleDiv = html.getNewDiv("moduleTitle").text(this.title)
	return this.titleDiv
}

LiteralEditor.prototype.getValueDiv = function() {
	this.valueDiv = html.getNewDiv("valueDiv")
	return this.valueDiv
}

LiteralEditor.prototype.getTextBox = function(type) {
	if(type == "label"){
		this.textBox = html.getTextBox().addClass("literalTextBox").hide()
	} else {
		this.textBox = html.getTextArea().attr("rows", 4).addClass("literalTextBox").hide()
	}
	return this.textBox
}

LiteralEditor.prototype.getButtons = function() {
	var object = this
	this.buttonContainer = html.getNewDiv()
	this.addButton = html.getNewDiv("button1").text("Add").click(function() {
		$(this).hide()
		object.saveButton.show()
		object.clearButton.show()
		object.textBox.show()
	}).appendTo(this.buttonContainer)

	this.editButton = html.getNewDiv("button1").text("Edit").hide().click(
			function() {
				$(this).hide()
				object.saveButton.show()
				object.clearButton.show()
				object.textBox.hide()
				object.valueDiv.hide()
				object.textBox.val(object.valueDiv.text()).css("display", "block")
			}).appendTo(this.buttonContainer)

	this.saveButton = html.getNewDiv("button1").text("Save").hide().click(
			function() {
				if(object.required && object.textBox.val() == ""){
					alert("This field cannot be empty")
				} else {
					var old  = object.valueDiv.text()
					var new_ = object.textBox.val()
					object.clearButton.hide()
					object.textBox.hide()
					object.valueDiv.show().text(object.textBox.val())
					$(this).hide()
					if (object.textBox.val() == "") {
						object.addButton.show()
					} else {
						object.editButton.show()
					}
					//Save In the database
					DataController.saveLiteral(object, old, new_)
				}
				
			}).appendTo(this.buttonContainer)
	this.clearButton = html.getNewDiv("button1").text("Clear").hide().click(
			function() {
				object.textBox.val("")
			}).appendTo(this.buttonContainer)

	if (this.value == null) {
		this.addButton.show()
		this.editButton.hide()
	}
	return this.buttonContainer
}

LiteralEditor.prototype.saved = function(){
	console.log("josag")
}