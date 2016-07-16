<#include "pageInit.ftl">


<script>
	var beforePageInit = function(){

		pageData.pageElements = [ {
			type : sw.customPage,
			pageLoader : SingleBoneCEFController
		} ]
		
		pageData.classesToSelect = [
	       { //Femur 
	           uri : "http://purl.obolibrary.org/obo/FMA_13321",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	       }, { //Tibia
	           uri : "http://purl.obolibrary.org/obo/FMA_13394",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	       }, { //Patella 
	           uri : "http://purl.obolibrary.org/obo/FMA_13321",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	       }, { //Fibula
	           uri : "http://purl.obolibrary.org/obo/FMA_13394",
	           subClasses : subClass,
	           uiType : "singleBone",
	           label : labelQuery,
	       }, { //Phalanx of toe (FMA:24493)
	           uri : "http://purl.obolibrary.org/obo/FMA_24493",
	           subClasses2 : subClass3, 
	           uiType : "primary",
	           label : labelQuery,
	       },{ //Tarsal Bone
	           uri : "http://purl.obolibrary.org/obo/FMA_24491",
	           subClasses1 : subClass2,
	           uiType : "default",
	           label : labelQuery, 
	       }, { //Metatarsal bone
	           uri : "http://purl.obolibrary.org/obo/FMA_24492",
	           subClasses1 : subClass2, 
	           uiType : "default",
	           label : labelQuery,
	       }
		]	
	}
</script>

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/BoneOrganField.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/coherentBoneEntryForm/SystemicPartAdder.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/PartlySymmetricSingleBones.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/pageControllers/singleBonePage/SingleBoneCEFController.js"></script>')}

	