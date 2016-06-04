var UI = {

	/***************************************************************************
	 * Horizontal general img
	 **************************************************************************/

	getWaitGif : function(){
		return ImgUI.libImg("loading","largeImg")
	},
	
	getHorizontalDiv : function() {
		
	},

	getHorizontalImg : function(src) {
		return html.div("horizontalMiddle").append(html.getImg(src))
	},

	/***************************************************************************
	 * Fullscreen container
	 **************************************************************************/

	getFullScreenContainer : function() {
		return html.div("fullScreenContainer")
	},

	getFullScreenInner : function() {
		return html.div("fullScreenInner").css("display", "table")
	},
	
	getFullScreenInner : function(width) {
		return html.div("fullScreenInner").css("width", width)
	},

	getFullScreenInnerMiddle : function(width) {
		return html.div("fullScreenInner").css("width", width).css(
				"text-align", "middle")
	},

	textlibImg : function(msg, type) {
		return html.div("verticalMiddleContainer")
				.append(html.div("inline margin20").text(msg))
				.append(ImgUI.libImgCont(type, "inline"))
	},

	verticalAlignedDiv : function(text, _class) {
		return html.div(_class)
	},

	/***************************************************************************
	 * Self adjusting gif
	 **************************************************************************/

	getAutoGif : function() {
		return html.div("gifContainer").append(
				UI.getGeneralImgClass("loading", "loadingGif"))
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
		return html.getNewDiv("addFieldContainer").append(html.getNewDiv("addFieldText").text(value))
				.append(ImgUI.libImg("add", "addFieldImg").click(clickFunction))
	},

	getTextButton : function(text){
		return html.div("generalButton enabledButton").text(text)
	},
	
	/***************************************************************************
	 * Checkbox with text
	 **************************************************************************/

	getCheckboxText : function(text) {
		return html.getNewDiv().append(html.getCheckBox()).append(
				html.getNewDiv("inline").text(text))
	},

	getTextBoxContainer : function() {
		return html.getNewDiv("inline").append(html.getTextBox())
	},

	getTextBoxContainer : function(text) {
		return html.getNewDiv("inline").append(html.getTextBox().val(text))
	},

	getTextBoxContainerClass : function(_class, text) {
		return html.getNewDiv(_class).append(html.getTextBox().val(text))
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