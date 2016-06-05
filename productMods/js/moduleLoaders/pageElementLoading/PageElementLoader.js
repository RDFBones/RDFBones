

var PageElementLoader = function(){
	
	this.dataObject = pageData["pageConfig"]
	this.varName = "pageElement"
	this.setVars()
	this.root = this
}

PageElementLoader.prototye = {

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
				return true
			} else {
				return false
			}
		},
	
		getElements : function(){
			this.root.addToQueue()
			this.dataObject[this.arrayName] = []
			$.ajax({
				context: this,
				url : baseUrl + this.queryKey,
				data : {
					subject : this.dataObject.uri
				}
			}).done(function(msg){
				$.each(results, (function(i, pageElement){
					var data = new Object()
					$.extend(data, pageElement)
					data["uri"] = data[this.varName]
					delete data[this.varName]
					this.dataObject[this.arrayName].push(data)
					new PageLoaderMap[pageElement.type](this, data).getElements()
				}).bind(this))
			})
			this.root.removeFromQueue()
		},
		
		setVars : function(){
			
			this.queryKey = this.varName + "s"
			this.arrayName = this.varName + "s"
		}
}


var sw = {
		tabContainer : "TabContainer",
		tab : "Tab",
		dataTable : "DataTable",
		literalField : "LiteralField"
}

var PageLoaderMap = new Object()

pageLoaderMap[sw.tabContainer] = TabContainerLoader
pageLoaderMap[sw.literalField] = LiteralLoader
pageloaderMap[sw.tab] = TabLoader
pageLoaderMap[sw.dataTable] = DataTableLoader
pageLoaderMap[sw.literalField] = LiteralLoader

