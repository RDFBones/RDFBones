

var DataEntry = function(className, dataController){
	
	this.container = html.div("table")
	this.innerContainer = html.div("dataEntry").appendTo(this.container)
	this.label = ontology.classes[className].label + "_" + Math.round(Math.random()*100000)
	
	this.innerContainer.append(html.div("inline").text(this.label))
	this.innerContainer.append(ImgUI.libImg("edit", "dataEntryImg"))
	this.innerContainer.append(
			ImgUI.libImg("del", "dataEntryImg").
			click((function(){
				this.remove()
			}).bind(this)))

	
	/*
	 * It add a variable to the controller immediately.
	 */
	this.dataController = dataController
	
	var data = new Object()
	data.label = this.label
	
	this.dataController.add(data)

	
}


DataEntry.prototype = {
	
		
	remove : function(){
		
		this.container.remove()
		this.dataController.remove()
	}	
}

