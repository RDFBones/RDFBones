var PageDataLoader = function(pageInit) {

	this.pageInit = pageInit
	this.cnt = 0
	
	this.cnt = new Object()
	this.loadData()
}

PageDataLoader.prototype = {

	loadData : function() {

		if (pageData.queries != undefined) {
			
			$.each(pageData.queries, (function(i, query) {
				
				this.cnt[i] = new Object()
				this.cnt[i].done = false
				this.cnt[i].cnt = 0

				if(!RequirementCheck(query)){
					this.cnt[i].done = true
					return true
				}
				
				var data = new Object()
				
				var multipleQuery = null
				
				$.each(query.parameters, (function(j, parameter) {
					
					if(DataLib.getType(getData1(parameter)) == "array"){
						multipleQuery = getData1(parameter)
						varName = parameter.varName
					}
					if(parameter.varName != undefined){
						data[parameter.varName] = getData1(parameter)
					} else {
						data[parameter.key] = getData1(parameter)
					}
				}).bind(this))
				
				if(multipleQuery != null){
					this.cnt[i].num = multipleQuery.length
					toVariable = false
					$.each(multipleQuery, (function(k, element){
					
						if(DataLib.getType(element) == "object"){
							data[varName] = element.value
							toVariable = true
						} else {
							data[varName] = element
						}
						$.ajax({
							dataType : "json",
							url : baseUrl + query.mapping,
							data : data,
						}).done((function(result) {

								if(toVariable){
									if (pageData[query.toVariable] === undefined) {
										pageData[query.toVariable] = new Object()
									}
									if(result.noResult === undefined){
										pageData[query.toVariable][element.name] = result
									}
								} else {
									if (pageData[query.toVariable] === undefined) {
										pageData[query.toVariable] = []
									}
									if(result.noResult === undefined){
										if(query.concatResultArrays != undefined){
											pageData[query.toVariable] = pageData[query.toVariable].concat(result)
										} else {
											pageData[query.toVariable].push(result)
										}								
									}
								}								
							this.checkIfAllArrived(i)
						}).bind(this))
					}).bind(this))
					
				} else {
					this.cnt[i].num = 1
					$.ajax({
						dataType : "json",
						url : baseUrl + query.mapping,
						data : data
					}).done((function(result) {
						if(query.singleData != undefined){
							pageData[query.toVariable] = result[0].object
						} else {
							if (pageData[query.toVariable] === undefined) {
								pageData[query.toVariable] = []
							}
							pageData[query.toVariable] = result
						}
						this.checkIfAllArrived(i)
					}).bind(this))
				}
			}).bind(this))
		} else {
			this.pageInit.done()
		}
	},

	checkIfAllArrived : function(number) {
			
		this.cnt[number].cnt++;
		
		if(this.cnt[number].num == this.cnt[number].cnt){
			this.cnt[number].done = true
		}
		var ok = true
		$.each(this.cnt, function(i, value){
			if( !value.done){
				ok = false
				return false
			}
		})
		if(ok){
			this.pageInit.done()
		}
	},
	
	
	
}