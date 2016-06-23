

pageData.pageConfig = [
        
     {
    	 uri : "",
    	 type : sw.dataContainer,
    	 data : [
    	    { 
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	name : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	name : "boneLabel",
    	    }, {
    	    	
    	    }  
    	 ],
    	 elements : [
    	    {
    	    	type : "addNewButton",
    	    	textValue : {
    	    		type : sw.local,
    	    		name : "boneLabel"
    	    	}
    	    }, {
    	    	type : "dataTable",
    	    	dataToDiplay : {
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
    	 uri : "",
    	 type : sw.dataContainer,
    	 data : [
    	    { 
    	    	type : sw.constant,
    	    	value : "Neurocranium",
    	    	name : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Neurocranium",
    	    	name : "label",
    	    }, {
    	    	
    	    }  
    	 ],
    	 elements : [
    	    {
    	    	type : "addNewButton",
    	    	textValue : {
    	    		type : sw.local,
    	    		name : "boneLabel"
    	    	}
    	    }, {
    	    	type : "dataTable",
    	    	dataToDiplay : {
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