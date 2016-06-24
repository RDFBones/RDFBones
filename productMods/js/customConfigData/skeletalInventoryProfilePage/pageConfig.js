
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
    	    		key : "boneLabel"
    	    	}
    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		name : "coherentBones",		
	    	    	},
	    	    	selectField : "type",
	    	    	selectCriteria : {
	    	    		type : sw.local,
	    	    		key : "boneUri",
	    	    	}
    	    	},
    	    	dataFields : [
    	    	  {  
    	    		  type : sw.literalField,
    	    		  key : "label", 
    	    		  title : "Label",
    	    	  },{
    	    		  type : sw.literalField,
    	    		  key : "boneOrgans",
    	    		  title : "Number of Bone Organs",
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
    	    		key : "label"
    	    	}
    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		name : "coherentBones",		
	    	    	},
	    	    	selectField : "type",
	    	    	selectCriteria : {
	    	    		type : sw.local,
	    	    		key : "boneUri",
	    	    	}
    	    	},
    	    	dataFields : [
    	    	  {  
    	    		  type : sw.literalField,
    	    		  key : "label", 
    	    		  title : "Label",
    	    	  },{
    	    		  type : sw.literalField,
    	    		  key : "boneOrgans",
    	    		  title : "Number of Bone Organs"
    	    	  }
    	    	]
    	    }    
    	    
    	 ]
     }
]
