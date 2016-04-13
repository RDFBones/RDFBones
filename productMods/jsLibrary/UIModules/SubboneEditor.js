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
	this.container.append(this.getTreeStructureContainer())
	this.container.append(this.getChildBoneViewer())
	this.container.append(this.getNewLine())
}

SubboneEditor.prototype.getTreeStructureContainer = function(){
	this.treeStructure = html.getNewDiv("container")
	return this.treeStructure
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

SubboneEditor.prototype.show = function(data){

	//Search uri in treeStructure
	this.boneData = data
	console.log(this.boneData)
	if(data.classUri == "http://purl.obolibrary.org/obo/FMA_53672" ||
			data.classUri == "http://purl.obolibrary.org/obo/FMA_53673"){
		var _this = this
		this.container.show()
		this.treeStructure.empty() 
		this.treeStructure.append(this.waitingGif)
		this.childBoneViewer.empty()
		$.each(treeStructure, function(index,value){
			if(value.uri == data.classUri){
				_this.systemicClasses = value.children
			}
		})
		if(data.systemicParts == null){
			DataController.getQuery(
					"systemicParts", this.boneData, this)
		} else {
			this.loadSystemicList()
		}
	} else {
		this.container.hide()
	}
}

SubboneEditor.prototype.loadSystemicList = function(){
	this.waitingGif.remove()
	var _this = this
	$.each(this.systemicClasses, function(index, systemicClass){
		//editor.treeStructure.append(new ChildStructure(child, editor, true))
		_this.treeStructure.append(_this.addClass(systemicClass))
	})
}

SubboneEditor.prototype.numberOfBone = function(classUri){
	var cnt = 0
	$.each(this.boneData.systemicParts, function(index, value){
		if(value.classUri == classUri){
			cnt++;
		}
	})
	return cnt
}

SubboneEditor.prototype.addClass = function(_class){
	var _this = this
	return html.getNewDiv("listContainer")
		.text(_class.label +" ("+ this.numberOfBone(_class.uri) +")")
		.click(function(){
			_this.showBone(_class)
		})
}

SubboneEditor.prototype.showBone = function(_class){
	var _this = this
	this.childBoneViewer.empty()
	if(!this.searchParentTree(this.boneData, _class.uri)){
		this.childBoneViewer.append(
				html.getNewDivT("There is no " + _class.label).addClass("noEntryContainer"))
	}
	this.childBoneViewer.append(
		html.getNewDivT("Add")
			.addClass("button1")
			.click(function(){
				DataController.addSystemicPart(_this.boneData, _class.uri)
			}))
}

SubboneEditor.prototype.searchParentTree = function(element, uri){
	var found = false
	var childrenFound = false
	var _this = this
	if(element.systemicParts != null){
		$.each(element.systemicParts, function(index, child){
			if("systemicParts" in child){
				childrenFound = _this.searchParentTree(child, uri)
			}
			if(childrenFound){
				found = true
			}
			if(child.classUri == uri){
				//If a bone exist of the class we have to be able to click on it
				_this.childBoneViewer.append(_this.childBoneContainer(child))
				found = true
			}
		})
		return found
	} else {
		return false;
	}
}

SubboneEditor.prototype.childBoneContainer = function(data){
	
	var container = html.getNewDiv("entryContainer")
	var labelDiv = html.getNewDiv("floatLeft").text(data.label)
		.click(function(){
			UIController.modules["boneEditor"].show1(data)
		})
	var deleteButton = html.getImgClass(ImgSrc.del16, "floatRight")
			.click(function(){
				container.remove()
				DataController.deleteSystemic(data);
			})
	var newLine = UI.getNewLine()
	container
		.append(labelDiv)
		.append(deleteButton)
		.append(newLine)
	return container
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
