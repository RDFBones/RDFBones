<#include "pageInit.ftl">


<script>
	
	var beforePageInit = function(){
		pageData.partlySymmetricBones = {

			//Neurocranium
			"http://purl.obolibrary.org/obo/FMA_53672" : {
		
				parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9613" ]
			},
		
			//Viscerocranium
			"http://purl.obolibrary.org/obo/FMA_53673" : {
		
				parentRegions : [ "http://purl.obolibrary.org/obo/FMA_9711",
				  		"http://purl.obolibrary.org/obo/FMA_54736",
						"http://purl.obolibrary.org/obo/FMA_52737",
						"http://purl.obolibrary.org/obo/FMA_52741",
						"http://purl.obolibrary.org/obo/FMA_52745",
						"http://purl.obolibrary.org/obo/FMA_52746",
						"http://purl.obolibrary.org/obo/FMA_52747"]
			},
		}
		
		
		pageData.classesToSelect = {
			uri : "http://purl.obolibrary.org/obo/FMA_46565", 
			subClasses : partlySymmetric1, 
			UItype : "partlySymmetric",
		} 
	}
	
</script>
		