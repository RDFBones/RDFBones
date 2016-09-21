

var EditButtonLink = function(parent, configData){
	ParentButtonLink.call(this, parent, configData, "edit")
}

EditButtonLink.prototype = Object.create(ParentButtonLink.prototype)




var DeleteButtonLink = function(parent, configData){
	
	this.configData = configData
	this.parent = parent
	this.assembleData()
	this.container = new Button("del", (this.routine).bind(this)).container
}

DeleteButtonLink.prototype = {
		
	assembleData : function(){
		data = new Object()
		$.each(this.configData.linkDataInputs, (function(i, value){
			if(value.varName != undefined){
				data[value.varName] = getData(this, value)	
			} else {
				data[value.key] = getData(this, value)	
			}
		}).bind(this))
		this.data = data
	},	
		
	routine : function(){
		
		PopUpController.init()
		$.ajax({
			url : baseUrl + "delete",
			context : this,
			dataType : "json",
			data : this.data
		}).done(function(result){
			
			
			if(this.configData.afterProcess != undefined){
				//Perform after process. Now it is just a single version
				$.ajax({
					dataType : "json",
					url : baseUrl + "dataLoader",
					data : {
						queryType : "singleBonesWithout",
					}
				}).done(function(result) {
				
					console.log(result)
					$.each(result, function(i, res){
						res.type = "existing"
					})
					
					var object = new Object()
					console.log(result)
					object.boneOrgan = result
					object.operation = "addSingleBoneOf"
					object.skeletalDivisionClass = pageData.skeletalDivisionType
					
					$.ajax({
						dataType : "json",
						url : baseUrl + "dataInput",
						data : "dataToStore=" + JSON.stringify(object)
					}).done(function(msg){
						location.reload()
					})
				})
			} else {
				location.reload();
			}
		})
	}
}

var BinButtonLink = function(parent, configData){
	
	this.configData = configData
	this.parent = parent
	this.assembleData()
	this.container = new Button("bin", (this.routine).bind(this)).container
}

BinButtonLink.prototype = Object.create(DeleteButtonLink.prototype)