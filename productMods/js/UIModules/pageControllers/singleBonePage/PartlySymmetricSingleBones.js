


var PartlySymmetric = function(input, dataToStore){
	
	this.dataToStore = dataToStore
	this.input = input
	this.container = html.div()
	
	this.title = html.div().text(input.label)
	this.subContainer = html.div("subContainer")
	
	this.container.append(this.title).append(this.subContainer)
	this.init()
}

PartlySymmetric.prototype = {
		
	init : function(){
	
		var arr = []
		$.each(this.input.subClasses, (function(i, sysPart){
			arr.push(new PartlySymmetric1(sysPart, this.dataToStore).container)
		}).bind(this))
		this.container.append(arr)
	}
}

var PartlySymmetric1 = function(input, dataToStore){
	
	PartlySymmetric.call(this, input, dataToStore)
}

PartlySymmetric1.prototype = {
		
	init : function(){
	
		var arr = []
		$.each(this.input.systemicParts, (function(i, sysPart){
			arr.push(new SingleBoneOrganAdder(sysPart, this.dataToStore).container)
		}).bind(this))
		this.subContainer.append(arr)
	}
}

var PartlySymmetric2 = function(input, dataToStore){
	
	PartlySymmetric.call(this, input, dataToStore)
}

PartlySymmetric2.prototype = {
		
	init : function(){
		var arr = []
		$.each(this.input.systemicParts, (function(i, sysPart){
			arr.push(new SingleBoneOrganAdder(sysPart, this.dataToStore))
		}).bind(this))
	}
}


var DefaultSingleBone = function(input, dataToStore){
	
	
	this.dataToStore = dataToStore
	this.input = input
	this.container = html.div()
	
	this.title = html.div().text(input.label)
	this.subContainer = html.div("subContainer")
	
	this.container.append(this.title).append(this.subContainer)
	this.init()
}

DefaultSingleBone.prototype = {
		
	init : function(){
		
		var object = {
				uri : this.input.uri,
				label : this.input.label,
		}
		var arr = []
		arr.push(new SingleBoneOrganAdder(object, this.dataToStore))
		$.each(this.input.subClasses1, (function(i, subClass){
			arr.push(new SingleBoneOrganAdder(subClass, this.dataToStore).container)
		}).bind(this))
		this.subContainer.append(arr)
	}, 
}


var Thridary = function(input, dataToStore){
	
	this.container = html.div()
	this.init(input, dataToStore)
} 

Thridary.prototype = {
	
	init : function(input, dataToStore){
		
		var arr = []
		console.log(input)
		$.each(input.subClasses1, (function(i, subClass){
			arr.push(new SingleBoneOrganAdder(subClass, dataToStore).container)
		}).bind(this))
		this.container.append(arr)
	}
}




