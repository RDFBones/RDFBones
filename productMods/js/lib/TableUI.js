

var TableUI = {

	getWaitGif : function(){
		return UI.getGeneralImgSize("loading", "middle").addClass("dataWaitGif")
	},

	getHelperSpan : function(type, size){
		
		return html.span("verticalAlignHelper")
	}
}