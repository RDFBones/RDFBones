	var ontViewer = {

		exitWithClass : function(_class){
			ontologyViewerElements.classSelectorContainer.hide()
			csv2rdfController.addNewInstance(_class.name, _class.uri)
		},

		exitWithDataProp : function(property){
			console.log(property.name)
			ontologyViewerElements.propertySelectorContainer.hide()
			csv2rdfController.saveProperty(property, csv2rdfStateConstants.objectTypes.literal)
		},
		
		exitWithObjectProp : function(property){
			console.log(property.name)
			ontologyViewerElements.propertySelectorContainer.hide()
			csv2rdfController.saveProperty(property, csv2rdfStateConstants.objectTypes.instance)
		}
	}		

	var ontologyViewerElements = {

		selectedOntology : 0 ,

		init : function(){
			this.initObjects()
			this.initOntologyList()
		},

		initObjects : function(){
			this.ontologyList = $('#ontologyList')
			this.ontologyListClass = $('#ontologyListClass')
			this.dataPropertyList = $('#dataPropertyList')
			this.objectPropertyList = $('#objectPropertyList')
			this.classList = $('#classList')
			this.propertySelectorContainer = $('#propertySelectorContainer')
			this.classSelectorContainer = $('#classSelectorContainer')
		},
		
		initOntologyList : function(){
			$.each(ontology, function(index, value){
				ontologyViewerElements.createOntologyEntry(index, value)
			})	
		},

		startPropertyViewer : function(){
			this.propertySelectorContainer.show()
			this.ontologyList.find(">:first-child").css("border", "1px solid white")
			this.showProperties(ontology[0])
		},
		
		startClassViewer : function(){
			this.classSelectorContainer.show()
			this.ontologyListClass.find(">:first-child").css("border", "1px solid white")
			this.showClasses(ontology[0])
		}, 
 
		showClasses: function(ontology){
			this.clearClassList(ontology)
			$.each(ontology.classes, function(index, value){
				ontologyViewerElements.createClassEntry(value)
			})
		},

		showProperties: function(ontology){
			this.clearPropertyLists()
			$.each(ontology.dataProperties, function(index, value){
				ontologyViewerElements.createDataPropertyEntry(value)
			})
			$.each(ontology.objectProperties, function(index, value){
				ontologyViewerElements.createObjectPropertyEntry(value)
			})
		},
		
		clearClassList : function(){
			this.classList.empty()
		},
		
		clearPropertyLists : function(){
			this.dataPropertyList.empty()
			this.objectPropertyList.empty()
		},
		
		getListDiv : function(){
			return $('<div/>').addClass("ontologyViewerEntry")	
		},		

		createOntologyEntry : function(number, ontology){
			
			this.getListDiv()
			.text(ontology.name)
			.click(function(){
				ontologyViewerElements.showProperties(ontology)
				ontologyViewerElements.ontologyList
					.find(':nth-child(' + (ontologyViewerElements.selectedOntology + 1) + ')')
					.css("border", "1px solid black")
				ontologyViewerElements.selectedOntology = number
				ontologyViewerElements.ontologyList
					.find(':nth-child(' + (ontologyViewerElements.selectedOntology + 1) + ')')
					.css("border", "1px solid white")
				console.log(ontologyViewerElements.selectedOntology)

			})
			.appendTo(ontologyViewerElements.ontologyList)
			this.getListDiv()
			.text(ontology.name)
			.click(function(){
				ontologyViewerElements.showClasses(ontology)
				ontologyViewerElements.ontologyListClass
					.find(':nth-child(' + (ontologyViewerElements.selectedOntology + 1) + ')')
					.css("border", "1px solid black")
				ontologyViewerElements.selectedOntology = number
				ontologyViewerElements.ontologyListClass
					.find(':nth-child(' + (ontologyViewerElements.selectedOntology + 1) + ')')
					.css("border", "1px solid white")
			})
			.appendTo(ontologyViewerElements.ontologyListClass)
		},

		createClassEntry : function(_class){
			
			this.getListDiv()
			.text(_class.name)
			.click(function(property){
				ontViewer.exitWithClass(_class)
			}).appendTo(ontologyViewerElements.classList)
		},

		createDataPropertyEntry : function(property){
			
			this.getListDiv()
			.text(property.name)
			.click(function(){
				ontViewer.exitWithDataProp(property)
			}).appendTo(ontologyViewerElements.dataPropertyList)
		},

		createObjectPropertyEntry : function(property){
			
			this.getListDiv()
			.text(property.name)
			.click(function(){
				ontViewer.exitWithObjectProp(property)	
			}).appendTo(ontologyViewerElements.objectPropertyList)	
		},
	}
	
	ontologyViewerElements.init()
