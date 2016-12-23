/*******************************************************************************
 * This layer cares only about the HTML element creating and eventual input
 * class setting
 ******************************************************************************/

var html = {

	div : function() {
		return $("<div/>")
	},	

	div : function(classes) {
		return $("<div/>").addClass(classes)
	},
	
	div : function(classes, text) {
		return $("<div/>").addClass(classes).text(text)
	},
	
	divId : function(id){
		return html.div().attr("id", id)
	},

	divT : function(text) {
		return $("<div/>").text(text)
	},

	getFullScreen : function(id){
		return $("<div/>").addClass("fullScreen").attr("id", id)
	}, 
	
	getFullScreenContainer : function(){
		return $("<div/>").addClass("fullScreenContainer")
	},

	getSelectorField : function(id, name) {
		return selector = $("<select/>", {
			id : id,
			name : name,
		})
	},
	
	setSelectorOptions1 : function(dataset, valueKey, textKey, selector) {
		$.each(dataset, function(index, data) {
			$("<option/>", {
				value : data[valueKey],
				text : data[textKey],
			}).appendTo(selector)
		})
	},
	
	getPreviewImage : function(src, class_, index) {
		return $("<a/>").attr("href", src).attr("data-lightbox", index).append(
				this.img(src, class_))
	},
	
	img : function(src) {
		return $("<img/>").attr("src", src)
	},
	
	img : function(src, class_) {
		return $("<img/>").attr("src", src).addClass(class_)
	},
	
	imgHeight : function(src, height) {
		return $("<img/>").attr("src", src).attr("height", height)
	},
	
	checkBox : function(){
		return $("<input>").attr("type", "checkbox")
	},
	
	textBox : function(){
		return $("<input>").attr("type", "text")
	},
	
	textBox : function(_class){
		return $("<input>").attr("type", "text").css("height", "18px").
			css("width", "230px").addClass(_class)
	},
	
	textAreaC : function(_class){
		return $("<textarea>").attr("rows", 4).attr("cols", 50).addClass(_class)
	},
	
	textArea : function(rows, cols){
		return $("<textarea>").attr("rows", rows).attr("cols", cols)
	},
	
	getInput : function(type){
		return $("<input>").attr("type", type)
	},
	
	span : function(_class){
		return $("<span/>").addClass(_class)
	},
	
	link : function(href, _class){
		return $("<a/>").attr("href", href).addClass(_class)
	},
	
	hiddenInput : function(name){
		return $("<input/>").attr("type", "hidden").attr("name", name)
	},
	
	submit : function(label){
		return $("<input/>").attr("type", "submit").attr("value", label)
	},
	
	form : function(action, id, _class){
		return $("<form/>").attr("action", action).attr("id", id).addClass(_class)
	},
	
	fileUpload : function(){
		return $("<input/>").attr("type", "file")
	},
	
	fileUpload : function(id){
		return $("<input/>").attr("type", "file").attr("id", id)
	},
	
}