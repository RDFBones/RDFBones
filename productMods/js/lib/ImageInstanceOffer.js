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