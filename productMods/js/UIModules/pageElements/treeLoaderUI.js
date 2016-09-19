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
		return html.div("childrenContainer")
	},

	getClassNameDiv : function(classLabel) {
		return html.divT(classLabel).addClass("classLabel")
	},

	getSearchHitDiv : function() {
		return html.divT().addClass("searchHit classLabel")
	},

	getPlusImg : function() {
		var container = html.div("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.plus)
		return container.append(img)
	},

	getMinusImg : function() {
		var container = html.div("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.minus)
		return container.append(img)
	},

	addInstanceImg : function(classUri) {
		var container = html.div("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.addInstance)
		return container.append(img).click(function() {
			Controller.addNewBone(classUri)
		})
	},

	getLoadindGif : function(){
		var container = html.div("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.loadingGif).attr("width", "50px")
		return container.append(img)
	},
	
	getArrowImg : function() {
		var container = html.div("imgContainer1")
		var img = $("<img/>").attr("src", ImgSrc.arrows)
		return container.append(img)
	},

	getFillerDiv : function() {
		return html.div("imgContainer1")
	},
	
	getImageView : function(src){
		var link = $("<a/>").attr("href", src).attr("data-lightbox", "const").addClass("boneLink")
		return link.append(html.getImgClass(src, "boneImage"))
	}
}