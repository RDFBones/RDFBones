var pageLoader = {

	loadPage : function() {
		var pageElementBuffer = []
		$.each(pageElements, function(index, element) {
			console.log(element.type)
			pageElementBuffer.push(new PageElementMap[element.type](element).container)
		})
		$("#pageContent").append(pageElementBuffer)
	},
	
	initData : function(){
		
		//In reality it has to be loaded by a query
		var coherentBones = []
		var singleBones = []
		DataOperations.selectIntoTwo(boneSegments, coherentBones, singleBones, "boneDivision")
		console.log(coherentBones)
		console.log(singleBones)
		var groupedCoherent = DataOperations.groupArrayToObject(coherentBones, "boneDivision", 
				["boneDivision", "boneDivisionLabel", "boneDivisionClass"], "systemicParts")
		console.log(groupedCoherent)	
		var groupedCoherent2 = DataOperations.twoLevelGroupArrayToObject(coherentBones, "boneDivision", 
				["boneDivision", "boneDivisionLabel", "boneDivisionClass"], "systemicParts",
				"boneOrgan", ["boneOrgan", "boneOrganLabel", "boneOrganClass"], "regionalParts")
		console.log(groupedCoherent2)	
	},
	
	refreshTables : function(){
		$.each(pageElements, function(index, element) {
			if(element.type == "table"){
				element.table.refresh()
			}
		})
	}
}


