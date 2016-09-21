var csv2rdfHTML = {

	onload : function() {
		this.initObjects()
		this.initEventListeners()
	},

	initObjects : function() {

		this.file = $(':file')

		this.defNewInstances = $('#defNewInstances')
		this.addInstance = $('#addInstance')
		this.fileUpload = $("#fileUpload")
		this.uploadCSV = $("#uploadCSV")

		this.literalsDiv = $("#literalsDiv")
		this.instancesDiv = $("#instancesDiv")
		this.newInstanceTriple = $('#newInstanceTriple')

		this.defTriples = $('#defTriples')
		this.addTriple = $("#addTriple")

		this.triples = $("#triples")
		this.saveSchema = $("#saveSchema")

		this.show = $("#show")
		this.scheme = $("#scheme")

		this.subject = $("#subjectContainer")
		this.predicate = $('#predicateContainer')
		this.object = $('#objectContainer')
		this.modifyImgContainer = $('#modifyImgContainer')
	},

	initEventListeners : function() {

		this.file.change(function() {
			var file = this.files[0];
			csv2rdfController.readInFile(file)
		})

		this.addTriple.click(function() {
			csv2rdfClickEvents.addNewTriple()
		})

		this.show.click(function() {
			$.each(csv2rdfData.triplesToStore, function(index, value) {
				var str = value.subject + "   ,   " + value.predicate
						+ "   ,   " + value.object
				var d = html.div().text(str).appendTo(csv2rdfHTML.scheme)
			})
		})

		this.addInstance.click(function() {
			ontologyViewerElements.startClassViewer()
		})
	}
}

csv2rdfHTML.onload()