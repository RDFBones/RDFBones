var NavigatorView = function(returnFunction) {

	this.cnt = 0
	this.elements = []
	this.returnFunction = returnFunction
	// Adding home button
	this.container = UI.verticalMiddleCont().addClass("navigatorContainer")
}

NavigatorView.prototype = {

	home : function(homeParameter){
		this.newElement("Home", homeParameter)
	},
	
	newElement : function(label, parameter) {

		var button = new TextButton(label, (this.clickEvent).bind(this),
				"inline", [this.cnt, parameter])
		this.container.append(button.container)
		this.elements[this.cnt] = button
		this.setAsLast(this.cnt)
		this.cnt++;
	},

	setAsLast : function(cnt) {
		if(cnt > 0)
			this.elements[cnt].setColor("white").disableHover()
		if(cnt - 1 > 0)
			this.elements[cnt - 1].enable().setColor("#9d9696").enableHover()	
	},
	
	clickEvent : function(parameter) {

		console.log("ClickEvent")
		console.log(parameter)
		var cnt = parameter[0]
		var param = parameter[1]
		if(cnt < this.cnt - 1){
			this.removeElements(cnt)
			this.returnFunction(param)	
		}
	},

	removeElements : function(cnt) {

		this.setAsLast(cnt)
		for (var i = cnt; i < this.cnt - 1; i++) {
			this.elements[i + 1].container.remove()
		}
		this.cnt = cnt + 1
	}
}