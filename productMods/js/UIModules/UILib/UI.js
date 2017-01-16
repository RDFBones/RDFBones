var UI = {
		
	assemble : function(mainContainer, containers, order){
		
		var containerBuffer = []
		containerBuffer[0] = mainContainer
		$.each(containers, function(i, container){
			if( order[i] < 0){
				container.hide()
				order[i] = Math.floor(-order[i])
			}
			containerBuffer[order[i]].append(container)
			containerBuffer[order[i] + 1] = container
		})
	},
	
	append : function(main, array){
		
		arr = []
		$.each(array, function(index, value){
			arr.push(value.container)
		})
		if(main.container === undefined)
			main.container = html.div()
		main.container.append(arr)
	},
	
	appendToDiv : function(div, array){
		
		arr = []
		$.each(array, function(index, value){
			arr.push(value.container)
		})
		div.append(arr)
	},
	
	appendDivs : function(main, array){
		
		arr = []
		$.each(array, function(index, value){
			arr.push(value)
		})
		if(main.container === undefined)
			main.container = html.div()
		main.container.append(arr)
	},
	
	appendGen : function(main, array){
		
		arr = []
		$,each(array, function(index, value){
			arr.push(value.container)
		})
		main.container.append(arr)
	},
	
	hideArray : function(array){
		
		$.each(array, function(index, value){
			value.hide()
		})
	},
	
	/***************************************************************************
	 * Horizontal general img
	 **************************************************************************/

	getWaitGif : function() {
		return ImgUI.libImg("loading", "largeImg")
	},

	getHorizontalImg : function(src) {
		return html.div("horizontalMiddle").append(html.img(src))
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
		return html.div("verticalMiddleContainer").append(
				html.div("inline margin20").text(msg)).append(
				ImgUI.libImgCont(type, "inline"))
	},

	verticalMiddleCont : function() {
		return html.div("verticalMiddle")
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
		return html.div("addFieldContainer").append(
				html.div("addFieldText").text(value)).append(
				ImgUI.libImg("add", "addFieldImg").click(clickFunction))
	},

	getTextButton : function(text, id) {
		return html.div("enabledButton").text(text).attr("id", id)
	},

	/***************************************************************************
	 * Checkbox with text
	 **************************************************************************/

	checkboxText : function(text) {
		return html.div().append(html.checkBox()).append(
				html.div("inline").text(text))
	},

	textBoxContainer : function() {
		return html.div("inline").append(html.textBox())
	},

	textBoxContainer : function(text) {
		return html.div("inline").append(html.textBox().val(text))
	},

	textBoxContainerClass : function(_class, text) {
		return html.div(_class).append(html.textBox().val(text))
	},

	getTitle : function(title) {
		return html.div("moduleTitle").text(title)
	},

	getNewLine : function() {
		return html.div("newLine")
	},

	showInline : function(div) {
		div.css("display", "inline-block")
	},

	/*
	 * ClassSelector
	 */
	classSelector : function(dataSet) {
		this.selectorField = html.getSelectorField().addClass("inline margin5H")

		$.each(dataSet, (function(index, data) {
			$("<option/>", {
				value : data.uri,
				text : data.label,
			}).appendTo(this.selectorField)
		}).bind(this))
		return this.selectorField
	},

	classSelectorMap : function(dataSet) {
		this.selectorField = html.getSelectorField().addClass("inline margin5H")

		$.each(dataSet, (function(key, value) {
			$("<option/>", {
				value : key,
				text : value.label,
			}).appendTo(this.selectorField)
		}).bind(this))
		return this.selectorField
	},
	
	dataSetSelector : function(dataSet, setData){
		
		this.setData = setData
		var ths = this
		return UI.classSelector(dataSet)
			.change(function(){
				console.log(setData)
				ths.setData = $(this).val()
				console.log(setData)
			})
	},
	
	listPoint : function() {
		return html.div("listPoint")
	},
	
	removeFieldFromSelector : function(selector, value){
		selector.find('option[value=' + value +"]").remove()
	},
	
	waitBar : function(){
		
	},
	
	inlineCont : function(){
		return html.div("inlineContainer")
	},
	
	inlineCont : function(_class){
		return html.div("inlineContainer " + _class)
	},

}