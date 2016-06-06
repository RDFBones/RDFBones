

var PageLink = function(type, pageUri){
	
	this.container = html.link(pageUri)
	this.button = new LinkButton(type)
	this.container.append(this.button.container)
}


