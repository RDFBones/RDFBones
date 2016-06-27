var PageDataLoader = function(pageInit) {

	this.pageInit = pageInit
	this.cnt = 0
	this.loadData()
}

PageDataLoader.prototype = {

	loadData : function() {

		if (pageData.queries != undefined) {
			
			$.each(pageData.queries, (function(i, query) {
				
				if(!RequirementCheck(query)){
					this.cnt++
					return true
				}
				var data = new Object()
				$.each(query.parameters, function(j, parameter) {
					if(parameter.varName != undefined){
						data[parameter.varName] = getData(undefined, parameter)
					} else {
						data[parameter.key] = getData(undefined, parameter)
					}
				})

				$.ajax({
					url : baseUrl + query.mapping,
					data : data
				}).done((function(msg) {
					if (pageData[query.toVariable] === undefined) {
						pageData[query.toVariable] = []
					}
					pageData[query.toVariable] = $.parseJSON(msg)
					this.checkIfAllArrived()

				}).bind(this))
			}).bind(this))
		} else {
			this.pageInit.done()
		}
	},

	checkIfAllArrived : function() {
		this.cnt++
		if (this.cnt == pageData.queries.length) {
			this.pageInit.done()
		}
	},
	

}