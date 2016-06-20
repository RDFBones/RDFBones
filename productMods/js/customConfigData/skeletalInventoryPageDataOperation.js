

pageData.dataOperations =  [
	   {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71339",
		   toVariable : "tarsalBones",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71340",
		   toVariable : "metaTarsalBones",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_24140",
		   toVariable : "lowerLimb",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71199",
		   toVariable : "foreArm",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71335",
		   toVariable : "carpalBones",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71336",
		   toVariable : "metaCarpalBones",
	   }, {
		   type : "selection",
		   input : "coherentBones",
		   onField : "boneDivision",
		   filterValue : "http://purl.obolibrary.org/obo/FMA_71337",
		   toVariable : "phalangesOfHand",
	   }
	]	                  
}


pageData.singleBones = [
    	    { boneUri : "rdfbones#1", label : "frontal03302", type : "Frontal bone", boneSegments : "3"},
    	    { boneUri : "rdfbones#2", label : "mand3943", type : "Mandible", boneSegments : "0"},
    	    { boneUri : "rdfbones#3", label : "max289292", type : "Right maxilla", boneSegments : "1"},
    	]

pageData.coherentBones = [
	  {  boneUri : "123457",  label : "nuerocranium_5932",  type : "Neurocranium", boneOrgans : "2"},
	  {  boneUri : "123456",  label : "viscerocranium_1954",  type : "Viscerocranium", boneOrgans : "3"},
	]
