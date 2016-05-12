/*******************************************************************************
 * ChildStructure
 ******************************************************************************/
var SubboneEditor = function(boneEditor){
	this.boneEditor = boneEditor
	// The definition of the tree structure
	this.container = html.getNewDiv()
	this.waitingGif = new AdaptiveWaitingGif()
	this.container.append(this.getTitleDiv("Systemic parts"))
	this.container.append(this.getNewLine())
	this.container.append(this.getCompleteMsg())
	this.container.append(this.getCompleteCheckBox())
	this.container.append(this.getNewLine())
	this.container.append(this.getTreeStructureContainer())
	this.container.append(this.getChildBoneViewer())
	this.container.append(this.getNewLine())
}

SubboneEditor.prototype.getTreeStructureContainer = function(){
	this.treeStructure = html.getNewDiv("container")
	return this.treeStructure
}

SubboneEditor.prototype.getCompleteMsg = function(){
	this.completeMsg = html.getNewDiv("completeSelector").text("The bone is complete!")
	return this.completeMsg
}

SubboneEditor.prototype.getCompleteCheckBox = function(){
	_this = this
	this.completeCheckBox = html.getCheckBox().addClass("completeSelector")
				.change(function(event){
					checkbox = event.target
					if (checkbox.checked) {
						_this.setToComplete()
					} 
				})
	var valueDiv = html.getNewDiv("completeSelector").text("Add all")
	this.completeCheckBoxContainer =  html.getNewDiv()
										.append(valueDiv)
										.append(html.getNewDiv("completeSelector")
												.append(this.completeCheckBox))
	return this.completeCheckBoxContainer
}

SubboneEditor.prototype.setToComplete = function(){
	_this = this
	this.completeCounter = 0
	this.setWaiting()
	var classList = []
	var counter = 0
	$.each(this.systemicClasses, function(index, systemicClass){
		if(systemicClass.systemicParts.length == 0){
			counter++;
			classList.push(systemicClass.classUri)
		}
	})
	this.addSystemicParts(classList, this)
}

SubboneEditor.prototype.addSystemicParts = function(list, editor){
	var classUri = list.shift()
	$.ajax({
		url : baseUrl + "skeletalInventoryData",
		data : {
			dataOperation : "systemic",
			parentUri : editor.boneData.uri,
			classUri : classUri,
			label : "Default",
		}
		}).done(function(msg){
			var result = $.parseJSON(msg)
			editor.boneData.systemicParts.
				push(DataController.boneObject(editor.boneData, result))
			if(list.length > 0){
				SubboneEditor.prototype.addSystemicParts(list, editor)
			} else{
				editor.show(editor.boneData)
			}
		})
}

SubboneEditor.prototype.getTitleDiv = function(title) {
	this.titleDiv = html.getNewDiv("moduleTitle").text(title)
	return this.titleDiv
}

SubboneEditor.prototype.getNewLine = function() {
	return html.getNewDiv("newLine")
}

SubboneEditor.prototype.getChildBoneViewer = function(){
	this.childBoneViewer = html.getNewDiv("container")
	return this.childBoneViewer
}

SubboneEditor.prototype.show = function(data, justRefresh){

	//Search uri in treeStructure
	this.boneData = data
	console.log(this.boneData)
	if(data.classUri == "http://purl.obolibrary.org/obo/FMA_53672" ||
			data.classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
		this.container.show()
		this.treeStructure.empty() 
		this.treeStructure.append(this.waitingGif)
		this.childBoneViewer.empty()
		var systemicClasses = new Object()
		$.each(treeStructure, function(index,value){
			if(value.uri == data.classUri){
				 $.each(value.children,function(index, child){
					 systemicClasses[child.uri] = new Object()
					 systemicClasses[child.uri].label = child.label
					 systemicClasses[child.uri].classUri = child.uri
					 systemicClasses[child.uri].systemicParts = []
				 })
				 return false
			}
		})
		this.systemicClasses = systemicClasses			

		if(data.systemicParts == null){
			DataController.getQuery(
					"systemicParts", this.boneData, this)
		} else {
			this.loadSystemicParts()
			this.loadSystemicList()
		}
	} else {
		this.container.hide()
	}
}

SubboneEditor.prototype.loadSystemicParts = function(){
	var _this = this
	console.log("LoadSystemicParts")
	console.log(this.systemicClasses)
	console.log("Bonedata")
	console.log(_this.boneData)
	var complete
	$.each(this.systemicClasses, function(key, systemicClass){
		console.log(key)
		complete
		$.each(_this.boneData.systemicParts, function(index, systemic){
			console.log(systemic.classUri)
			if(systemic.classUri === systemicClass.classUri){
				console.log("Added")
				systemicClass.systemicParts.push(systemic)
			}
		})
	})
}

SubboneEditor.prototype.loadSystemicList = function(){
	this.waitingGif.remove()
	var _this = this
	//
	this.completeMsg.show()
	this.completeCheckBox.prop("checked", false)
	this.completeCheckBoxContainer.hide()
	$.each(this.systemicClasses, function(classUri, systemicClass){
		if(systemicClass.systemicParts.length == 0){
			_this.completeMsg.hide()
			_this.completeCheckBoxContainer.show()
			return false
		}
	})
	
	$.each(this.systemicClasses, function(classUri, systemicClass){
		_this.treeStructure.append(_this.addSystemicClass(systemicClass))
	})
	
}

