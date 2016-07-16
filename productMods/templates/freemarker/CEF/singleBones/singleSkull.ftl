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
		
		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		pageData.classesToSelect = {
			uri : "http://purl.obolibrary.org/obo/FMA_46565", 
			subClasses : partlySymmetric1, 
			uiType : "partlySymmetric",
		} 
	}
	
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}
