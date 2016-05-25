var query = {

	getObjectOf : function(varname) {
		return nodes[varname].objectOf
	}
}

var nodeBuffer = []
var propertyBuffer = []

var dataProcessor = {

	getInterface : function() {
		$.each(nodes, function(key, node) {
			if (node.addNew != undefined) {
				dataProcessor.createClassSelector(key, node.classTo)
			}
		})
	},

	/*
	 * Create a list of classes with add button from a parent class
	 */

	createClassSelector : function(node, class_) {

		console.log(ontology.classes)
		var subClasses = ontology.classes[class_].subclasses
		$.each(subClasses, function(index, subClass) {
			$("#skeletalInventory").append(
					UI.getFieldWithAddButton(ontology.classes[subClass].label,
							function() {
								// Here I have to check what kind opportunities
								// are there
								dataProcessor.addEvent(node, subClass)
							}))
		})
	},
	
	exploreRestrictions : function(property) {

		var node
		if (nodeBuffer.indexOf(property.range) == -1) {
			node = nodeBuffer.indexOf(property.range)
		} else if (nodeBuffer.indexOf(property.domain) == -1) {
			node = nodeBuffer.indexOf(property.domain)
		}
		$.each(node.subjectOf, function(index, domainPred) {
			if (propertyBuffer.indexOf(domainPred) == -1) {
				propertyBuffer.push(domainPred)
				if (domainPred.checkRestriction != undefined) {
					// Here I look for the range classes

					/*
					 * SPARQL for the problem select ?possibleClasses where {
					 * [${node.possibleClassses}] rdfs:subClassOf [ a
					 * owl:Restriction . owl:onProperty ${domainPred} .
					 * owl:allValuesFrom ] }
					 */
					/*
					 * This has to create
					 * 
					 */
				}
			}
		})
		$.each(node.objectOf, function(index, rangePred) {
			if (propertyBuffer.indexOf(rangePred) == -1) {
				propertyBuffer.push(rangePred)
				dataProcessor.exploreRestrictions(rangePred)
			}
		})
	},

	init : function() {
		
		nodeBuffer.push("individual")
		var mainProperty
		if (nodes.individual.subjectOf != undefined) {
			mainProperty = nodes.individual.subjectOf
		} else {
			mainProperty = nodes.individual.objectOf
		}
		propertyBuffer.push(mainProperty)
		dataProcessor.exploreRestrictions(mainProperty)
	},

	getFields : function(variable, class_) {

		console.log(variable + "   " + class_)
		/* var htmlField = html.div()
		var variable = cachedNodes[variable].possibleClasses[class_].variables
		$.each(variables, function(variable, data) {
			var propertyDef = predicates[data.property]
			if (propertyDef.offerAllPossible != undefined) {
				
			}
		})
		return htmlField*/
	},
}

var logic = {

		
	isFinalNode : function(variable){

		return Arithmetic.or([this.isDataProperty(prop), this.onlyAddExisting(prop), this.connectsToIndividual(prop)])
	},

	isDataProperty : function(prop) {

		if (properties[prop].dataProperty != undefined) {
			return true
		} else {
			return false
		}
	},

	onlyAddExisting : function(prop) {

		if (properties[prop].addExisting != undefined
				&& properties[prop].addNew === undefined) {
			return true
		} else {
			return false
		}
	},
	
	connectsToIndividual : function(prop){
		
		if(properties[prop].domain == "individual" || properties[prop].range == "individual"){
			return true
		} else {
			return false
		}
	}
}	