SubboneEditor.prototype.addSystemicClass = function(_class){
	var _this = this
	return html.getNewDiv("listContainer")
		.text(_class.label +" ("+ _class.systemicParts.length +")")
		.click(function(){
			_this.showBone(_class)
		})
}

SubboneEditor.prototype.showBone = function(_class){
	var _this = this
	this.childBoneViewer.empty()
	if(_class.systemicParts.length == 0){
		this.childBoneViewer.append(
				html.getNewDivT("There is no " + _class.label).addClass("noEntryContainer"))
	} else {
		$.each(_class.systemicParts, function(index, systemicPart){
			_this.childBoneViewer.append(_this.childBoneContainer(systemicPart))
		})
	}
	this.childBoneViewer.append(
		html.getNewDivT("Add")
			.addClass("button1")
			.click(function(){
				DataController.addSystemicPart(_this.boneData, _class.classUri)
			}))
}

SubboneEditor.prototype.childBoneContainer = function(data){
	_this = this
	var container = html.getNewDiv("entryContainer")
	var labelDiv = html.getNewDiv("floatLeft").text(data.label)
		.click(function(){
			UIController.modules["boneEditor"].show1(data)
		})
	var deleteButton = html.getImgClass(ImgSrc.del16, "floatRight")
			.click(function(){
				console.log("Data")
				console.log(data)
				container.remove()
				_this.setWaiting()
				$.ajax({
					url : baseUrl + "skeletalInventoryData",
					data : {
						dataOperation : "deleteSystemic",
						parentUri : data.parent.uri,
						boneUri : data.uri,
						label : data.label,
					}
				}).done(function(){
					//Remove data from the dataset
					var indexToDelete = []
					$.each(data.parent.systemicParts, function(index, value){
						if(value.uri === data.uri){
							console.log("stimmt")
							data.parent.systemicParts.splice(index, 1)
							return false
						}
					})
					console.log(data)
					_this.resetTree()
				})
			})
	var newLine = UI.getNewLine()
	container
		.append(labelDiv)
		.append(deleteButton)
		.append(newLine)
	return container
}

SubboneEditor.prototype.setWaiting = function(){
	this.treeStructure.empty() 
	this.treeStructure.append(this.waitingGif)
}

SubboneEditor.prototype.resetTree = function(){
	_this.show(_this.boneData)
}


/*******************************************************************************
 * ChildStructure
 ******************************************************************************/
var ChildStructure = function(parentData, editor, start){

	this.container = this.getChildrenContainer()
	this.classNameNameContainer = this.getClassNameDiv()
	// Classname div
	
	this.classNameDiv = this.getClassNameDiv(parentData.label).
		click(function(){
			editor.showBone(parentData)
		})
	// Flag
	var hasChild = false
	if("children" in parentData){
		if(parentData.children.length > 0){
			// PlusImg
			this.plusImage = this.getPlusImg().click(function() {
				$(this).hide()
				this.minusImage.show()
				this.childrenContainer.show()
			})
			// MinusImg
			this.minusImage = this.getMinusImg().click(function() {
				$(this).hide()
				this.plusImage.show()
				this.childrenContainer.show()
			}).hide()
			// ClassName
			this.classNameDiv = this.getClassNameDiv(parentData.label)
			this.childrenContainer = this.getChildrenContainer()
			var cC = this.childrenContainer
			$.each(parentData.children, function(index, child){
				cC.append(new ChildStructure(child, editor))
			})
			this.container
				.append(this.classNameNameContainer
					.append(this.minusImage)
					.append(this.plusImage)
					.append(this.classNameDiv))
				.append(this.childrenContainer)
			// Set the flag
			hasChild = true
		}
	}
	if(!hasChild){
		var fillerDiv = this.getFillerDiv()
		this.container.append(this.classNameNameContainer
						.append(fillerDiv)
						.append(this.classNameDiv))
	}
	//appendTo.append(this.container)
	return this.container
}


ChildStructure.prototype.getClassNameDiv = function(classLabel) {
	return html.getNewDivT(classLabel)
}

ChildStructure.prototype.getPlusImg = function() {
	var container = html.getNewDiv("imgContainer1")
	var img = $("<img/>").attr("src", treeUI.plusImgSrc)
	return container.append(img)
}

ChildStructure.prototype.getMinusImg = function() {
	var container = html.getNewDiv("imgContainer1")
	var img = $("<img/>").attr("src", treeUI.minusImgSrc)
	return container.append(img)
}

ChildStructure.prototype.getChildrenContainer = function() {
	return html.getNewDiv("listContainer")
}

ChildStructure.prototype.getFillerDiv = function() {
	return html.getNewDiv("imgContainer1")
}

ChildStructure.prototype.getImageView = function(src){
	var link = $("<a/>").attr("href", src).attr("data-lightbox", "const").addClass("boneLink")
	return link.append(html.getImgClass(src, "boneImage"))
}
