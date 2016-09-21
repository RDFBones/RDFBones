<#include "pageInit.ftl">

<script>
	var beforePageInit = function(){

		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		pageData.classesToSelect = [{
		   //Hip bone
		   uri : "http://purl.obolibrary.org/obo/FMA_16585",
		   subClasses : subClass,
		   uiType : "singleBone",
		   label : labelQuery,
		}, {
		   //Sacral Vertebra
		   uri : "http://purl.obolibrary.org/obo/FMA_12526",
		   subClasses : subClass,
		   uiType : "singleBone",
		   label : labelQuery,
		}, {
		   //Coccyegal Vertebra
		   uri : "http://purl.obolibrary.org/obo/FMA_12527",
		   subClasses : subClass,
		   uiType : "singleBone",
		   label : labelQuery,
		}]
}
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}

	