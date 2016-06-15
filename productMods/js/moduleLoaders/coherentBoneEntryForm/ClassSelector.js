
var ClassSelector = function(dataToStore, dataSet) {

	this.dataSet = dataSet
	this.dataToStore = dataToStore
	
	this.container = html.div("table")
	this.selectorContainer = html.div("selectorContainer")
	this.subContainer = html.div("subContainer")
	
	this.selectorField = UI.classSelector(dataSet)

	this.button = new Button("add", (this.returnFunction).bind(this))
	this.dataToStore = dataToStore

	this.systemicPartSelectors = []
	this.assemble()
	this.getCardinality()
}

ClassSelector.prototype = {

	assemble : function() {
		this.container
			.append(this.selectorContainer
				.append(this.selectorField)
				.append(this.button.container))
			.append(this.subContainer)
	},

	getCardinality : function() {

		$.each(this.dataSet, (function(index, value) {
			if (value.systemicParts[0].subClasses != undefined) {
				this.cardinality = value.systemicParts[0].subClasses.length
			}
		}).bind(this))
	},

	loadSelector : function() {

		$.each(this.dataSet, (function() {

		}).bind(this))
	},

	loadButton : function() {

	},

	addNewInstance : function() {

	},

	returnFunction : function() {
		/*
		 * Search for the element in the list which were set
		 */
		$.each(this.dataSet, (function(index, value) {
			if (value.uri == this.selectorField.val()) {
				var toStore = new Object()
				toStore.uri = value.uri
				toStore.systemicParts = []
				this.dataToStore.push(toStore)
				this.loadSubObject(value)
			}
		}).bind(this))
		this.button.hide()
	},

	/*
	 * DataSet is the bone division descriptor which has the field systemic parts
	 */
	loadSubObject : function(dataSet) {
		
		// It is already an object
		this.dataToStore.uri = this.selectorField.val()
		this.dataToStore.systemicParts = []

		/*
		 * If the systemic part has a subClass then multiple value has to be createds
		 */
		if (dataSet.systemicParts[0].subClasses != undefined) {

			// We create to classSelector
			$.each(dataSet.systemicParts, (function(index, value) {
				
				//The value in the subClass will be extended with actual systemic part
				var extendWith = new Object()
				extendWith.uri = value.uri
				extendWith.label = value.label
				value.subClasses.unshift(extendWith)
				
				// Value is the list of possible classes to select
				this.systemicPartSelectors.push(new NamedSystemicPartSelector(
						this, value.subClasses, this.dataToStore.systemicParts))
			}).bind(this))
		} else {
			// Here we can add only one
			this.systemicPartSelectors.push(new SystemicPartSelector(this, dataSet.systemicParts, this.dataToStore.systemicParts))
		}
		
		$.each(this.systemicPartSelectors, (function(i, sysSel){
			this.subContainer.append(sysSel.container)
		}).bind(this))
	},

	addedSystemicPart : function() {
		
	}
}