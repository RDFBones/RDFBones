

	
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
     	type : "http://softwareOntology.com/LinkDataTable",
    	title : "Existing Skeletal Inventories",
    	dataToDisplay : {
    		type : sw.global,
    		key : "skeletalInventories",
    	},
    	linkDataInputs : [
    		 { 
    			 type : sw.local,
    			 key : "uri",
    			 varName  : "skeletalInventory",
    		 },{
    			 type : sw.constant,
    			 value : "skeletalInventory",
    			 varName : "pageUri"
    		 }
	    ],
	    mapping : "pageLoader",
	    dataFields : [
             {
            	 title : "Label",
    	    	 type : sw.literalField,
    	    	 value : {
    	    		 type : sw.local,
    	    		 key : "label",
    	    	 },
    	     },{
    	    	 title : "Type",
    	    	 type : sw.literalField,
    	    	 value : {
    	    		 type : sw.local,
    	    		 key : "typeLabel",
    	    	 }
    	     },
    	]
     }
   ]                            
