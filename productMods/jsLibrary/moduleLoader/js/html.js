/*******************************************************************************
 * This layer cares only about the HTML element creating and eventual input
 * class setting
 ******************************************************************************/

var html = {

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

	selectorFieldWithout : function(dataset, value, text) {
		var selector = this.getSelectorField()
		this.selectorField(dataset, value, text, selector)
		return selector
	},

	createSelectorFieldWith : function(dataset, value, text, selectorMsg) {

		var sel = this.getSelectorField()
		$("<option/>", {
			text : selectorMsg
		}).appendTo(sel)
		this.selectorField(dataset, value, text).appendTo(sel)
		return sel
	},

	selectorField : function(dataset, value, text, selector) {
		$.each(dataset, function(index, data) {
			$("<option/>", {
				value : data[value],
				text : data[text],
			}).appendTo(selector)
		})
	},

	getPreviewImage : function(src, class_, index) {
		return $("<a/>").attr("href", src).attr("data-lightbox", index).append(
				this.getImgClass(src, class_))
	},

	getImg : function(src) {
		return $("<img/>").attr("src", src)
	},
	
	getImgClass : function(src, class_) {
		return $("<img/>").attr("src", src).addClass(class_)
	},
	
	getCheckBox : function(){
		return $("<input>").attr("type", "checkbox")
	},
	
	getTextBox : function(){
		return $("<input>").attr("type", "text")
	}
	
}