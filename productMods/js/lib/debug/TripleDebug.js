
var TripleDebug = function(triples) {

	
	this.container = html.div()

	$.each(triples, (function(i, triple) {
		this.container.append(this.getTripleDiv(triple))
	}).bind(this))

	$("#debugContainer").append(this.container)
}

TripleDebug.prototype = {

	getTripleDiv : function(triple) {

		return html.div("rowContainer").append(
				html.div("inline", triple.subject + "\t" + triple.predicate +
						"\t" + triple.object))
	}
}