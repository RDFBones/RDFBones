var singleBones = []
var coherentBones = []


var pageData = {
		
	individual : "12345567",	
	singleBones : [
	    { boneUri : "rdfbones#1", label : "frontal03302", type : "Frontal bone", boneSegments : "3"},
	    { boneUri : "rdfbones#2", label : "mand3943", type : "Mandible", boneSegments : "0"},
	    { boneUri : "rdfbones#3", label : "max289292", type : "Right maxilla", boneSegments : "1"},
	],
	
	coherentBones : [
	  {  boneUri : "123457",  label : "nuerocranium_5932",  type : "Neurocranium", boneOrgans : "2"},
	  {  boneUri : "123456",  label : "viscerocranium_1954",  type : "Viscerocranium", boneOrgans : "3"},
	],
	
	skeletalInventories : [
	    { uri : "123", label : "Test Inventory", type : "Primary Skeletal Inventory"},
	    { uri : "123", label : "SI on AES", type : "Secondary Skeletal Inventory"}
	]
}

var skInventoryMenuElements = [
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
    	    	 dataKey : "label",
    	    	 type : "http://softwareOntology.com/LiteralField",
    	    	 uri : "http://softwareOntology.com/labelDataField1", 
    	     },{
    	    	 title : "Type",
    	    	 dataKey : "type",
    	    	 type : "http://softwareOntology.com/LiteralField",
    	    	 uri : "http://softwareOntology.com/typeDataField1",	        	    	    	 
    	     },
    	]
     }
     
   ]                            

var pageElements = [
	   { uri : "http://softwareOntology.com/boneContainer1",
		 type : "http://softwareOntology.com/TabContainer",
	     tabs : [
	         {
	        	 type : "http://softwareOntology.com/Tab",
	        	 uri : "http://softwareOntology.com/singleBonesTab",
	        	 title : "Single Bones",
	        	 elements : [
	        	    {
	        	    	type : "http://softwareOntology.com/DataContainer",
	        	    	uri : "http://softwareOntology.com/singleBonesContainer",
	        	    	addText : "Add new",
	        	    	dataKey : "singleBones",
	        	    	dataFields : [
	        	    	     {
	        	    	    	 title : "Label",
	        	    	    	 dataKey : "label",
	        	    	    	 type : "http://softwareOntology.com/LiteralField",
	        	    	    	 uri : "http://softwareOntology.com/labelDataField1", 
	        	    	     },{
	        	    	    	 title : "Type",
	        	    	    	 dataKey : "type",
	        	    	    	 type : "http://softwareOntology.com/LiteralField",
	        	    	    	 uri : "http://softwareOntology.com/typeDataField1",	        	    	    	 
	        	    	     },{
	        	    	    	 title : "Bone Segments",
	        	    	    	 dataKey : "numberOfBoneSegments",
	        	    	    	 type : "http://softwareOntology.com/LiteralField",
	        	    	    	 uri : "http://softwareOntology.com/counterDataField1",
	        	    	     },{
	        	    	    	 linkDataInputs : [
		        	    	    		 { 
		        	    	    			 type : "http://softwareOntology.com/local",
		        	    	    			 uri : "http://softwareOntology.com/dataInput1",
		        	    	    			 dataKey : "uri",
		        	    	    		 },{ 
		        	    	    			 type : "http://softwareOntology.com/global",
		        	    	    			 uri : "http://softwareOntology.com/dataInput1",
		        	    	    			 dataKey : "individual",
		        	    	    		 }
		        	    	    	 ],
		        	    	    	 type : "http://softwareOntology.com/EditButton",
		        	    	    	 uri : "http://softwareOntology.com/editSingleButton",
		        	    	     }
	        	    	]
	        	    }
	        	 ]  
	         },{
	        	 type : "http://softwareOntology.com/Tab",
	        	 uri : "http://softwareOntology.com/coherentBonesTab",
	        	 title : "Coheren Bones",
	        	 elements : [],
	         }
	     ]
	   }             
]



var	treeStructure = [ {
		uri : "http://purl.obolibrary.org/obo/FMA_53672",
		label : "Neurocranium",
		children : [ {
			uri : "http://purl.obolibrary.org/obo/FMA_52735",
			label : "Occipital bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52789",
			label : "Left parietal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52734",
			label : "Frontal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52788",
			label : "Right parietal bone"
		}, ]
	}, {
		uri : "http://purl.obolibrary.org/obo/FMA_53673",
		label : "Viscerocranium",
		children : [ {
			uri : "http://purl.obolibrary.org/obo/FMA_52738",
			label : "Right temporal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53645",
			label : "Right lacrimal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52893",
			label : "Left zygomatic bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_54737",
			label : "Right inferior nasal concha"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53648",
			label : "Left nasal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52749",
			label : "Hyoid bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53646",
			label : "Left lacrimal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_9710",
			label : "Vomer"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52736",
			label : "Sphenoid bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53656",
			label : "Left palatine bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52748",
			label : "Mandible"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53649",
			label : "Right maxilla"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_54738",
			label : "Left inferior nasal concha"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52740",
			label : "Ethmoid"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53647",
			label : "Right nasal bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53650",
			label : "Left maxilla"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_53655",
			label : "Right palatine bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52892",
			label : "Right zygomatic bone"
		}, {
			uri : "http://purl.obolibrary.org/obo/FMA_52739",
			label : "Left temporal bone"
		} ]
	} ]
