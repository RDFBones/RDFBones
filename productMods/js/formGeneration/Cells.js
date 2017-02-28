
var LiteralCell = function(data, descriptor){
	
	this.container = html.div("columnContainer").text(data[descriptor.dataKey])
}

var ImagesCell = function(data, descriptor){
	
	this.container = html.div("columnContainer")
	if(data.images === undefined || data.images.length == 0){
		this.container.text("There are no image uploaded")
	} else {
		imgCode = Math.random();
		images = []
		$.each(data.images, (function(i, img){
			var src = baseurl + img.src;
			this.images.push(html.getPreviewImage(src, "boneImage", imgCode))
		}).bind(this))
		this.container.append(images)
	}
}

