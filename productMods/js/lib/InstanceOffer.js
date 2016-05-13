
var InstanceOffer = function(){

	//It creates a table and the
	console.log(this)
	this.getDataToOffer()
}

InstanceOffer.prototype = {

	//In the instanceoffer 
	getDataToOffer : function(){
		var _this = this
		$.ajax({
			url : baseUrl + "ajaxQuery",
			data : {
				subject : subjectUri,
				dataOperation : _this.dataOperation,
			}
		}).done((function(results){

			var result = $.parseJSON(results)
			if(result.constructor === Array){
				this.showData(result)
			} else {
				this.showNoData()
			}
			
		}).bind(this))
	},

	showNoData : function(){
		this.container = html.div()
		this.container.append(this.getTitleDiv())
		this.container.append(html.div("noResult").text("There is no entry to add"))
		$("#dataOfferContainer").append(this.container)
	},	
	
	showData : function(data){
		console.log(data)
		var tableBuffer = []
		$.each(data, (function(index, value){
			var rowContainer = html.div("rowContainer")
			$.each(this.fields, function(innerIndex, field){
				rowContainer.append(field.type(value[field.key]))
			})
			rowContainer.append(AddInstanceButton(rowContainer, value[this.objectToAdd]))
			tableBuffer.push(rowContainer)
		}).bind(this))
		
		this.container = html.div()
		//Title
		this.container.append(this.getTitleDiv())
		this.container.append(tableBuffer)
		$("#dataOfferContainer").append(this.container)
	},
	
	getTitleDiv : function(){
		return html.div("title").text(this.title)
	}	
}






