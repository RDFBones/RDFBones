

var LabelEditor = function(){
	
	this.container = html.div("labelEditor")
	
	this.labelTitle = html.div("title").text("Label")
	this.labelValue = html.div("labelValue")
	this.container.append(this.labelTitle).append(this.labelValue)
	this.init()
}


LabelEditor.prototype = {
	
	init : function(){
	
		this.setWaiting(),
		$.ajax({
			url : baseUrl + "dataLoader",
			dataType: 'json',
			data : {
				queryType : "getLabel",
				individual : pageData.individual
			}
		}).done((function(msg){
			
			this.setLabel(msg[0].label)
			
		}).bind(this))
	},
	
	setWaiting : function(){
		
		this.labelValue.append(ImgUI.libImgSize("loading","inline","small"))
	},
	
	setLabel : function(labelValue){
		
		this.labelValue.empty().text(labelValue)
	},
}