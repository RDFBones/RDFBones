
var SystemicPartSelector = function(classSelector, dataSet, dataToStore) {

	this.dataSet = dataSet
	this.classSelector = classSelector
	this.dataToStore = dataToStore
	this.title = dataSet[0].label
	this.container = html.div("table")
	this.selectorContainer = html.div("selectorContainer")
	this.subContainer = html.div("subContainer")
	this.selectorField = UI.classSelector(dataSet)
	this.button = new Button("add", (this.returnFunction).bind(this))
	this.allComplete = new TextButton("Add all as complete", null)
	this.assemble()
}

SystemicPartSelector.prototype = {

	assemble : function() {
		this.container.append(
				this.selectorContainer.append(this.selectorField).append(
						this.button.container).append(this.allComplete))
				.append(this.subContainer)
	},

	returnFunction : function() {

		// Search for the selected class
		$.each(this.dataSet, (function(index, value) {
			if (value.uri == this.selectorField.val()) {
				this.subContainer.append(new BoneSegmentField(
						this.classSelector, value, this.dataToStore).container)
			}
		}).bind(this))
	}
}