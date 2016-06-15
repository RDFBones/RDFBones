

var SystemicPartSelector = function(classSelector, dataSet, dataToStore){
	
	this.container = html.div("selectorContainer")
	this.subContainer = html.div("subContainer")
	this.classSelector = UI.classSelector(dataSet)
	this.assemble()
}


SystemicPartSelector.prototype = {

	
	assemble : function(){
		this.container
			.append(html.div("title").text(this.title))
			.append(this.classSelector)
			.append(this.subContainer)
	},
	
	returnFunction : function(){
		
		//Search for the selected class
		$.each(this.dataSet, (function(index, value){
			if(value.uri == this.classSelector.val()){
				this.subContainer.append(new BoneSegmentField(value))
			}
		}).bind(this))	
	}
}