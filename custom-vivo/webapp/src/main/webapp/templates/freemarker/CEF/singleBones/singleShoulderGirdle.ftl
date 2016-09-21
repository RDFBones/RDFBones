<#include "pageInit.ftl">

<script>
	var beforePageInit = function(){

		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		pageData.classesToSelect = [
			{ 
           		uri : "http://purl.obolibrary.org/obo/FMA_13321",
           		subClasses : subClass,
           		label : labelQuery,
           		uiType : "singleBone",
	       }, {
	           uri : "http://purl.obolibrary.org/obo/FMA_13394",
	           subClasses : subClass,
			   label : labelQuery,
			   uiType : "singleBone",
	       }
		] 
}
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}

	