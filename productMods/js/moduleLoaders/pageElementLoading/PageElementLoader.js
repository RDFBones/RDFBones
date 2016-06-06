

var PageElementLoader = function(uri){
	pageData["pageConfig"] = new Object()
	this.loadingQueue = []
	pageData["pageConfig"].uri = uri
	this.dataObject = pageData["pageConfig"]
	this.varName = "pageElement"
	this.setVars()
	this.root = this
	this.getElements()
}

PageElementLoader.prototype = {

		init : function(pageData){
			pageData[pageElements] = []
			this.elementArray = pageData[pageElements]
		},
		
		addToQueue : function(){
			console.log(this)
			this.loadingQueue.push(1)
		},
		
		removeFromQueue : function(){
			this.loadingQueue.pop()
			if(this.loadingQueue.length == 0){
				//If we are here then everything were loaded
				console.log("Ready")
				console.log(pageData)
				pageLoader.loadPage()
			} 
		},
	
		getElements : function(){
			this.root.addToQueue()
			this.dataObject[this.arrayName] = []
			$.ajax({
				context: this,
				url : baseUrl + "pageConfigLoad",
				data : {
					configType : this.queryKey,
					subject : this.dataObject.uri
				}
			}).done((function(msg){
				var results = $.parseJSON(msg)
				if(results.noResult === undefined){
					$.each(results, (function(i, pageElement){
						var data = new Object()
						$.extend(data, pageElement)
						data["uri"] = data[this.varName]
						delete data[this.varName]
						this.dataObject[this.arrayName].push(data)
						new PageLoaderMap[pageElement.type](this.root, data).getElements()
					}).bind(this))			
				}
				this.root.removeFromQueue()
			}).bind(this)).fail((function(){
				console.log("The AJAX call were not succesful")
				console.log(this.queryKey)
				console.log(this.dataObject)
			}).bind(this))
			
		},
		
		setVars : function(){
			
			this.queryKey = this.varName + "s"
			this.arrayName = this.varName + "s"
		}
}
