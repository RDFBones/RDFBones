var folder = imgSrc
var ImgSrc = {
		add : this.folder + "add.png",
		arrows : this.folder + "arrows.png",
		backToParent : this.folder + "backToParent.png",
		close : this.folder + "close.png",
		del : this.folder + "del.png",
		done : this.folder + "done.png",
		done32 : this.folder + "done32.png",
		check : this.folder + "check-mark.png",
		edit : this.folder + "edit.png",
		home : this.folder + "home.png",
		jump : this.folder + "jump.png",
		list : this.folder + "list.png",
		loading : this.folder + "loading.gif",
		loading2 : this.folder + "loading2.gif",
		minus : this.folder + "minus.png",
		modify : this.folder + "modify.png",
		ok : this.folder + "ok.png",
		ok1 : this.folder + "ok1.png",
		okk : this.folder + "okk.png",
		plus : this.folder + "plus.png",
		waitBar : this.folder + "waitBar.gif",
		bin : this.folder + "rubbish-bin.png",
	}

var ImgUI = {
		
	previewImage : function(src, _class){
		return html.getPreviewImage(src, _class, Math.random())
	},
		
	libImg : function(type) {
		return html.img(ImgSrc[type])
	},

	libImg : function(type, _class) {
		return html.img(ImgSrc[type], _class)
	},

	libSize : function(type, size){
		return html.img(ImgSrc[type], size + "Img")
	},
	
	/***************************************************************************
	 * Horizontal Lib Img
	 **************************************************************************/

	horizontalLibImg : function(type) {
		return ImgUI.libImgCont(type, "horizontalMiddle")
	},

	horizontalLibImg : function(type, size) {
		return ImgUI.libImgCont(type, "horizontalMiddle", size)
	},

	horizontalGeneralImg : function(type, size) {
		return ImgUI.generalImgCont(type, "horizontalMiddle", size)
	},
	
	/***************************************************************************
	 * Lib Img with container
	 **************************************************************************/

	libImgCont : function(type) {
		return ImgUI.generalImgCont(ImgSrc[type])
	},

	libImgCont : function(type, _class) {
		return ImgUI.generalImgCont(ImgSrc[type], _class)
	},

	libImgSize : function(type, _class, size) {
		return ImgUI.generalImgCont(ImgSrc[type], _class, size)
	},
	
	libImgWidth : function(type, _class, width){
		return html.div(_class).append(html.img(ImgSrc[type]).attr("width", width + "px"))
	},
	
	/***************************************************************************
	 * General Img with container
	 **************************************************************************/

	generalImgCont : function(src) {
		return html.div().append(html.img(src))
	},

	generalImgCont : function(src, _class) {
		return html.div(_class).append(html.img(src))
	},

	generalImgCont : function(src, _class, size) {
		return html.div(_class).append(html.img(src, size + "Img"))
	},

	/***************************************************************************
	 * Loading gifContainer
	 **************************************************************************/

	waitGif : function(){
		return html.div("mainFormLoadingContainer").append(this.gif("100px"))
	},
	
	subWaitGif : function(){
		return html.div("subFormLoadingContainer").append(this.gif())
	},
	
	gif : function(size){
		size = util.setUndefined(size, "50px")
		return html.div("horizontalMiddle").append(html.imgHeight(ImgSrc.loading, size))
	}
}