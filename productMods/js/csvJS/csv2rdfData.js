var csv2rdfStateUI = {

	set : function() {
		switch (csv2rdfData.state) {
		case 1:
			csv2rdfHTML.defNewInstances.removeClass("disabled")
			break
		case 2:
			csv2rdfHTML.defTriples.removeClass("disabled")
			$('.hideAtFirst').removeClass('hideAtFirst')
			break
		default:
			break
		}
	}
}

var csv2rdfData = {
	/***************************************************************************
	 * Variables
	 **************************************************************************/
	triplesToStore : [],
	tripleDivs : [],
	state : 0,
	reference : -1,
	saveMode : csv2rdfStateConstants.saveMode.initial,
	saveType :  csv2rdfStateConstants.saveType.disabled ,

	newTriple : function() {

		this.tripleDivs.push(new Object())
		var triple = new Object()
		this.triplesToStore.push(triple)
		this.reference = this.triplesToStore.length - 1
	},

	saveSubjectDiv : function(subjectDiv) {
		this.tripleDivs[this.reference].subject = subjectDiv
	},

	savePredicateDiv : function(predicateDiv) {
		return this.tripleDivs[this.reference].predicate = predicateDiv
	},

	saveObjectDiv : function(objectDiv) {
		return this.tripleDivs[this.reference].object = objectDiv
	},

	getSubjectDiv : function() {
		return this.tripleDivs[this.reference].subject
	},

	getPredicateDiv : function() {
		return this.tripleDivs[this.reference].predicate
	},

	getObjectDiv : function() {
		return this.tripleDivs[this.reference].object
	},

	saveSubjectUri : function(subjectUri) {
		this.triplesToStore[this.reference].subject = subjectUri
	},

	saveProperty : function(property, type) {
		this.triplesToStore[this.reference].predicate = new Object()
		this.triplesToStore[this.reference].predicate.uri = property.uri
		this.triplesToStore[this.reference].predicate.type = type
	},

	saveObject : function(varname, type) {
		this.triplesToStore[this.reference].object =  new Object()
		this.triplesToStore[this.reference].object.varname = varname
		this.triplesToStore[this.reference].object.type = type
	},

	deleteTriple : function(tripleNum){
		this.triplesToStore[this.reference].subject = "";
	},
	
	/***************************************************************************
	 * ResetReference
	 **************************************************************************/
	resetReference : function() {
		this.reference = this.triplesToStore.length - 1
	},

	getInstanceVarName : function(variable) {
		var cnt = 0;
		$.each(this.triplesToStore,
				function(index, value) {
					var varName = value.subject
					if (varName.indexOf(variable) == 1
							&& value.predicate == "rdf:type") {
						cnt++
					}
				})
		prime = ""
		for (var i = 0; i < cnt; i++) {
			prime += "'"
		}
		return "?" + variable + prime
	}
}