<div>
	Skeletal Invertories
</div>
<div id="classViewer">
</div>
<script>
	var classes = [

	<#list classRelations as classRelation>
            {
            superClass : {
	    		label : "${classRelation["superClassLabel"]}" ,
	    		uri   : "${classRelation["superClass"]}"
	    	},
	    	
	    	subClass : {
	    		label : "${classRelation["subClassLabel"]}" ,
	    		uri   : "${classRelation["subClass"]}"
	    	}
          },	     
	</#list>
	]
</script>

${scripts.add('<script type="text/javascript" src="${urls.base}/js/classHierarchy/jquery-1.11.3.min.js"></script>',
 			  '<script type="text/javascript" src="${urls.base}/js/classHierarchy/library.js"></script>',
			  '<script type="text/javascript" src="${urls.base}/js/classHierarchy/variables.js"></script>',
			  '<script type="text/javascript" src="${urls.base}/js/classHierarchy/uiSetting.js"></script>',
			  '<script type="text/javascript" src="${urls.base}/js/classHierarchy/uiController.js"></script>')}

<script>
	var UIConstants = {
		minusImgSrc : "${urls.base}/images/general/minus.png",
		plusImgSrc : "${urls.base}/images/general/plus.png",
		arrowImgSrc : "${urls.base}/images/general/arrows.png",
	}
</script>

<link rel="stylesheet" href="${urls.base}/css/classHierarchy/style.css" />


