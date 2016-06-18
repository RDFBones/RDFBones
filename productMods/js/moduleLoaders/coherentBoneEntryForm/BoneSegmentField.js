
var completenessSet =[
    { uri : "complete", label : "Complete"},
    { uri : "incomplete", label : "Incomplete"}
]

var BoneSegmentField = function(systemicPartSelector, dataSet, dataToStore){
	
	this.systemicPartSelector = systemicPartSelector
	this.setDataObject(dataSet, dataToStore)

	//UI
	this.container = html.div("boneSegmentFieldContainer")
	this.listPoint = UI.listPoint()
	this.classNameContainer = html.div("classNameContainer").text(this.dataSet.label)
	this.completenessSelector = new DataSetterSelectorField(completenessSet, this.dataObject, "completeness");
	this.deleteButton = new Button("del", (this.deleteRoutine).bind(this))
	this.assemble()
}

BoneSegmentField.prototype = {
		
	assemble : function(){
		UI.assemble(this.container, [
		        this.listPoint,
				this.classNameContainer,
				this.completenessSelector.container,
				this.deleteButton.container],
				[0, 0, 0, 0 ])
		
	},

	setDataObject : function(dataSet, dataToStore){
		this.dataSet = dataSet
		this.dataToStore = dataToStore
		this.dataObject = new Object()
		this.dataObject.uri = dataSet.uri
		this.dataObject.label = dataSet.label
		this.dataObject.type = "new"
		this.dataObject.completeness = completenessSet[0].uri
		dataToStore.push(this.dataObject)
	},
	
	deleteRoutine : function(){
		
		DataLib.removeObjectFromArrayByKey(this.dataToStore, "uri", this.dataSet.uri)
		this.systemicPartSelector.reset()
	},
	
	setCompleteNess : function(value){
		this.dataObject.completeness = value
	}
}



