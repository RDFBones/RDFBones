<#include "pageInit.ftl">



<div id = "testButton"> 
	TestSkeletRegions	
</div>
<script>

	var toSend = {
		individual : "http://testIndividual",
		operation : "addSkeletalRegion",
		skeletalDivision : {
			uri : "123456",
			label : "Label",
			type : "new",	
			boneDivision : [{
					boneOrgan : [ {
						uri : 'http://purl.obolibrary.org/obo/FMA_52748',
						label : 'Mandible',
						type : 'new',
						comp2State : {
							uri : 'http://w3id.org/rdfbones/core#complete',
							type : 'existing',
							} 
						},{
						uri : 'http://purl.obolibrary.org/obo/FMA_52748',
						label : 'Mandible',
						type : 'new',
						comp2State : {
							uri : 'http://w3id.org/rdfbones/core#complete',
							type : 'existing',
						}
					}],
					type : 'new',
					uri : 'http://purl.obolibrary.org/obo/FMA_53673',
					label : 'Viscerocranium',
					}
			],
		},
		}
	
	$("#testButton").click(function(){
		console.log(toSend)
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : "http://localhost:8080/vivo/dataInput",
			data : "dataToStore=" + JSON.stringify(toSend)
		}).done((function(msg) {
		
			console.log(msg)	
		}).bind(this))
		
	})
</script>



${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/pageTypes.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/elements.js"></script>')}


<!--
Skeletal Regions
-->

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/skeletalRegion/elements.js"></script>')}
	

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
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/singleBones/singleLowerLimb.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/singleBones/singleSkull.js"></script>')}

<!--
General Page
-->	
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/pageConfig.js"></script>'
	'<script type="text/javascript" src="${urls.base}/js/customConfigData/profilePage/skeletalInventory/query.js"></script>')}