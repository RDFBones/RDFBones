
pageData.pageElements = [
        
     {
    	 uri : "",
    	 type : sw.container,
    	 localData : [
    	    { 
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	key : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Viscerocranium",
    	    	key : "boneLabel",
    	    }
    	 ],
    	 elements : [
    	    {
    	    	type : sw.addNew,
    	    	textValue : {
    	    		type : sw.local,
    	    		key : "boneLabel"
    	    	},
    	    	linkDataInputs : [
		    	  {
		    		type : sw.local,
	  	    		key : "boneUri",
	  	    		varName : "classUri",
		    	  }, {
		    		type : sw.global,
	  	    		key : "individual",
	  	    		//varName : "classUri",
		    	  }
    	    	],
    	    	mapping : "entryFormLoad",
    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		key : "coherentBones",		
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
    	    	key : "boneUri",
    	    }, {
    	    	type : sw.constant,
    	    	value : "Neurocranium",
    	    	key : "boneLabel",
    	    }
    	 ],
    	 elements : [
    	    {
    	    	type : sw.addNew,
    	    	textValue : {
    	    		type : sw.local,
    	    		key : "boneLabel"
    	    	},
    	    	linkDataInputs : [
		    	  {
		    		type : sw.local,
	  	    		key : "boneUri",
	  	    		varName : "classUri",
		    	  },  {
		    		type : sw.global,
	  	    		key : "individual",
	  	    		//varName : "classUri",
		    	  }
		    	],
    	    	mapping : "entryFormLoad",

    	    }, {
    	    	type : sw.dataTable,
    	    	dataToDisplay : {
	    	    	type : sw.selectOperationResult,
	    	    	dataToSelect : {
	    	    		type : sw.global,
	    	    		key : "coherentBones",		
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
