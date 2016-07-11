var SkeletalRegion = function() {

	// The dataset is fix
	this.descriptor = pageData.skeletalDivision
	this.initData()
	this.init()
}

SkeletalRegion.prototype = {

	initData : function() {

		this.dataToStore = new Object()
		this.dataToStore.coherentBoneDivision = []
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
					this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.classUri
			this.dataToStore.label = this.descriptor.label
		}
	},

	init : function() {

		this.container = html.div()
		this.titleContainer = html.div()
		this.subContainer = html.div()

		this.buttonContainer = html.div()
		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
				.hide()
		this.classLabel = html.div().text(this.descriptor.label)

		if (this.descriptor.existing != undefined) {
			this.separator = html.div("separator")
			this.assembleExisting()
			this.addExisting()
		} else {
			this.addAllButton.hide()
			this.newButton = new TextButton("New", (this.addNew).bind(this));
			this.addExisting = new TextButton("existingButton",
					(this.selectExisting).bind(this))
			this.exitButton = new Button("exit", (this.exit).bind(this))
			this.assembleNew()
			if (this.descriptor.existingToSelect === undefined) {
				this.addNew()
			}
		}
	},

	assembleExisting : function() {

		UI.assemble(this.container, [ this.titleContainer, this.classLabel,
				this.sepearator, this.existingLabel, this.buttonContainer,
				this.addAllButton.container, this.subContainer ], [ 0, 1, 1, 1,
				1, 2, 0 ])
	},

	assembleNew : function() {

		UI.assemble(this.container, [ this.titleContainer, this.classLabel,
				this.buttonContainer, this.newButton.container,
				this.addExisting.container, this.addAllButton.container,
				this.exitButton.container, this.subContainer ], [ 0, 1, 1, 2,
				2, 2, 2, 0 ])
	},

	addExisting : function() {

		/*
		var arr = []
		$.each(this.descriptor.systemicParts,(function(i, systemicPart) {
			
				arr.push(new CoherentSkeletalRegion(this,
							this.dataToStore.coherentBoneDivision,
									systemicPart).container)
				}).bind(this))
		this.subContainer.append(arr)
		*/
	},

	addNew : function(){

		var arr = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, (function(i, systemicPart) {
			arr.push(new CoherentSkeletalRegion(this,
					this.dataToStore.coherentBoneDivision,
					systemicPart).container)
		}).bind(this))
		this.subContainer.append(arr)
	},

	selectExisting : function() {

		// Pop up controller the existing entities
		// this returns to the addExisting
	},

	exit : function() {
		
	}
}

/*
 * This is called in the bone division page. It can handle the existing
 */

var CoherentSkeletalRegion = function(parent, parentData, descriptor) {

	this.parent = parent
	this.descriptor = descriptor
	if (existing != null) {
		this.existing = existing
	}
	this.parentData = parentData

	// To this variable we store data to store
	this.initData()
	this.init()
}


CoherentSkeletalRegion.prototypeObject.create(SkeletalRegion.prototype)

$.extend(CoherentSkeletalRegion.prototype = {

	//@Override
	initData : function() {

		this.dataToStore = new Object()
		this.dataToStore.boneOrgans = []
		if (this.descriptor.existing != undefined) {
			this.dataToStore.type = "existing",
				this.dataToStore.uri = this.descriptor.uri
		} else {
			this.dataToStore.type = "new"
			this.dataToStore.uri = this.descriptor.classUri
			this.dataToStore.label = this.descriptor.label
		}
		this.parentData.push(this.dataToStore)
	},

	//@Override
	addExisting : function() {

		var arr = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, function(i, sys) {
			arr.push(new SystemicPartAdder(this, this.existing.systemicParts,
					this.dataToStore.boneOrgans, sys).container)
		})
		this.subContainer.append(arr)
	},
	
	//@Override
	addNew : function(){

		var arr = []
		// Check if we can add existing to add
		$.each(this.descriptor.systemicParts, (function(i, systemicPart) {
			arr.push(new SystemicPartAdder(this, null,
					this.dataToStore.boneOrgans).container)
		}).bind(this))
		this.subContainer.append(arr)
	},
})

/*
 * This is the case when the page is called from a bone division page
 */
var BoneDivisionEditor = function() {

	this.saveContainer = html.div("saveContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
			.disable()
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
			.bind(this), "rightAligned")

	SubBoneDivisionEditor.call(this, pageData.systemicParts, undefined,
			pageData.existingBoneDivision)
	this.assemble()
}

