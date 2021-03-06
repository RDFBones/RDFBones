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

AddedExistingBoneOrganField = function(systemicPartSelector, dataSet, dataToStore, existingEntry){
	
	this.existingEntry = existingEntry
	this.dataSet = dataSet
	BoneOrganField.call(this, systemicPartSelector, dataSet, dataToStore)
}


AddedExistingBoneOrganField.prototype = Object.create(BoneOrganField.prototype)

$.extend(AddedExistingBoneOrganField.prototype, {

	deleteRoutine : function(){

		DataLib.removeObjectFromArrayByKey(this.dataToStore, "uri",
				this.dataSet.uri)
		//The set the data cache of the systemicpartselector object
		this.systemicPartSelector.reset(this.dataObject.mst, this, this.existingEntry)
		this.container.remove()	
	},

	setDataObject : function(dataSet, dataToStore) {
	
		this.dataSet = dataSet
		this.dataToStore = dataToStore
		this.dataObject = new Object()
		this.dataObject.uri = dataSet.uri
		this.dataObject.label = dataSet.label
		this.dataObject.mst = dataSet.mst
		this.dataObject.type = "existing"
		dataToStore.push(this.dataObject)
	},

	getCompletenessSelector : function(){
		var obj = [{
			label : completenessSet.getObjectByKey("uri", this.dataSet.comp2State).label,
			uri : "doesNotMatter",
		}]
		return new DataSetterSelectorField(obj, null, "uri")
	}
})
	
var ExistingBoneOrganField = function(systemicPartSelector, dataSet,
		dataToStore) {

	this.dataSet = dataSet
	AddedExistingBoneOrganField.call(this, systemicPartSelector, dataSet, dataToStore)
	this.deleteButton.container.hide()
}

ExistingBoneOrganField.prototype = Object.create(AddedExistingBoneOrganField.prototype)

ExistingBoneOrganField.prototype.setDataObject = function(dataSet, dataToStore, existingEntry) {
	//We do not set anything because the data is already there
}


AddedExistingCoherentSkeletalDivison = function(deleleteRoutione, dataSet){
	
	
	return html.div("inlineContainer")
		.append(UI.listPoint())
		.append(html.div("classNameContainer").text(dataSet.label))
		.append(new Button("del", deleleteRoutione).container)
}

