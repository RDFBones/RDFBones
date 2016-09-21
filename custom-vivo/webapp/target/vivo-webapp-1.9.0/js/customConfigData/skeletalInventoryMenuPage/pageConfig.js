

	
pageData.skeletalInventories = {
	    dataOperation : "query",
	    queryType : "instances",
	    parameters : [{
	    	value : {
				type : sw.constant,
				value : "http://w3id.org/rdfbones/core#PrimarySkeletalInventory", 
			},
	    	name : "class",
	    }]
}

pageData.pageElements = [
    {
    	uri : "http://softwareOntology.com/addField1",
    	type : "http://softwareOntology.com/SelectorAddField",
    	formId : "skeletalInventory",
    	title : "Add new Skeletal Inventory",
    	listElements : [
    	    { 
    	    	uri : "http://w3id.org/rdfbones/core#PrimarySkeletalInventory",
    	    	label : "Primary Skeletal Inventory",
    	    },{
    	    	uri : "http://w3id.org/rdfbones/core#PrimarySkeletalInventoryFreshBone",
    	    	label : "Primary skeletal inventory for fresh bone material",
    	    },{
    	    	uri : "http://w3id.org/rdfbones/core#PrimarySkeletalInventoryDryBone",
    	    	label : "Primary skeletal inventory for dry bone material",
    	    }
    	 ]
    },{
    	uri : "http://softwareOntology.com/existingInventories",
     	type : "http://softwareOntology.com/DataTable",
    	title : "Existing Skeletal Inventories",
    	dataToDisplay : {
    		type : sw.global,
    		key : "skeletalInventories",
    	},
	    dataFields : [
             {
            	 title : "Label",
    	    	 type : sw.literalLinkField,
    	    	 value : {
    	    		 type : sw.local,
    	    		 key : "label",
    	    	 },
    	     	linkDataInputs : [
 	        		 {
 	        			 type : sw.local,
 	        			 key : "uri",
 	        			 varName  : "individual",
 	        		 }
 	    	    ],
 	    	    mapping : "defaultPageLoad",
    	     },{
    	    	 title : "Type",
    	    	 type : sw.literalField,
    	    	 value : {
    	    		 type : sw.local,
    	    		 key : "typeLabel",
    	    	 }
    	     },{
    	    	 type : sw.deleteButton,
    	    	 linkDataInputs : [
    	    	 {
    	    		 type : sw.constant,
    	    		 value : "deleteSkeletalInventory",
    	    		 key : "operation",
    	    	 },{
					type : sw.local,
					key : "uri",
					varName : "skeletalInventory",
				}, {
					//It is signed that the uri has to be deleted
					type : sw.local,
					key : "uri",
					varName : "instance",
				}],
    			mapping : "delete",
    	     },
    	]
     }
   ]                            
