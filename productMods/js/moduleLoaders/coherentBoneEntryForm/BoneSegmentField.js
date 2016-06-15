
var completenessSet =[
    { uri : "complete", label : "Complete"},
    { uri : "incomplete", label : "Incomplete"}
]

var BoneSegmentField = function(systemicPartEditor, dataSet, dataToStore){
	
	/*
	 * Here we create a dataset already
	 */
	
	var boneSegment = new Object()
	boneSegment.uri = dataSet.uri
	boneSegment.type = "new"
	boneSegment.completeness = "complete"
	dataToStore.push(boneSegment)
	this.systemicPartEditor = systemicPartEditor
	this.dataSet = dataSet
	this.dataToStore = dataToStore
	
	/* 
	 * The default is the complete 
	 */
	
	this.contianer = html.div("boneSegmentContainer")
	this.completenessSelector = UI.selector(completenessSet);
	this.deleteButton = new Button("delete", (this.deleteFunction).bind(this))
}

BoneSegmentField.prototype = {
		
	assemble : function(){
		this.container
				.append(UI.listPoint())
				.append(html.div().text(this.dataSet.label))
				.append(this.completnessSelector())
	},

	deleteRoutine : function(){
		
		DataLibrary.removeObjectFromArrayByKey(this.dataToStore, "uri", this.dataSet.uri)
		this.container.remove()
	}
}



