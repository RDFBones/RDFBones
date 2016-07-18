inputClass = {
        value : "this.uri",
        name : "inputClass",
     }


dataOperations.subClass1 = {
   type : "query",
   queryType : "subClassWithout",
   parameters : [inputClass]  
}


dataOperations.subClass2 = {
    type : "query",
    queryType : "subClassWithout",
    parameters : [inputClass],
    subClasses : dataOperations.subClass1, 
} 

dataOperations.subClass2 = {
   type : "query",
   queryType : "subClassWithout",
   parameters : [inputClass],
   subClasses : {
        type : "query",
        queryType : "subClassWithout",
        parameters : [inputClass],
        subClasses : dataOperations.subClass1,    
   }
}


dataOperations.partlySymmetric1 = {
    systemicParts :  {
       type : "query", 
       queryType : "systemicPart", 
       parameters : [inputClass], 
       systemicParts : dataOperations.partlySymmetric2
   }       
} 


dataOperations.partlySymmetric2 = {
		
   type : "query",
   queryType : "systemicParts",
   parameters : [inputClass], 
   systemicParts : systemicPartsQuery,
   symmetricClasses : symmetricClassQuery,
   systemicParts : {
      type : "extract",
      what :  "this.systemicClassQuery",
      fromBy : "uri",
      whatBy : "subClassUri", 
   },
   systemicParts : {
      type : "merge",    
      variables : [this.systemicParts],
   },  
}


dataInit = [{
  object : "pageData.inputClasses",
  operation : {
     type : "query",
     queryType : "subClass2",
     parameters : [{
         type : sw.gloabal,
         key : "classUri",
         value : "inputClass",
     }]
 }
}]
