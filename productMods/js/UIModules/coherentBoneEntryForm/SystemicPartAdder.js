


var SystemicPartAdder = function(parent, dataToStore, dataSet){
	
	this.parent = parent
	
	
	this.dataToStore = dataToStore
	//This defines the class structure
	this.dataSet = dataSet

	
	/*
	 * The dataSet input parameter can have a existingToSelect field as well
	 * We care about later.
	 */
	
	this.notAdded = true
	//Counter
	this.cnt = 0
	this.addedSubClasses = []
	this.singleSelect = true
	
	this.container = html.div()
	this.selectorContainer = html.div("inlineContainer")
	this.selectedContainer = html.div()
	this.title = html.div("inline").text(this.dataSet.label)
	this.addButton = new Button("add", (this.checkAdding).bind(this))
	this.list = new Button("list", (this.selectExisting).bind(this)).hide()
	this.setSelectorField()
	this.checkExisting()
	this.checkOfferExisting()
	this.assemble()
}


SystemicPartAdder.prototype = {
		

	assemble : function(){
		UI.assemble(this.container, [
         			this.selectorContainer,
         				this.title,
         				this.selector,
         				this.addButton.container,
         				this.list.container, 
         			this.selectedContainer],
         			[0, 1, 1, 1, 1, 0])
	},
	
	setSelectorField : function(){
		
		if(this.dataSet.subClasses != undefined){
			this.singleSelect = false
			/*
			 * Here we assemble the selector 
			 */
			this.arr = this.dataSet.subClasses.slice()
			this.object = {
				uri : this.dataSet.uri,
				label : this.dataSet.label,
			}
			this.arr.unshift(this.object)	
			this.selector = UI.classSelector(this.arr)
			this.max = this.dataSet.subClasses.length
		} else {
			this.max = 1
		}
	},
	
	checkExisting : function(){
		
		if(this.parent.descriptor.existing != undefined){

			this.existingBoneOrgans = []
			if(this.singleSelect){
				var obj = this.parent.descriptor.existing.systemicParts.getObjectByKey("uri", this.dataSet.uri)
				if(obj != null){
					this.existingBoneOrgans.push(obj)
					this.addExistingSystemicPart(match)
					this.selectorContainer.hide()
				}	
			} else {
				var obj = this.parent.descriptor.existing.systemicParts.getObjectByKey("uri", this.dataSet.uri)
				if(obj != null){
					this.existingBoneOrgans.push(obj)
					this.addExistingSystemicPart(match)
				}
				
				object = DataLib.joinTables(
						this.parent.descriptor.existing.systemicParts, "type",
						this.dataSet.subClasses, "uri")
				//Fill the existing part array
				$.each(object, (function(i, obj){
					this.addedSubClasses.push(obj.type)
					this.addExistingSystemicPart(obj)
				}).bind(this))				
			}
		}
	},
	

	checkOfferExisting : function(){
		
		if(this.parent.descriptor.existingToSelect != undefined){
			
			if(this.singleSelect){
				tmp = []
				tmp.push(this.dataSet)
				this.dataToOffer = DataLib.joinTables(this.parent.descriptor.existingToSelect, "type", tmp, "uri")
			} else {
				this.dataToOffer = DataLib.joinTables(this.parent.descriptor.existingToSelect, "type", this.arr, "uri")
			}
			if(this.dataToOffer.length > 0){
				this.list.show()
			}
		} 
	},
	
	addAll : function(){
		
		if(this.singleSelect){
			checkAdding(true)
		} else {
			this.selector.val(this.object.uri)
			checkAdding(true)
		}
	},
	
	checkAdding : function(without){
		
		if(this.singleSelect){
			this.addSystemicPart(this.dataSet)
			this.selectorContainer.hide()
		} else {
			//Check the number of element
			val = this.selector.val()
			if(this.cnt == this.max){
				if(without === undefined){
					alert("You are allowed to add maximal " + this.cnt + " bone organs!")
				}
			} else if  (this.addedSubClasses.indexOf(val) != -1){
				if(without === undefined){
					alert("You are allowed to add only one from this bone organ!")
				}
			} else {
				if(val != this.dataSet.uri){
					if(without === undefined){
						console.log(this.addedSubClasses)
					}
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
	
	
	selectExisting : function(){
		console.log(this.dataToOffer)
	}
	
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



