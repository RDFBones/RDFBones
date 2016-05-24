
//RULE 1

//If a node appears on the interface, then we have to check if it is an object or subject of
//predicate. The interface has to contain the definition of the interface type.
//The following could be : 

/*
 * Tree structure
 * Text field
 * Datum Field
 */

//To be able to know what are the possible classes to add we have to build a query that
//Start Bone Division -
//?boneDivision   rdfs:subClassOf obo:BoneDivision .
//all bone division classes
//then predicate systemic part comes :

//Query  :               ?boneOrgan rdfs:subClassOf [
//								a owl:Restrion,
//								owl:someValuesFrom ?boneDivision .
//							]
//We get the possible classes for the ?boneOrgans.
//
//Query  :               ?boneSegment rdfs:subClassOf [
//								a owl:Restrion,
//								owl:someValuesFrom ?boneOrgan .
//							]
//						 ?completeness rdfs:subClassOf [
//								a owl:Restrion,
//								owl:someValuesFrom ?boneSegment .
//						 ]
//After performing the query and doing the grouping we should get something like this : 
//This dataset is already a combination of the ontology data and the display configuration data
//The data structure has to represent completely what happens.
var query = {

	getObjectOf : function(varname) {
		return nodes[varname].objectOf
	}
}

var processes = {

	// First step
	// Find the class where we can choose from and create for this a classlabel
	// and add button

	// QUESTION : How to find this in the software configuration which is the
	// variable
	// As in one triple store we can query the variables.

	/*
	 * SOLUTION : iterate through the nodes of the configuration triples and
	 * check which value has to be added.
	 */

	getInterface : function() {
		$.each(nodes, function(index, node) {
			if (node.addNew != undefined) {
				processes.createClassSelector(node.classTo)
			}
		})
	},

	/*
	 * Create a list of classes with add button from a parent class
	 */

	createClassSelector : function(class_) {

		console.log(ontology.classes)
		var subClasses = ontology.classes[class_].subclasses
		$.each(subClasses, function(index, subClass){
			$("#skeletalInventory").append(
				UI.getFieldWithAddButton(ontology.classes[subClass].label, function() {
					alert("a")
				}))
		})
	},

	/*
	 * This function either returns a false, so that we cannot display the form.
	 * Or a concrete form div.
	 */
	generateForm : function(className) {
		// I have to check all the predicates whose subject or object is this
		// varname

		var classesToQuestion
		var property = query.getObjectOf(varname)
		// Now only the completely new parts are interested

		if (predicate.checkRestriction) {
			// Here we have to list all classes come into the question
			if (ontology.properties[property].restriction[className] != undefined) {

			}
		}

	},

	addNew : function(varName) {

	},

	showForm : function(property) {

	},

}

var UIConfig = {

	boneDivisions : {
		classsesForNew : [ {
			uri : "1",
			label : "Viscerocraium",
			connections : {
				boneOrgan : {
					minCardinality : 1,
					classesForNew : [ {
						uri : "leftparietal1",
						label : "Left Parietal Bone",

					}, {
						uri : "rightparietal1",
						label : "Right Parietal Bone",
						connections : {
							entireBone : {
								mincardinality : 1,
								connections : {
									classesForNew : [ {
										uri : "entireLeftParietal",
										label : "Entire Left Parietal Bone",
										connections : {
											completeness : {

											}
										}
									} ]
								}
							}
						}
					} ]
				}
			},
		} ]
	}
}

processes.getInterface()
