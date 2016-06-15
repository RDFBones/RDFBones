
var completenessSet =[
    { uri : "complete", label : "Complete"},
    { uri : "incomplete", label : "Incomplete"}
]

var BoneSegmentField = function(classSelector, dataSet, dataToStore){
	
	/*
	 * Here we create a dataset already
	 */
	
	var boneSegment = new Object()
	boneSegment.uri = dataSet.uri
	boneSegment.type = "new"
	boneSegment.completeness = "complete"
	dataToStore.push(boneSegment)
	console.log(dataToStore)
	this.dataSet = dataSet
	this.dataToStore = dataToStore
	this.classSelector = classSelector
	
	/* 
	 * The default is the complete 
	 */
	
	this.container = html.div("boneSegmentContainer")
	this.completenessSelector = UI.classSelector(completenessSet);
	this.deleteButton = new Button("del", (this.deleteRoutine).bind(this))
	
	this.assemble()
}

BoneSegmentField.prototype = {
		
	assemble : function(){
		this.container
				.append(UI.listPoint())
				.append(html.div().text(this.dataSet.label))
				.append(this.completenessSelector)
				.append(this.deleteButton.container)
	},

	deleteRoutine : function(){
		
		DataLib.removeObjectFromArrayByKey(this.dataToStore, "uri", this.dataSet.uri)
		this.container.remove()
	}
}



