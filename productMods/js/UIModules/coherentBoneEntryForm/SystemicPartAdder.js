

var SystemicPartAdder = function(parent, existingBoneOrgans, dataToStore, dataSet){
	
	this.parent = parent
	this.existingBoneOrgans = existingBoneOrgans
	this.dataToStore = dataToStore
	//This defines the class structure
	this.dataSet = dataSet

	//Counter
	this.cnt = 0
	this.addedSubClasses = []
	this.singleSelect = true
	
	this.container = html.div()
	this.selectorContainer = html.div()
	this.selectedContainer = html.div()
	this.title = html.div("inline").text(this.dataSet.label)
	this.addButton = new Button("add", (this.checkAdding).bind(this))
	
	this.setSelectorField()
	this.initSelected()
	this.assemble()
}


SystemicPartAdder.prototype = {
		
		
	setSelectorField : function(){
		
		if(this.dataSet.subClasses != undefined){
			this.singleSelect = false
			/*
			 * Here we assemble the selector 
			 */
			this.arr = this.dataSet.subClasses.slice()
			var object = {
				uri : this.dataSet.uri,
				label : this.dataSet.label,
			}
			this.arr.unshift(object)	
			this.selector = UI.classSelector(this.arr)
			this.max = this.dataSet.subClasses.length
		} else {
			this.max = 1
		}
	},
	
	assemble : function(){
		UI.assemble(this.container, [
         			this.selectorContainer,
         				this.title,
         				this.selector,
         				this.addButton.container,
         			this.selectedContainer],
         			[0, 1, 1, 1, 0])
	},
	
	initSelected : function(){
		
		if(this.existingBoneOrgans != undefined){
			if(this.existingBoneOrgans.length != 0){
				//Check if it is selectable or constant bone organ
				buf = []
				//Always check the main
				var match = this.existingBoneOrgans.getObjectByKey("type", this.dataSet.uri)
				if(match != null){
					this.addExistingSystemicPart(match)
				}
				
				if(this.dataSet.subClasses != undefined){
					object = DataLib.joinTables(this.existingBoneOrgans, "type", this.dataSet.subClasses, "uri")
					//Fill the existing part array
					$.each(object, (function(i, obj){
						this.addedSubClasses.push(obj.type)
						this.addExistingSystemicPart(obj)
					}).bind(this))
				}
				this.selectedContainer.append(buf)
			}
		}
	},
	
	checkAdding : function(){
		
		if(this.singleSelect){
			this.addSystemicPart(this.dataSet)
			this.selectorContainer.hide()
		} else {
			//Check the number of element
			val = this.selector.val()
			if(this.cnt == this.max){
				alert("You are allowed to add maximal " + this.cnt + " bone organs!")
			} else if  (this.addedSubClasses.indexOf(val) != -1){
				alert("You are allowed to add only one from this bone organ!")
			} else {
				if(val != this.dataSet.uri){
					console.log(this.addedSubClasses)
					this.addedSubClasses.push(val)
				}
				this.addSystemicPart(this.arr.getObjectByKey("uri", val))
			}
		}
	},
	
	reset : function(uri){
		
		console.log(uri)
		console.log("before")
		console.log(this.addedSubClasses)
		this.addedSubClasses.removeElement(uri)
		console.log(this.addedSubClasses)
		if(this.singleSelect){
			this.selectorContainer.show()
		}
		this.cnt--
		if(this.cnt == 0){
			this.notAdded = true
		}
		this.parent.refresh()
	},
	
	addExistingSystemicPart : function(object){
		this.notAdded = false
		this.cnt++
		this.selectedContainer.append(new ExistingBoneOrganField(this, object, this.dataToStore).container)
		this.parent.refresh()
	},
	
	addSystemicPart : function(object){
		this.notAdded = false
		this.cnt++
		this.selectedContainer.append(new BoneOrganField(this, object, this.dataToStore).container)
		this.parent.refresh()
	},	
}

var SingleBoneOrganAdder = function(){
	
	SystemicPartAdder.call(this, parent, existingBoneOrgans, dataToStore, dataSet)
}

SingleBoneOrganAdder.prototype = Object.create(SystemicPartAdder.prototype)


SingleBoneOrganAdder.prototype.checkAdding = function(){
	
	if(this.singleSelect){
		this.addSystemicPart(this.arr.getObjectByKey("uri", this.dataSet))
	} else {
		val = this.selector.val()
		this.addSystemicPart(this.arr.getObjectByKey("uri", this.arr.getObjectByKey("uri", val)))
	}
}



