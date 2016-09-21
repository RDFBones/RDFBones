var treeData = {
	/***************************************************************************
	 * Variables
	 **************************************************************************/
	classLabelInScope : "",
	
	//The variable where the data on the list is stored
	singleBones : new Object(),
	coherentBones : new Object(),
	
	//Here we store whose bone data is displayed
	uriInScope : "",
	
	existingValues : [],
	
	makeMaps : function(classes) {
		$.each(classes,function(index, value) {
			if (value.superClass.label != value.subClass.label) {
				if (classHierarcyVars.parentMap[value.subClass.label] == undefined) {
					classHierarcyVars.parentMap[value.subClass.label] = []
				}
				classHierarcyVars.parentMap[value.subClass.label]
						.push(index)
			} else {
				if (classHierarcyVars.classMapping[value.subClass.label] == undefined) {
					classHierarcyVars.classMapping[value.subClass.label] = index
				}
			}
		})

		firstParentMap = classHierarcyVars.classMapping

		$.each(classHierarcyVars.parentMap, function(index, value) {
			if (firstParentMap[index] != undefined) {
				// If they have a parent we exclude them. So we get the direct
				// children of bibo:Document
				delete firstParentMap[index]
			}
		})

		realPairs = []

		$.each(classHierarcyVars.parentMap, function(index, value) {
			if (value.length = 1) {
				realPairs.push(value[0])
			} else {
				// Check which father
				buffer = 0
				returnId = 0
				$.each(value, function(index, value) {
					fatherLabel = classes[value].superClass.label
					if (classHierarchy.parentMap[fatherLabel].length > buffer) {
						buffer = classHierarchy.parentMap[fatherLabel].length
						returnId = value
					}
				})
				realPairs.push(returnId)
			}
		})

		$.each(realPairs, function(index, value) {

				if (classHierarcyVars.childrenMap[classes[value].superClass.label] == undefined) {
					classHierarcyVars.childrenMap[classes[value].superClass.label] = []
				}
				classHierarcyVars.childrenMap[classes[value].superClass.label]
						.push(value)
			})

			
		$.each(firstParentMap, function(index, value) {
			objectId = classHierarcyVars.classMapping[index]
			parentObject = treeData.createClassObject(classes[objectId].superClass)
			classHierarcyVars.classObjects[parentObject.label] = parentObject
			if (classHierarcyVars.childrenMap[index] != undefined) {
				// It has a child
				treeData.fillChildren(parentObject,
						classHierarcyVars.childrenMap[index])
			}
			// Final
			classHierarcyVars.parents.push(parentObject)
		})
	},

	fillChildren : function(parentObject, childrenList) {
		$.each(childrenList, function(index, value) {
			var className = classes[value].subClass
			var parentObj = treeData.createClassObject(className)
			classHierarcyVars.classObjects[parentObject.label] = parentObject
			if (classHierarcyVars.childrenMap[className.label] != undefined) {
				// It has a child
				treeData.fillChildren(parentObj,
						classHierarcyVars.childrenMap[className.label])
			}
			parentObject.children.push(parentObj)
		})
	},

	createClassObject : function(object) {
		var _class = new Object()
		_class.id = classHierarcyVars.classList.length
		_class.label = object.label
		_class.uri = object.uri
		_class.children = [];
		classHierarcyVars.classLabelList.push(object.label)
		classHierarcyVars.classList.push(_class)
		return _class
	},

	searchForString : function(searchString) {
		classHierarcyVars.searchStringLength = searchString.length
		console.log("SearchString  " + searchString)
		var bools = []
		$.each(classHierarcyVars.parents, function(index, value) {
			bools.push(treeData.foundInChild(searchString, value))
		})
		console.log("Result : ")
		console.log(classHierarcyVars.parents)
		UIController.showSearchResults()
	},

	foundInChild : function(searchString, parent) {

		parent.toDisplay = false
		parent.childToDisplay = false
		parent.searchIndex = parent.label.toLowerCase().indexOf(searchString)
		if (parent.label.toLowerCase().indexOf(searchString) > -1) {
			console.log(parent.label)
			parent.toDisplay = true
		}
		$.each(parent.children, function(index, value) {
			var bools = []
			bools.push(treeData.foundInChild(searchString, value))

			$.each(bools, function(index, boolValue) {
				if (boolValue) {
					parent.childToDisplay = true
					parent.toDisplay = true
				}
			})
		})
		return parent.toDisplay
	}
}

var classHierarcyVars = {

	searchStringLength : 0,
	classMapping : new Object(),
	directPairs : [],
	parentMap : new Object(),
	childrenMap : new Object(),
	childrenGroupDivs : [],
	childrenList : [],
	classList : [],
	classObjects : new Object(),
	classLabelList : [],
	parents : [],

	saveChildrenGroupDiv : function(div) {
		this.childrenGroupDivs.push(div)
	}
}

var testData = {
	uri : "1234",
	label : "LabelValue",
	description : "DescriptionValue",
	classLabel : "Article",
	systemicParts : [ {
		uri : "1235",
		label : "LabelValue1",
		description : "DescriptionValue1",
		classLabel : "Academic Article",
		systemicParts : []
	}, {
		uri : "1236",
		label : "LabelValue2",
		description : "DescriptionValue2",
		classLabel : "Blog Posting",
		systemicParts : []
	}, ]
}

treeData.singleBones["1"] = new Object()
treeData.singleBones["1"].images = [ "testImg/1.jpg", "testImg/2.jpg", "testImg/3.jpg"]	