BoneDivisionEditor.prototype = Object.create(SubBoneDivisionEditor.prototype)
$
		.extend(
				BoneDivisionEditor.prototype,
				{

					// @Override
					assemble : function() {

						UI.assemble(this.container, [ this.subContainer,
								this.saveContainer, this.saveButton.container,
								this.cancelButton.container ], [ 0, 0, 1, 1 ])
					},

					// @Override
					setDataToStore : function() {

						this.dataToStore = new Object()
						this.dataToStore.boneOrgan = []
						if (pageData.existingBoneDivision != undefined) {
							this.dataToStore.type = "existing"
							this.dataToStore.uri = pageData.existingBoneDivision
						} else {
							this.dataToStore.type = "new"
									this.dataToStore.uri = pageData.classUri,
									this.dataToStore.label = pageData.classLabel
						}
					},

					appendFields : function() {
						$.each(this.systemicPartSelectors,
								(function(i, sysSel) {
									this.subContainer.append(sysSel.container)
								}).bind(this))

						// this.addAllButton.hide()
						this.saveButton.show().disable()
					},

					saveRoutine : function() {

						var toSend = {
							operation : "addCoherentBoneRegion",
							individual : pageData.individual,
							boneDivision : this.dataToStore
						}
						console.log(toSend)
						PopUpController.init()
						$
								.ajax(
										{
											type : 'POST',
											context : this,
											dataType : 'json',
											url : baseUrl + "dataInput",
											data : "dataToStore="
													+ JSON.stringify(toSend)
										})
								.done(
										(function(msg) {
											if (pageData.existingBoneDivisionType == undefined) {
												pageData.existingBoneDivisionType = this.dataToStore.uri
											}

											var urlObject = {
												pageUri : "boneDivision",
												individual : msg.object.boneDivision.uri,
												skeletalInventory : pageData.individual,
												existingBoneDivisionType : pageData.existingBoneDivisionType,
												classUri : pageData.classUri,
											}

											if (pageData.pageUri != "phalanges") {
												urlObject.cefPageUri = "phalanges"
											}

											window.location = baseUrl
													+ "pageLoader?"
													+ DataLib.getUrl(urlObject)
										}).bind(this))
					},

					cancelRoutine : function() {

						window.location = baseUrl
								+ "pageLoader?skeletalInventory="
								+ pageData.individual
								+ "&pageUri=skeletalInventory"
					},

					refresh : function() {

						var thereIsNotAdded = false
						var thereIsAdded = false

						this.saveButton.disable()
						$.each(this.systemicPartSelectors,
								(function(i, sysSel) {
									if (sysSel.notAdded) {
										thereIsNotAdded = true
									} else {
										this.saveButton.enable()
									}
								}).bind(this))

						if (this.addAllButton != undefined) {
							this.refreshAddAllButton(thereIsNotAdded)
						}
					},
				})

var SymmetricBoneDivisionEditor = function() {

	if (pageData.existingBoneDivision != undefined) {

		BoneDivisionEditor.call(this)

	} else {

		this.dataToStore = new Object()

		this.dataSet = pageData.boneDivisions
		this.systemicPartSelectors = []

		this.container = html.div("table")

		this.headerContainer = html.div("headerContainer")
		this.header = html.div("headerText").text("Select Bone Division")
		this.exitButton = new CustomButton("del",
				(this.exitRoutine).bind(this), "rightAligned")

		this.selectorContainer = html.span("middleSpan margin10")
		this.selectorField = UI.classSelector(pageData.systemicParts)
		this.button = new Button("add", (this.selectBoneDivision).bind(this))

		this.saveContainer = html.div("saveContainer")
		this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
				.disable()
		this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
				.bind(this), "rightAligned")

		this.subContainer = html.div("subContainer")

		this.addAllButton = new TextButton("Add all", (this.addAll).bind(this))
				.hide()

		this.myAssemble()
	}
}

SymmetricBoneDivisionEditor.prototype = Object
		.create(BoneDivisionEditor.prototype)

$.extend(SymmetricBoneDivisionEditor.prototype, {
	myAssemble : function() {

		UI.assemble(this.container, [ this.headerContainer, this.header,
				this.exitButton.container, this.selectorContainer,
				this.selectorField, this.button.container, this.subContainer,
				this.addAllButton.container, this.saveContainer,
				this.saveButton.container, this.cancelButton.container ], [ 0,
				1, -1, 0, 1, 1, 0, 0, 0, 1, 1 ])
	},

	exitRoutine : function() {

		this.selectorContainer.show()
		this.header.text("Select Bone Division")
		this.exitButton.hide()
		this.subContainer.empty()
		this.saveButton.hide()
		this.addAllButton.hide()
		$.each(this.systemicPartSelectors, function(i, selector) {
			selector.reset()
		})
		this.dataToStore = []
		this.systemicPartSelectors = []
	},

	selectBoneDivision : function() {

		$.each(pageData.systemicParts, (function(index, value) {
			if (value.uri == this.selectorField.val()) {
				this.dataToStore.uri = value.uri
				this.dataToStore.label = value.label
				this.dataToStore.type = "new"
				this.dataToStore.boneOrgan = []
				this.setTitle(value.label)
				this.loadSubObject(value.systemicParts)
				return false
			}
		}).bind(this))
	},

	setTitle : function(label) {
		this.exitButton.show()
		this.selectorContainer.hide()
		this.header.text(label)
	},

	appendFields : function() {
		if (this.systemicPartSelectors.length > 0) {
			$.each(this.systemicPartSelectors, (function(i, sysSel) {
				this.subContainer.append(sysSel.container)
			}).bind(this))
			// this.addAllButton = undefined
			this.saveButton.show().disable()
		} else {
			this.addAllButton.hide()
			this.subContainer.append(html.div("margin10").text(
					"The bone division is complete!"))
		}
	},

	addAddAllField : function() {
		var ok = true
		$.each(this.dataSet, function(i, sys) {
			if (sys.subClasses != undefined) {
				ok = false
			}
		})
		if (ok) {
			this.addAllButton.show()
		}
	},

	addAll : function() {
		$.each(this.systemicPartSelectors, function(i, sysSel) {
			if (sysSel.notAdded) {
				sysSel.addInstance()
			}
		})
	},

	refreshSaveButton : function(thereIsAdded) {

	},

	refreshAddAllButton : function(thereIsNotAdded) {

		if (thereIsNotAdded) {
			this.addAllButton.enable()
		} else {
			this.addAllButton.disable()
		}
	},
})
