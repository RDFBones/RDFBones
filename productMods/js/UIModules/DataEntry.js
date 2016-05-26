

var DataEntry = function(className){
	
	this.container = html.div("table")
	this.innerContainer = html.div("dataEntry").appendTo(this.container)
	this.label = ontology.classes[className].label + "_" + Math.round(Math.random()*100000)
	
	this.innerContainer.append(html.div("inline").text(this.label))
	this.innerContainer.append(ImgUI.libImg("edit", "dataEntryImg"))
	this.innerContainer.append(ImgUI.libImg("del", "dataEntryImg"))
}