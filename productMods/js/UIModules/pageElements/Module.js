
class Module {
	
	constructor(titleText){

		this.container = html.div("moduleContainer")
		this.title = html.div("moduleTitleStyle").text(titleText)
		this.table = html.div("moduleTable")
		this.container.append([this.title, this.table])
	}

	add (container){
		this.table.append(container)
	}

	addObject (object){
		this.table.append(object.container)
	}

	
}

