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
	
	getNewDiv : function() {
		return $("<div/>")
	},

	getDivId : function(id){
		return html.getNewDiv().attr("id", id)
	},
	
	getNewDiv : function(classes) {
		return $("<div/>").addClass(classes)
	},

	getNewDivT : function(text) {
		return $("<div/>").text(text)
	},

	getNewDiv : function(classes, text) {
		return $("<div/>").addClass(classes).text(text)
	},

	getFullScreen : function(id){
		return $("<div/>").addClass("fullScreen").attr("id", id)
	}, 
	
	getFullScreenContainer : function(){
		return $("<div/>").addClass("fullScreenContainer")
	},

	getSelectorField : function() {
		return selector = $("<select/>", {
			class : "",
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
				this.getImg(src, class_))
	},
	
	getImg : function(src) {
		return $("<img/>").attr("src", src)
	},
	
	getImg : function(src, class_) {
		return $("<img/>").attr("src", src).addClass(class_)
	},
	
	getCheckBox : function(){
		return $("<input>").attr("type", "checkbox")
	},
	
	getTextBox : function(){
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
	
	span : function(){
		return $("<span/>")
	},
	
	span : function(_class){
		return $("<span/>").addClass(_class)
	},
	
	link : function(href){
		return $("<a/>").attr("href", href)
	},
	
	link : function(href, _class){
		return $("<a/>").attr("href", href).addClass(_class)
	},
	
	form : function(){
		return $("<form/>")
	},
	
	form : function(_class){
		return $("<form/>").addClass(_class)
	},
	
	fileUpload : function(){
		return $("<input/>").attr("type", "file")
	},
	
	fileUpload : function(id){
		return $("<input/>").attr("type", "file").attr("id", id)
	},
	
}