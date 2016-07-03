<#include "pageInit.ftl">


${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/entryFormTypes.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/elements.js"></script>')}


<!---
Coherent Bone Regions
-->
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/bonyPelvis.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/lowerLimb.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/pelvicGridle.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/shoulderGridle.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/skull.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/thorax.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/upperlimb.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/coherentBones/vertebralColumn.js"></script>')}

<!--
Single Bones
-->
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/singleBones/singleSkull.js"></script>')}

<!--
General Page
-->	
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/pageConfig.js"></script>'
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/query.js"></script>')}