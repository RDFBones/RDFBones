<#include "pageInit.ftl">


<script>
	var beforePageInit = function(){

		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		customDataOperations =  [{
		    object : "pageData.classesToSelect.label",
		    operation : labelQuery
		}]
		
		pageData.classesToSelect = 
				
		[  	{  //Humerus 
	           uri : "http://purl.obolibrary.org/obo/FMA_13303",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	        },{ //Ulna
	           uri : "http://purl.obolibrary.org/obo/FMA_23466",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	        },{ //Radius
	           uri : "http://purl.obolibrary.org/obo/FMA_23463",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	        }, { //Carpal Bone  
	           uri : "http://purl.obolibrary.org/obo/FMA_23889",
	           subClasses2 : subClass3,
	           uiType : "primary",
	       	   label : labelQuery,
	       	}, { //Metacarpal Bone 
	           uri : "http://purl.obolibrary.org/obo/FMA_9612",
	           subClasses1 : subClass2,
	           uiType : "default",
	           label : labelQuery,
	        }, { //Phalanx of finger
           		uri : "http://purl.obolibrary.org/obo/FMA_23914",
           		subClasses2 : subClass3,
           		uiType : "primary",
           		label : labelQuery,
           } ]  
}
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}

	