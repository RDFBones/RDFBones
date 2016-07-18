var completenessSet = [ {
	uri : "http://w3id.org/rdfbones/core#complete",
	label : "complete"
}, {
	uri : "http://w3id.org/rdfbones/core#partlyPresent",
	label : "partly present"
}, ]

var BoneOrganField = function(systemicPartSelector, dataSet, dataToStore) {

	this.systemicPartSelector = systemicPartSelector
	this.setDataObject(dataSet, dataToStore)

	// UI
	this.container = html.div("boneSegmentFieldContainer")
	this.listPoint = UI.listPoint()
	this.classNameContainer = html.div("classNameContainer").text(dataSet.label)
	this.completenessSelector = this.getCompletenessSelector()
	this.deleteButton = new Button("del", (this.deleteRoutine).bind(this))
	this.assemble()
}

BoneOrganField.prototype = {

	assemble : function() {

		UI.assemble(this.container, [ this.listPoint, this.classNameContainer,
				this.completenessSelector.container,
				this.deleteButton.container ], [ 0, 0, 0, 0 ])
	},

	getCompletenessSelector : function() {
		return new DataSetterSelectorField(completenessSet,
				this.dataObject.comp2State, "uri")
	},

	setDataObject : function(dataSet, dataToStore) {

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

	deleteRoutine : function() {

		DataLib.removeObjectFromArrayByKey(this.dataToStore, "uri",
				this.dataSet.uri)
		this.systemicPartSelector.reset(this.dataObject.uri, this)
		this.container.remove()
	},

	setCompleteNess : function(value) {
		this.dataObject.completeness = value
	}
}

var ExistingBoneOrganField = function(systemicPartSelector, dataSet,
		dataToStore) {

	BoneOrganField.call(this, systemicPartSelector, dataSet, dataToStore)
	this.deleteButton.container.hide()
}

ExistingBoneOrganField.prototype = Object.create(BoneOrganField.prototype)

ExistingBoneOrganField.prototype.getCompletenessSelector = function() {
	var obj = [{
		label : completenessSet.getObjectByKey("uri", this.dataSet.comp2State).label,
		uri : "doesNotMatter",
	}]
	return new DataSetterSelectorField(obj, null, "uri")
}

ExistingBoneOrganField.prototype.setDataObject = function(dataSet, dataToStore) {
	this.dataSet = dataSet
	this.dataToStore = dataToStore
	this.dataObject = new Object()
	this.dataObject.uri = dataSet.uri
	this.dataObject.label = dataSet.label
	this.dataObject.type = "existing"
	dataToStore.push(this.dataObject)
}
