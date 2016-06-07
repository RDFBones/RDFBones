

var TabContainer = function(configData){
	
	this.configData = configData
	this.tabContainer = html.div("tabContainer")
	this.contentContainer = html.div("contentContainer")
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
			if(index == 0){
				tab.showContent()
			}
		}).bind(this))
	},
	
	deselectAll : function(){
		$.each(this.tabs, function(i, tab){
			tab.deselect()
		})
	}
}

var Tab = function(tabCont, tabDef){
	
	this.tabCont = tabCont
	this.tabDef = tabDef
	this.container = html.div("tab").text(tabDef.tabTitle).
		click((this.showContent).bind(this))
	this.initContent()
}

Tab.prototype = {
		
	initContent : function(){
		this.content = html.div()
		var tmp = []
		if(this.tabDef.elements.length != 0){
			$.each(this.tabDef.elements, function(i, element){
				tmp.push(new PageElementMap[element.type](element).container)
			})
			this.content.append(tmp)
		} else {
			console.log("jdsjkdsdskj")
			this.content = html.div().text("There is no content")
		}
	},

	showContent : function(){
		this.tabCont.deselectAll()
		this.select()
		this.tabCont.contentContainer.empty()
		this.tabCont.contentContainer.append(this.content)
	},
	
	select : function(){
		this.container.addClass("selectedTab")
	},
	
	deselect : function(){
		this.container.removeClass("selectedTab")
	}
}