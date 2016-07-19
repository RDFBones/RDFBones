var SingleBoneOrganAdder = function(dataSet, dataToStore){
	
	
	this.dataToStore = dataToStore
	//This defines the class structure
	this.dataSet = dataSet
	this.singleSelect = true
	
	this.container = html.div("margin3")
	this.selectorContainer = html.div("verticalMiddleInline")
	this.selectedContainer = html.div()
	this.title = html.div("inline").text(this.dataSet.label)
	this.addButton = new Button("add", (this.addSystemicPart).bind(this))
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
	
	addSystemicPart : function(){

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
	this.existingGeneralBoneOrgan = false
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
	
	reset : function(uri, generalBoneOrgan, existingEntry){
		
		if(existingEntry != undefined){
			//Place It back to the container
			this.existingContainer.append(existingEntry.container)
		}
		
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

	addSystemicPart : function(data, without){
		
		//Check if it is already add

		if(this.singleSelect){
			this.selectedContainer.append(new BoneOrganField(this, this.dataSet, this.dataToStore, true))
			this.selectorContainer.hide()
			return true
		} else {
			
			var type 
			if(data === undefined){
				type = this.selector.val()
			} else {
				if(DataLib.getType(data) == "object"){
					type = data.mst
				} else if(DataLib.getType(data) == "data"){
					type = data
				}
			}
			
			if(this.cnt == this.max){
				if(without === undefined){
					alert("You are allowed to add maximal " + this.cnt + " bone organs!")
					return false
				}
			} else if  (this.addedSubClasses.indexOf(type) != -1 ){
				
				if(without === undefined){
					alert("You are allowed to add only one from this bone organ!")
					return false
				}
			} else {
				
				if(type === this.dataSet.uri){ //General 
					
					if(data !== undefined){ //Existing
						//Check if only one specific is missing
						if(this.addedSubClasses.length == this.dataSet.subClasses - 1 ){
							//Error
							alert("You can add only the last missing specific bone organ!")
							return false
						} else {
						//Add the existing
							this.cnt++
							var existing = new AddedExistingBoneOrganField(this, data, this.dataToStore, true)
							this.generalBoneOrgans.push(existing)
							this.existingGeneralBoneOrgan = true
							this.selectedContainer.append(existing.container)
						}
					} else { //New 
						
						this.cnt++
						if(this.addedSubClasses.length == this.dataSet.subClasses - 1 ){
							//We do not add the general but the specific instead
							$.each(this.dataSet.subClasses, (function(i, scl){
								if(this.addedSubClasses.indexOf(scl.uri) == -1){
									//Add the remaining specific
									this.addedSubClasses.push(scl.uri)
									var tmp = this.dataSet.subClasses.getObjectByKey("uri", scl.uri)
									this.selectedContainer.append(new BoneOrganField(this, this.dataSet, this.dataToStore, true).container)
									return false
								}
							}).bind(this))
						} else { //Add 
							
							this.generalBoneOrgans.push(new BoneOrganField(this, this.dataSet, this.dataToStore, true))
							this.selectedContainer.append(this.generalBoneOrgans[this.generalBoneOrgans.length - 1].container)
						}
					}

				} else {  //Specific 

					this.addedSubClasses.push(type)
					if(DataLib.getType(data) == "object"){ //Existing

						//Check if there are general element that has to be now specific
						if(!this.checkRemainingSpecific(false)){
							return false
						}
						//Add
						this.selectedContainer.append(new AddedExistingBoneOrganField(this, data, this.dataToStore, true).container)
					} else { //New

						if(!this.checkRemainingSpecific(false)){
							return false
						}
						//Add
						var tmp = this.dataSet.subClasses.getObjectByKey("uri", type)
						this.selectedContainer.append(new BoneOrganField(this, tmp, this.dataToStore, true).container)
					}
				}
				if(without === undefined){
					this.addCheck()
				}
				this.notAdded = false
				this.parent.refresh()
				return true
			}
		}

	},
	
	
	checkRemainingSpecific : function(existing){
		
		if(this.addedSubClasses.length == this.dataSet.subClasses.length - 1 && this.generalBoneOrgans.length == 1){
			//We have to remove the already added general and add instead of the remaining specific
			if(this.existingGeneralBoneOrgan = true){
				alert("You can add a specific bone in this case")
				return false 
			} else {
				this.generalBoneOrgans[0].deleteRoutine()
				$.each(this.dataSet.subClasses, (function(i, scl){
					if(this.addedSubClasses.indexOf(scl.uri) == -1){
						this.addSystemicPart(scl.uri)
					}
				}).bind(this))
			}
		}
		return true
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
	this.container = html.div("margin5").text(data.label)
	this.addButton = new Button("add", (this.add).bind(this))
	this.container.append(this.addButton.container)
}

ExistingEntry.prototype = {
		
	add : function(){
		this.data.type = "existing"
		if(this.sysAdder.addSystemicPart(this.data)){
			this.container.remove()
			this.sysAdder.closeExisting(this.data)
		} 
	}
}






