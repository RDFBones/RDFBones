


var SkeletalRegionEditor = function(){
	
	
	this.container = html.div()
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
				.disable()
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
				.bind(this), "rightAligned")

	this.subContainer = html.div("subContainer")

	this.dataToStore = []
}


SkeletalRegionEditor.prototype = {
		
	assemble : function(){
		
		UI.assemble(this.container,[
		      this.boneDivisionContainer,
		      this.saveContainer,
		      	this.saveButton, 
		      	this.cancelButton]
		      [0, 0, 1, 1])
	},
	
	laadBoneDivision : function(){
	
		this.boneDivisionEditors = []
		$.each(pageData.systemicClasses, (function(index, value){
			//Here we get the existingValue
			
			if(pageData.existingSkeletalRegion != undefined){
				existingBoneDivision = pageData.existingSkeletalRegion.getObjectByKey("uri", value.uri)
				this.boneDivisionEditors.push(new BoneDivisionEditor(value, this, existingBoneDivision))	
			} else {
				this.boneDivisionEditors.push(new BoneDivisionEditor(value, this))	
			}
			
		}).bind(this))
		buf = []
		$.each(pageData.boneDivisionEditors, function(i, val){
			buf.push(val.container)
		})
		this.boneDivisionContainer.append(buf)
	}, 
}

