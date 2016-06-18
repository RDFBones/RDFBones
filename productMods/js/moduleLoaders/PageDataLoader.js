var PageDataLoader = function() {
	this.cnt = 0
	this.loadData()
}

PageDataLoader.prototype = {

	loadData : function() {

		if(pageData.queries != undefined){
			$.each(pageData.queries, (function(i, query) {
				var data = new Object()
				$.each(query.parameters, function(j, parameter) {

					switch (parameter.type) {
					case "global":
						data[parameter.name] = pageData[parameter.varName]
						break;
					case "local":
						data[parameter.name] = parameter.value
						break;
					}
				})
				
				$.ajax({
				url : baseUrl + query.mapping,
				data : data
				}).done((function(msg) {
					if(pageData[query.toVariable] === undefined){
						pageData[query.toVariable] = []
					}
					pageData[query.toVariable] = $.parseJSON(msg) 
					this.checkIfAllArrived()
					
				}).bind(this))
			}).bind(this))			
		} else {
			new DataOperation()
		}

	},

	checkIfAllArrived : function(){
		this.cnt++ 
		if(this.cnt == pageData.queries.length){
			new DataOperation()
		}
	}

}