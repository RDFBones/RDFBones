var dataObject = null



var PhalanxEditController = function(){
	
	preparePhalanx()
	var array = $.merge(rootPhalanxArr, 
					$.merge(irregularPhalanxArr, 
						$.merge(thirdaryPhalanxArr, 
							$.merge(primaryPhalanxArr, secondaryPhalanxArr))))	
	
	this.dataToStore = new Object
	this.cnt = 0
	
	this.dataToStore.uri = FMA + "78512",
	this.dataToStore.label = "Set of phalanges of foot"
	this.dataToStore.type = "new"
	this.dataToStore.boneOrgan = []
	
	this.container = html.div()
	this.selector = UI.classSelector(array)
	this.addButton = new Button("add", (this.addPhalanx).bind(this))
	
	this.subContainer = html.div("subContainer")
	
	this.saveContainer = html.div("saveContainer")
	this.saveButton = new TextButton("Save", (this.saveRoutine).bind(this))
			.disable()
	
	this.cancelButton = new TextButton("Cancel", (this.cancelRoutine)
			.bind(this), "rightAligned")
	
	this.assemble()
}

PhalanxEditController.prototype = {
		
	assemble : function(){
		
		UI.assemble(this.container, [
		       html.div("title").text("Set of phalanges of foot"),
		       html.div("inlineContainer"),
		       	   this.selector,
		       	   this.addButton.container,
		       this.subContainer,
		       this.saveContainer,
		       	   this.saveButton.container,
		       	   this.cancelButton.container,
			], [0, 0, 1, 1, 0, 0, 1, 1])
	},

	addPhalanx : function(){
		
		uri = this.selector.val()
		if(updatePhalanx(uri)){
			this.cnt++
			this.subContainer.append(
					new BoneOrganField(this, dataObject, this.dataToStore.boneOrgan, true).container)
			this.refresh()
		}
	},
	
	refresh : function(){
		if(this.cnt > 0){
			this.saveButton.enable()
		} else {
			this.saveButton.disable()
		}
	},
	
	reset : function(uri, boneOrganField){
		this.cnt--
	},
	
	saveRoutine : function(){

		var toSend = {
			operation : "addCoherentBoneRegion",
			individual : pageData.individual,
			boneDivision : this.dataToStore
		}
		console.log(toSend)
		
		PopUpController.init()
		$.ajax({
				type : 'POST',
				context : this,
				dataType : 'json',
				url : baseUrl + "dataInput",
				data : "dataToStore=" + JSON.stringify(toSend)
		}).done((function(msg) {
							
				if (pageData.existingBoneDivisionType == undefined) {
					pageData.existingBoneDivisionType = this.dataToStore.uri
				}

				var urlObject = {
					pageUri : "skeletalDivision",
					cefPageUri : "phalanxOfToe",
					individual : msg.object.boneDivision.uri,
					skeletalDivision : msg.object.boneDivision.uri,
					skeletalDivisionType : pageData.skeletalDivisionType, 
					skeletalInventory : pageData.individual,
					existingBoneDivisionType : pageData.existingBoneDivisionType,
					classUri : pageData.classUri,
				}

				window.location = baseUrl
						+ "pageLoader?"
						+ DataLib.getUrl(urlObject)
				window.location = baseUrl + "pageLoader?"
						+ DataLib.getUrl(urlObject)
			}).bind(this))
	},
	
	cancelRoutine : function(){
		
		window.location = baseUrl
			+ "pageLoader?skeletalInventory="
			+ pageData.individual
			+ "&pageUri=skeletalInventory"
	}
}


var preparePhalanx = function(phal){

	primaryPhalanx = objectFromArray(primaryPhalanxArr)
	secondaryPhalanx = objectFromArray(secondaryPhalanxArr)
	thirdaryPhalanx = objectFromArray(thirdaryPhalanxArr)
	irregularPhalanx = objectFromArray(irregularPhalanxArr)
	
	parseCount(primaryPhalanx)
	parseCount(secondaryPhalanx)
	parseCount(thirdaryPhalanx)
	parseCount(irregularPhalanx)
}

var parseCount = function(object){
	$.each(object, function(key, value){
		if(value.count != undefined){
			value.count = parseInt(value.count)
		} else {
			value.count = 1
		}
	})
}

var objectFromArray = function(array, key){
	
	if(key == undefined){
		key = "uri"
	}
	object = new Object()
	$.each(array, function(i, value){
		object[value[key]] = value	
	})
	return object
}

var toIncrement = []
var allowed = null

var updatePhalanx = function(phalanxUri){
	
	toIncrement.length = 0
	allowed = "allowed"
		
	leaf = primaryPhalanx[phalanxUri]
	if(leaf == undefined){
		//It is leaf node ->
		secondary = secondaryPhalanx[phalanxUri]
		if(secondary == undefined){
			irregular = irregularPhalanx[phalanxUri]
			if(irregular == undefined){
				thirdary = thirdaryPhalanx[phalanxUri]
				if(thirdary == undefined){
					dataObject = rootPhalanx
					checkRoot(phalanxUri)
				} else {
					dataObject = thirdary
					checkThirdary(thirdary)
				}
			} else {
				dataObject = irregular
				checkIrregular(irregular)
			}
		} else {
			dataObject = secondary
			checkSecondary(secondary)
		}
	} else {
		dataObject = leaf
		checkLeaf(leaf)
	}
	console.log(toIncrement)
	console.log(allowed)
	
	if(allowed = "allowed"){
		//Add the data
		$.each(toIncrement, function(i, value){
			value.count++
		})
		return true
	} else {
		alert(allowed)
		return false
	}
}

var checkLeaf = function(object){
	
	if(check(object)){
		secondary = secondaryPhalanx[object.parent]
		checkSecondary(secondary)
	}
}

var checkSecondary = function(object){
	if(check(object)){
		//Check Irregular
		if(check(getIrregular(object.label))){
			thirdary = thirdaryPhalanx[object.parent]
			checkThirdary(thirdary)	
		}
	}
}

var checkThirdary = function(object){
	if(check(object)){
		checkRoot()
	}
}

var checkIrregular = function(object){
	if(check(object)){
		checkRoot()
	}
}

var checkRoot = function(){
	check(rootPhalanx)
}

var check = function(object){
	if(checkCount(object)){
		toIncrement.push(object)
		return true
	} else {
		allowed = rootPhalanx.label 
		return false
	}
}

var getIrregular = function(label){
	
	if(label.indexOf("Distal") > -1){
		return irregularPhalanx["http://purl.obolibrary.org/obo/FMA_75830"]
	} else if(label.indexOf("Proximal") > -1){
		return irregularPhalanx["http://purl.obolibrary.org/obo/FMA_75828"]
	} else {
		return irregularPhalanx["http://purl.obolibrary.org/obo/FMA_75829"]
	}
}

var checkCount = function(object){
	
	if(object.current == undefined){
		object.current = 0
	}
	if(object.current < object.count){
		return true
	} else {
		return false
	}
}

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : PhalanxEditController,
} ]

