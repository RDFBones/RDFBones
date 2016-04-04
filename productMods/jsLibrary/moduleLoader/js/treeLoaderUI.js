var treeUI = {

	/***************************************************************************
	 * Complete Incomplete Decision
	 **************************************************************************/

	getCompIncomp : function(){
		var middleDiv = html.getMiddleDiv()
	},
	
	classViewerId : "classViewer",
	classViewer : $("#classViewer"),

	getChildrenContainer : function() {
		return html.getNewDiv("childrenContainer")
	},

	getClassNameDiv : function(classLabel) {
		return html.getNewDivT(classLabel).addClass("classLabel")
	},

	getSearchHitDiv : function() {
		return html.getNewDivT().addClass("searchHit classLabel")
	},

	getPlusImg : function() {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.plus)
		return container.append(img)
	},

	getMinusImg : function() {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.minus)
		return container.append(img)
	},

	addInstanceImg : function(classLabel) {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.addInstance)
		return container.append(img).click(function() {
			Controller.addBone(classLabel)
		})
	},

	getLoadindGif : function(){
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.loadingGif).attr("width", "50px")
		return container.append(img)
	},
	
	getArrowImg : function() {
		var container = html.getNewDiv("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.arrows)
		return container.append(img)
	},

	getFillerDiv : function() {
		return html.getNewDiv("imgContainer1")
	},
	
	getImageView : function(src){
		var link = $("<a/>").attr("href", src).attr("data-lightbox", "const").addClass("boneLink")
		return link.append(html.getImgClass(src, "boneImage"))
	}
}