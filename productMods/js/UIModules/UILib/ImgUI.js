var folder = imgSrc
var ImgSrc = {
		add : this.folder + "add.png",
		arrows : this.folder + "arrows.png",
		backToParent : this.folder + "backToParent.png",
		close : this.folder + "close.png",
		del : this.folder + "del.png",
		done : this.folder + "done.png",
		done32 : this.folder + "done32.png",
		edit : this.folder + "edit.png",
		loading : this.folder + "loading.gif",
		minus : this.folder + "minus.png",
		modify : this.folder + "modify.png",
		ok : this.folder + "ok.png",
		plus : this.folder + "plus.png",
		jump : this.folder + "jump.png",
	}

var ImgUI = {
		
	previewImage : function(src, _class){
		return html.getPreviewImage(src, _class, Math.random())
	},
		
	libImg : function(type) {
		return html.getImg(ImgSrc[type])
	},

	libImg : function(type, _class) {
		return html.getImg(ImgSrc[type], _class)
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

	libImgCont : function(type, _class, size) {
		return ImgUI.generalImgCont(ImgSrc[type], _class, size)
	},

	/***************************************************************************
	 * General Img with container
	 **************************************************************************/

	generalImgCont : function(src) {
		return html.div().append(html.getImg(src))
	},

	generalImgCont : function(src, _class) {
		return html.getNewDiv(_class).append(html.getImg(src))
	},

	generalImgCont : function(src, _class, size) {
		return html.getNewDiv(_class).append(html.getImg(src, size + "Img"))
	}

}