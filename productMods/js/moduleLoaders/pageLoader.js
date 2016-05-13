var pageLoader = {

	init : function() {
		
		this.initData()
		var pageModules = html.getNewDiv()
		/*
		$.each(pageElements, function(index, element) {
			switch (element.type) {
			case "table":
					console.log(element.dataKey)
					var table = new TableLoader(element)
					element.table = table
					pageModules.append(table.getContainer())
				break
			case "treeStructure":
				pageModules.append(
					treeLoader.showTree1(element, treeStructure))
				break
			case "treeStructureSingle":
				pageModules.append(
					treeLoader.showTree2(element, treeStructure))
				break
			case "subPage":
				//Normally a page data object were passed but right now the bone editor
				//definition is not constant
				var boneEditor = new BoneEditor(element)
				UIController.modules[element.id] = boneEditor
				pageModules.append(boneEditor.fullScreenContainer)
				//This is just the loading of the frame. It "constructor" shows the sub-
				//page module and fills it with data
				break
			default:
				break
			}
		})
		$("#pageContainer").append(pageModules)*/
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

$(document).ready(function() {
	pageLoader.init()
	
})


