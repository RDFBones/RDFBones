var UI = {

	/***************************************************************************
	 * Img
	 **************************************************************************/
	getActionImg : function(type) {
		return html.div().append(html.getImg(ImgSrc[type]))
	},

	getInlineActionImg : function(type) {
		return html.div("inline").append(html.getImg(ImgSrc[type]))
	},

	getActionImgEvent : function(type, event) {
		return html.div().append(html.getImg(ImgSrc[type])).click(function() {
			event()
		})
	},

	getActionImg : function(type, class_) {
		return html.getNewDiv(class_).append(html.getImg(ImgSrc[type]))
	},

	getInlineImg : function(src) {
		return html.getNewDiv("inline").append(html.getImg(src))
	},

	/***************************************************************************
	 * Selector field
	 **************************************************************************/

	getSelectorField : function(dataset) {
		var sel = html.getSelectorField()
		$.each(dataset, function(index, data) {
			$("<option/>", {
				value : data["value"],
				text : data["text"],
			}).appendTo(selector)
		})
		return sel
	},

	getSelectorFieldMsg : function(dataset, msg) {
		dataset.push({
			text : msg,
			value : "default"
		})
		return this.getSelectorField(dataset)
	},

	/***************************************************************************
	 * FieldWith add button
	 **************************************************************************/

	getFieldWithAddButton : function(value, clickFunction) {
		return html.getNewDiv().append(html.getNewDiv("inline").text(value))
				.append(this.getInlineImg(ImgSrc.add).click(clickFunction))
	},

	/***************************************************************************
	 * Checkbox with text
	 **************************************************************************/

	getCheckboxText : function(text){
		
		return html.getNewDiv()
					.append(html.getCheckBox())
					.append(html.getNewDiv("inline").text(text))
	},
	
	getTextBoxContainer : function() {
		return html.getNewDiv("inline").append(html.getTextBox())
	},

	getTextBoxContainer : function(text) {
		return html.getNewDiv("inline").append(html.getTextBox().val(text))
	},

	getTextBoxContainerClass : function(class_, text) {
		return html.getNewDiv(class_).append(html.getTextBox().val(text))
	},

	getTitle : function(title) {
		return html.getNewDiv("moduleTitle").text(title)
	},

	getNewLine : function() {
		return html.getNewDiv("newLine")
	},

	showInline : function(div) {
		div.css("display", "inline-block")
	}
}