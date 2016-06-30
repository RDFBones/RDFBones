


var SymmetricBoneOrganSelector = function(sysPart, dataToStore){
	
	this.container = html.div()
	
	this.sysPart = sysPart
	this.dataToStore = dataToStore
	this.title = html.div("inline").text(this.sysPart.label)
	
	this.selectorContainer = html.div("margin10")
	
	this.selector = UI.classSelector(this.getSelectArray())
	this.addButton = new Button("add", (this.checkAdding).bind(this))
	
	this.systemicPartContainer = html.div("")
	
	this.max = this.sysPart.subClasses.length 
	this.cnt = 0
	this.addedSubClasses = []
	this.assemble()
}

SymmetricBoneOrganSelector.prototype = {
		
		
	assemble : function(){
		
		UI.assemble(this.container, [
		   this.selectorContainer,
		   		this.title,
		   		this.selector,
		   		this.addButton.container,
		   this.systemicPartContainer],
			[0, 1, 1, 1, 0])
			
		$("#pageContent").append(this.container)
	},
	
	getSelectArray : function(){
		
		arr = this.sysPart.subClasses.slice()
		var object = {
			uri : this.sysPart.uri,
			label : this.sysPart.label,
		}
		arr.unshift(object)
		return arr
	},

	checkAdding : function(){
		
		var val = this.selector.val()
		if(val == this.sysPart.uri){
			if(this.cnt < this.max - 1){
				this.addSystemicPart(this.sysParts.getObjectByKey("uri", val))
			} else {
				alert("You are allowed to add maximal " + this.cnt + " bone organs!")
			}
		} else {
			if(this.addedSubClasses.indexOf(value) == -1){
				this.addedSubClasses.push(val)
				this.addSystemicPart(this.sysParts)
			} else {
				alert("You are allowed to add only one from this bone organ!")
			}
		}
	}, 

	addSystemicParts : function(object){
		this.sysContainer.push(new BoneSegmentField(this, this.dataToStore, object))
	},
}