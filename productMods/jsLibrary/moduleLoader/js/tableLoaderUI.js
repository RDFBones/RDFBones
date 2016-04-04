/***************************************************************************
 * Here are the classes added, which about we do not care in the loader.js
 **************************************************************************/
var tableUI = {

	getEditButton : function(data){
		return html.getImg(ImgSrc.edit).click(function(){
			UIController.modules["boneEditor"].show1(data)
		})
	},
		
	getColumnTitle : function(title){
		return html.getNewDiv("columnTitle").text(title)
	},
	
	getRowContainer : function(){
		return html.getNewDiv("rowContainer")
	},
		
	getColumnDiv : function(value) {
		return html.getNewDiv("columnContainer").append(
				html.getNewDiv("columnContent").text(value))
	},

	getImageContainer : function() {
		// We need a constant div at first the
		return html.getNewDiv("columnContainer").
					append(html.getNewDiv("imagesOuterContainer").
						append(html.getNewDiv("imagesInnerContainer")))
	},

	getImg : function(src, index) {
		return html.getNewDiv("imgContainer").append(
				html.getPreviewImage(testImgSource + src, "previewImg",index))
	},
	
	getEditImg : function(src, index){
		return html.getNewDiv("imageContainer")
				.append(html.getPreviewImage(testImgSource + src, "previewImg", index))
				.append(html.getNewDiv("imgCheckBoxContainer")
						.append(html.getCheckBox()))
	/*	<div class = "imageContainer">
			<img src="" class = "image">
			<div class = "imgCheckBoxContainer">
				<input type = "checkbox"/>
			</div>	
		</div> 	*/
	},
	
	getNewLineDiv : function() {
		return html.getNewDiv("newLine")
	},
}