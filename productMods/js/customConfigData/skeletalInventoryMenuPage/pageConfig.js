

	
pageData.skeletalInventories = [
	    { uri : "http://example.org/individual", label : "Test Inventory", type : "Primary Skeletal Inventory"},
	]


pageData.pageElements = [
    {
    	uri : "http://softwareOntology.com/addField1",
    	type : "http://softwareOntology.com/SelectorAddField",
    	title : "Add new Skeletal Inventory",
    	listElements : [
    	    { 
    	    	value : "http://w3id.org/rdfbones/core#PrimarySkeletalInventory",
    	    	text : "Primary Skeletal Inventory",
    	    },{
    	    	value : "http://w3id.org/rdfbones/core#SecondarySkeletalInventory",
    	    	text : "Secondary Skeletal Inventory",
    	    },{
    	    	value : "http://w3id.org/rdfbones/core#ThirdarySkeletalInventory",
    	    	text : "Thirdary Skeletal Inventory",
    	    }
    	 ]
    },{
    	uri : "http://softwareOntology.com/existingInventories",
     	type : "http://softwareOntology.com/LinkDataTable",
    	title : "Existing Skeletal Inventories",
    	dataKey : "skeletalInventories",
    	linkDataInputs : [
    		 { 
    			 type : "http://softwareOntology.com/local",
    			 uri : "http://softwareOntology.com/dataInput1",
    			 dataKey : "uri",
    		 }
	    ],
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
    	    		 key : "type",
    	    	 }
    	     },
    	]
     }
   ]                            