
/*
 * The InstanceOffer is never called by itself. Its subclasses are called, that
 * contains the specification of way how the page has element has to be loaded.
 */

var InstanceOffer = function(){

	//Here we create the frame of the table.
	this.initElement()	
	this.getDataToOffer()
}

InstanceOffer.prototype = {
		
	initElement : function(){
		this.container = html.div()
		this.container.append(html.div("moduleTitle").text(this.title))
		this.titleContainer = html.div()
		$.each(this.columnTitles, function(index, value){
			this.titleContainer.append(html.div("columnTitle").text(value))
		})
		this.container.append(this.titleContainer)
		this.dataContainer = html.div()
		this.dataContainer.append(TableUI.getWaitGif())
		this.container.append(this.dataContainer)
		$("#dataOfferContainer").append(this.container)
	},
	//In the instanceoffer 
	getDataToOffer : function(){
	
		var inputData = {
			url : baseUrl + "ajaxQuery",
			data : {
				subject : subjectUri,
				dataOperation : this.dataOperation,
			}
		}
		AJAXController.getData(inputData, this)
	},

	returnRoutine : function(result){
		console.log(result)
		this.data = result
		if(result.length == 0){
			this.showNoData()
		} else if(result.length == 1) {
			if(result[0][this.objectToAdd] == null){
				this.showNoData()
			} else {
				this.showData(result)
			}
		} else {
			this.showData(result)
		}
	},
	
	showNoData : function(){
		this.dataContainer.empty()
		this.container.append(html.div("noResult").text("There is no entry to add"))
	},	
	
	removeContainer : function(container){
		container.remove()
		this.numOfEntries--
		if(this.numOfEntries == 0){
			console.log("itt")
			this.showNoData()
		}
	},
	
	showData : function(data){
		console.log(data)
		var tableContainer = []
		this.numOfEntries = 0
		$.each(data, (function(index, value){
			console.log(value)
			if(value[this.objectToAdd] != null){
				console.log("kutya")
				var rowContainer = html.div("rowContainer")
				var rowInnerContainer = html.div("rowInnerContainer")
				$.each(this.fields, function(innerIndex, field){
					rowInnerContainer.append(field.type(value[field.key]))
				})
				rowInnerContainer.append(AddInstanceButton(this, rowContainer, value[this.objectToAdd]))
				tableContainer.push(rowContainer.append(rowInnerContainer))	
				this.numOfEntries++;
			}
		}).bind(this))
		this.dataContainer.empty()
		this.dataContainer.append(tableContainer)
	},
}






