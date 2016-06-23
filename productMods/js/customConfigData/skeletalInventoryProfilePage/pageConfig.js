
pageData.pageElements = [
        
     {
    	 uri : "",
    	 type : sw.container,
    	 localData : [
    	    { 
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	name : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	name : "boneLabel",
    	    }
    	 ],
    	 elements : [
    	    {
    	    	type : sw.addNew,
    	    	textValue : {
    	    		type : sw.local,
    	    		name : "boneLabel"
    	    	}
    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		name : "coherentBones",		
	    	    	},
	    	    	selectField : "boneDivision",
	    	    	selectCriteria : {
	    	    		type : sw.local,
	    	    		key : "boneUri",
	    	    	}
    	    	},
    	    	dataFields : [
    	    	  {  
    	    		  type : sw.literalField,
    	    		  name : "label", 
    	    	  },{
    	    		  type : sw.literalField,
    	    		  name : "boneOrgans",
    	    	  }  
    	    	]
    	    }    
    	 ]
     }, {  
    	 type : sw.container,
    	 localData : [
    	    { 
    	    	type : sw.constant,
    	    	value : "Neurocranium",
    	    	name : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Neurocranium",
    	    	name : "label",
    	    }
    	 ],
    	 elements : [
    	    {
    	    	type : sw.addNew,
    	    	textValue : {
    	    		type : sw.local,
    	    		name : "label"
    	    	}
    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		name : "coherentBones",		
	    	    	},
	    	    	selectField : "boneDivision",
	    	    	selectCriteria : {
	    	    		type : sw.local,
	    	    		key : "boneUri",
	    	    	}
    	    	},
    	    	dataFields : [
    	    	  {  
    	    		  type : sw.literalField,
    	    		  name : "label", 
    	    	  },{
    	    		  type : sw.literalField,
    	    		  name : "boneOrgans",
    	    	  }  
    	    	]
    	    }    
    	    
    	 ]
     }
]
