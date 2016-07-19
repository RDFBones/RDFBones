var SingleBoneOrganAdder = function(dataSet, dataToStore){
	
	
	this.dataToStore = dataToStore
	//This defines the class structure
	this.dataSet = dataSet
	this.singleSelect = true
	
	this.container = html.div("margin3")
	this.selectorContainer = html.div("verticalMiddleInline")
	this.selectedContainer = html.div()
	this.title = html.div("inline").text(this.dataSet.label)
	this.addButton = new Button("add", (this.checkAdding).bind(this))
	this.init()
}

SingleBoneOrganAdder.prototype = {
	
	init : function(){
		this.setSelectorField()
		this.assemble()
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
	
	checkAdding : function(){

		var object
		if(this.singleSelect){
			object = this.dataSet
			this.selectedContainer.append(new BoneOrganField(this, object, this.dataToStore, true).container)
		} else {
			val = this.selector.val()
			object = this.arr.getObjectByKey("uri", val)
			this.selectedContainer.append(new BoneOrganField(this, object, this.dataToStore).container)
		}
	},
	
	reset : function(){
		
	}
}

var SystemicPartAdder = function(parent, dataToStore, dataSet){
	
	this.parent = parent
	this.generalBoneOrgans = []
	this.notAdded = true
	//Counter
	this.cnt = 0
	this.addedSubClasses = []
	this.existingContainer = html.div("margin10").hide()
	this.existingTitle = html.div("title").text("Existing Bone Organs")
    this.existingBones = html.div("subContainer")
	this.list = new Button("list", (this.selectExisting).bind(this)).hide()
	
	SingleBoneOrganAdder.call(this, dataSet, dataToStore)
}


SystemicPartAdder.prototype = Object.create(SingleBoneOrganAdder.prototype)

$.extend(SystemicPartAdder.prototype, {
	
	init : function(){
		this.setSelectorField()
		this.checkExisting()
		this.assemble()
	},
		
	assemble : function(){
		UI.assemble(this.container, [
         			this.selectorContainer,
         				this.title,
         				this.selector,
         				this.addButton.container,
         				this.list.container, 
         			this.existingContainer,
         			 	this.existingTitle,
         			 	this.existingBones,
         			this.selectedContainer],
         			[0, 1, 1, 1, 1, 0, 1, 1, 0])
	},
	
	
	checkExisting : function(){
		
		if(typeof this.dataSet.existing != "undefined"){
			if(this.dataSet.existing.length > 0){			
				this.list.show()
			}		
		}
	
	},
	
	addAll : function(){
		
		if(!this.singleSelect){
			
			if(this.generalBoneOrgan != null){
				this.generalBoneOrgan.deleteRoutine()
			}
			//Check if we do not have 
			$.each(this.dataSet.subClasses, (function(i, scl){
				this.checkAdding(true, scl.uri)	
			}).bind(this))	
		} else {
			this.checkAdding(true)	
		}
	},
	
	checkAdding : function(without, val){
		
		if(this.singleSelect){
			if(this.cnt < this.max){
				this.addSystemicPart(this.dataSet, without)
				this.selectorContainer.hide()
				return true
			}
		} else {
			//Check the number of element
			if(val === undefined){
				val = this.selector.val()
			}
			if(this.cnt == this.max){
				if(without === undefined){
					alert("You are allowed to add maximal " + this.cnt + " bone organs!")
					return false
				}
			} else if  (this.addedSubClasses.indexOf(val) != -1){
				if(without === undefined){
					alert("You are allowed to add only one from this bone organ!")
					return false
				}
			} else {
				
				if(val != this.dataSet.uri){
					this.addedSubClasses.push(val)
				}
				this.addSystemicPart(this.arr.getObjectByKey("uri", val), without)
				//If it was the last
				if(this.cnt == this.max && this.generalBoneOrgans.length == 1){
					//Check if we 
					this.generalBoneOrgans[0].deleteRoutine()
					$.each(this.dataSet.subClasses, (function(i, scl){
						if(this.addedSubClasses.indexOf(scl.uri) == -1){
							this.addSystemicPart(scl)
						}
					}).bind(this))
				}
				return true
			}
		}
	},
	
	
	checkAddingExisting : function(data){
		
		//Check if it is already add
		if(this.singleSelect){
			this.addExistingSystemicPart(data)
			return true
		} else {
			if(this.cnt == this.max){
				if(without === undefined){
					alert("You are allowed to add maximal " + this.cnt + " bone organs!")
					return false
				}
			} else if  (this.addedSubClasses.indexOf(data.uri) != -1){
				if(without === undefined){
					alert("You are allowed to add only one from this bone organ!")
					return false
				}
			} else {
				
				if(data.boneOrgan != this.dataSet.uri){
					this.addedSubClasses.push(data.uri)
				}
				this.addExistingSystemicPart(this.arr.getObjectByKey("uri", data.uri), without)
				//If it was the last
				if(this.cnt == this.max && this.generalBoneOrgans.length == 1){
					//Check if we 
					this.generalBoneOrgans[0].deleteRoutine()
					$.each(this.dataSet.subClasses, (function(i, scl){
						if(this.addedSubClasses.indexOf(scl.uri) == -1){
							this.addSystemicPart(scl)
						}					
					}).bind(this))
				}
				return true
			}
		}

	},
	
	reset : function(uri, generalBoneOrgan){
		
		this.generalBoneOrgans.removeElement(generalBoneOrgan)
		this.addedSubClasses.removeElement(uri)
		if(this.singleSelect){
			this.selectorContainer.show()
		}
		this.cnt--
		if(this.cnt == 0){
			this.notAdded = true
		}
		this.notComplete = true
		this.parent.refresh()
	},
	
	addExistingSystemicPart : function(object){
		
		this.notAdded = false
		this.cnt++
		if(object.uri === this.dataSet.uri){
			this.generalBoneOrgans.push(new ExistingBoneOrganField(this, object, this.dataToStore, true))
			this.selectedContainer.append(this.generalBoneOrgan[this.generalBoneOrgan.length - 1].container)
		} else {
			this.selectedContainer.append(new ExistingBoneOrganField(this, object, this.dataToStore).container)
		}
		if(typeof without === "undefined"){
			this.addCheck()
		}	
	},
		
	addSystemicPart : function(object, without){
		this.notAdded = false
		this.cnt++
		if(object.uri === this.dataSet.uri){
			this.generalBoneOrgans.push(new BoneOrganField(this, object, this.dataToStore, true))
			this.selectedContainer.append(this.generalBoneOrgans[this.generalBoneOrgans.length - 1].container)
		} else {
			this.selectedContainer.append(new BoneOrganField(this, object, this.dataToStore).container)
		}
		if(without === undefined){
			this.addCheck()
		}		
	},
	
	addCheck : function(){
		if(this.cnt == this.max){
			this.notComplete = false
		}
		this.parent.refresh()
	},
	
	selectExisting : function(){
		
		var existing = []
		$.each(this.dataSet.existing, (function(i, ex){
			existing.push(new ExistingEntry(this, ex).container)
		}).bind(this))
		this.existingContainer.append(existing).show()
	},
	
	closeExisting : function(data){
		
		this.dataSet.existing.removeElement(data)
		this.existingContainer.hide()
	}
})


ExistingEntry = function(systemicPartAdder, data){

	this.sysAdder = systemicPartAdder
	this.data = data
	this.container = html.div("inline margin5").text(data.label)
	this.addButton = new Button("add", (this.add).bind(this))
	this.container.append(this.addButton.container)
}

ExistingEntry.prototype = {
		
	add : function(){
		this.data.type = "existing"
		if(this.sysAdder.checkAddingExisting(this.data)){
			this.container.remove()
			this.sysAdder.closeExisting(this.data)
		} 
	}
}






