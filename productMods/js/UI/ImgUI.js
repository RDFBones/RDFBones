

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