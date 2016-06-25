var PageLoaderMap = new Object()

var PageElementLoader = function(pageInit){
	
	if(pageData.pageUri != undefined){
		this.pageInit = pageInit
		pageData["pageConfig"] = new Object()
		pageData["pageConfig"].uri = pageData.pageUri
		this.dataObject = pageData["pageConfig"]
		this.loadingQueue = []
		this.varName = ["pageElement"]
		this.setVars()
		this.root = this
		this.getElements()
	} else {
		pageInit.done()
	}
}

PageElementLoader.prototype = {

		init : function(pageData){
			pageData[pageElements] = []
			this.elementArray = pageData[pageElements]
		},
		
		addToQueue : function(){
			this.loadingQueue.push(1)
		},
		
		removeFromQueue : function(){
			this.loadingQueue.pop()
			if(this.loadingQueue.length == 0){
				this.pageInit.next()
			}
		},
	
		getElements : function(){
			
			$.each(this.varName, function(i, varName){
				this.root.addToQueue()
				this.dataObject[this.arrayName] = []
				$.ajax({
					context: this,
					url : baseUrl + "pageConfigLoad",
					data : {
						configType : this.queryKey[varName],
						subject : this.dataObject.uri
					}
				}).done((function(msg){
					var results = $.parseJSON(msg)
					if(results.noResult === undefined){
						$.each(results, (function(i, pageElement){
							var data = new Object()
							$.extend(data, pageElement)
							data["uri"] = data[varName]
							delete data[this.varName]
							this.dataObject[this.arrayName].push(data)
							new PageLoaderMap[pageElement.type](this.root, data).getElements()
						}).bind(this))			
					}
					this.root.removeFromQueue()
				}).bind(this)).fail((function(){
					console.log("The AJAX call were not succesful")
					console.log(this.queryKey[varName])
					console.log(this.dataObject[varName])
				}).bind(this))				
			})
		},
		
		setVars : function(){
			
			$.each(this.varName, function(i, varName){
				this.queryKey[varName] = this.varName + "s"
				this.arrayName[varName] = this.varName + "s"
			})

		}
}
