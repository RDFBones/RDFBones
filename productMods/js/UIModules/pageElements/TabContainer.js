

var TabContainer = function(configData){
	
	this.configData = configData
	this.tabContainer = html.div("tabContainer")
	this.contentContainer = html.div("tabContentContainer")
	this.container = html.div("tabContainerCont")
				.append(this.tabContainer)
				.append(this.contentContainer)
	this.tabs = []
	this.init()
}


TabContainer.prototype = {
		
	init : function(){
		this.initTabs()
	},
		
	initTabs : function(){
		$.each(this.configData.tabs, (function(index, tab){
			var tab = new Tab(this, tab) 
			this.tabs.push(tab)
			this.tabContainer.append(tab.container)
			this.contentContainer.append(tab.content)
			if(index == 0){
				this.selected = tab
				this.selected.init()
			}
		}).bind(this))
	},
	
	select : function(tab){
		this.selected.deselect()
		this.selected = tab
	}
	
}

var Tab = function(tabContainer, tabDef){
	
	this.tabContainer = tabContainer
	this.tabDef = tabDef
	this.configData = tabDef
	this.container = html.div("tab").text(tabDef.tabTitle).
		click((this.select).bind(this))
	this.setLocalData()
	this.initContent()
}

Tab.prototype = {
		
	initContent : function(){
		this.content = html.div().hide()
		var tmp = []
		
		if(this.tabDef.elements !== undefined){
			if(this.tabDef.elements.length != 0){
				$.each(this.tabDef.elements, (function(i, element){
					tmp.push(new PageElementMap[element.type](element, this).container)
				}).bind(this))
				this.content.append(tmp)
				return true
			}
		}
		this.content = html.div().text("There is no content")
	},
	
	setLocalData : function(){
		
		if(this.configData.localData != undefined){
			this.localData = new Object()
			$.each(this.configData.localData, (function(i, data){
				if(typeof data.type != "undefined"){
					this.localData[data.key] = DataOperationMap[data.type](this, data)	
				}
			}).bind(this))
			console.log(this.localData)
		}
	},
	
	init : function(){
		this.container.addClass("selectedTab")
		this.content.show()
	},
	
	select : function(){
		if(this.tabContainer.selected != this){
			this.init()
			this.tabContainer.select(this)
		}
	},
	
	deselect : function(){
		this.container.removeClass("selectedTab")
		this.content.hide()
	}
}