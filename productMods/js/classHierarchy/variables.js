var dataOperations = {
		
	
		createClassHierachryData : function(classes){
			
			$.each(classes, function(index, value){
				var superClass = null
				var subClass = null
				parentId = $.inArray(value.superClass.label, classHierarcyVars.classLabelList)
				if(parentId == -1){
					superClass = dataOperations.createClassObject(value.superClass)
				} else {
					superClass = classHierarcyVars.classList[parentId] 		
				}				
				
				childId =  $.inArray(value.subClass.label, classHierarcyVars.classLabelList) 
				if( childId == -1){
					classHierarcyVars.childrenList.push(classHierarcyVars.classLabelList.length)
					subClass = dataOperations.createClassObject(value.subClass)
				} else {
					subClass = classHierarcyVars.classList[childId]
				}
				if(value.subClass.label != value.superClass.label){
					superClass.children.push(subClass)	
				}
			})
		
			$.each(classHierarcyVars.classList, function(index, value){
				if($.inArray(index, classHierarcyVars.childrenList) == -1){
					classHierarcyVars.parents.push(value)
				}
			})
		},
		
		createClassObject : function(object){
				
				var _class = new Object()			
				_class.id = classHierarcyVars.classList.length
				_class.label = object.label
				_class.uri = object.uri
				_class.children = [];
				classHierarcyVars.classLabelList.push(object.label)
				classHierarcyVars.classList.push(_class)
				return _class
		}
}

var classHierarcyVars = {
		
		childrenGroupDivs : [],
		childrenList : [],
		classList : [],
		classLabelList : [],
		parents : [],	
}