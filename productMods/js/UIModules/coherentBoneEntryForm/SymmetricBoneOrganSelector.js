


var SymmetricBoneOrganSelector = function(parent, sysPart, dataToStore){
	
	this.notAdded = true
	this.parent = parent
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
			
	},
	
	getSelectArray : function(){
		
		this.arr = this.sysPart.subClasses.slice()
		var object = {
			uri : this.sysPart.uri,
			label : this.sysPart.label,
		}
		this.arr.unshift(object)
		return this.arr
	},

	checkAdding : function(){
		
		var val = this.selector.val()
		if(this.cnt == this.max){
			alert("You are allowed to add maximal " + this.cnt + " bone organs!")
		} else if  (this.addedSubClasses.indexOf(val) != -1){
			alert("You are allowed to add only one from this bone organ!")
		} else {
			if(val != this.sysPart.uri){
				this.addedSubClasses.push(val)
			}
			this.addSystemicPart(this.arr.getObjectByKey("uri", val))
		}
	}, 
	
	reset : function(){
		
		this.cnt--
		if(this.cnt == 0){
			this.notAdded = true
		}
		this.parent.refresh()
	},
	
	addSystemicPart : function(object){
		this.notAdded = false
		this.cnt++
		this.systemicPartContainer.append(new SymmetricBoneSegmentField(this, object, this.dataToStore).container)
		this.parent.refresh()
	},
	
	resetUri : function(uri){
		this.addedSubClasses.removeElement(uri)
	}
}