var pageLoader = {

	init : function() {
		var pageModules = html.getNewDiv()
		$.each(pageElements, function(index, element) {
			switch (element.type) {
			case "table":
				console.log(element.dataKey)
				pageModules.append(
					tableLoader.showTable(element, element.dataKey))
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
				pageModules.append(boneEditor.fullScreen)
				//This is just the loading of the frame. It "constructor" shows the sub-
				//page module and fills it with data
				break
			default:
				break
			}
		})
		$("#pageContainer").append(pageModules)
	}
}

$(document).ready(function() {
	pageLoader.init()
})