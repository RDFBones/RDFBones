

var LinkField = function(configData){
	
	this.container = html.div()
	this.title = html.div("title").text(getData1(configData.title))
	this.link = html.link(DataLib.assembleUrl(configData))
	this.label = html.div("margin10").text(getData1(configData.label))
	this.assemble()
}


LinkField.prototype = {
	
	assemble : function(){
		
		UI.assemble(this.container, [
		    this.title,
		    this.link,
		    	this.label,
		    ], [0, 0, 1])
	}
}