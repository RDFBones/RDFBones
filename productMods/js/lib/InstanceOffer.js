
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
			console.log(results)
			this.showData($.parseJSON(results))
		}).bind(this))
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

var ImageInstanceOffer = function(){
	
	//I have to define how the element is called whose value
	//has to be added to in the case of the addbutton
	this.dataOperation = "imagesOfNotIndividual"
	this.objectToAdd = "image"
	this.fields = [
	{
		type : LiteralColumn,
		key : ["label"]
	}, {
		type : ImageColumn,
		key : ["dl"]
	}]
	
	this.dataObject = new Object()
	this.tableFields = new Object()
	this.dataToGet = ["label", "downloadUri"] 
	this.title = "Select Existing Image"
	InstanceOffer.call(this)
} 

ImageInstanceOffer.prototype = Object.create(InstanceOffer.prototype)




