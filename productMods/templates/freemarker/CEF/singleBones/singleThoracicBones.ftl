<#include "pageInit.ftl">

<script>
	var beforePageInit = function(){

		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		pageData.classesToSelect = {
		   //Rib
		   uri : "http://purl.obolibrary.org/obo/FMA_7574",
		   subClasses1 : subClass2,
		   uiType : "default",
		   label : labelQuery,  
		}
	}	
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}