
var completenessSet =[
    { uri : "http://w3id.org/rdfbones/core#complete", label : "complete"},
    { uri : "http://w3id.org/rdfbones/core#partlyPresent", label : "partly present"},
]

var BoneSegmentField = function(systemicPartSelector, dataSet, dataToStore){
	
	this.systemicPartSelector = systemicPartSelector
	this.setDataObject(dataSet, dataToStore)

	//UI
	this.container = html.div("boneSegmentFieldContainer")
	this.listPoint = UI.listPoint()
	this.classNameContainer = html.div("classNameContainer").text(this.dataSet.label)
	this.completenessSelector = new DataSetterSelectorField(completenessSet, this.dataObject.comp2State, "uri");
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
		this.dataObject.comp2State = new Object() 
		this.dataObject.comp2State.uri = completenessSet[0].uri
		this.dataObject.comp2State.type = "existing"
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

var SymmetricBoneSegmentField = function(systemicPartSelector, dataSet, dataToStore){
	
	BoneSegmentField.call(this, systemicPartSelector, dataSet, dataToStore)
}

SymmetricBoneSegmentField.prototype = Object.create(BoneSegmentField.prototype)


SymmetricBoneSegmentField.prototype.deleteRoutine = function(){
	
	DataLib.removeObjectFromArrayByKey(this.dataToStore, "uri", this.dataSet.uri)
	this.systemicPartSelector.reset()
	this.container.remove()
	this.systemicPartSelector.resetUri(this.dataObject.uri)
}