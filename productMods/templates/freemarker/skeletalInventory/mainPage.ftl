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

<script type="text/javascript src="${urls.base}/js/classHierarchy/library.js">
<script type="text/javascript src="${urls.base}/js/classHierarchy/variables.js">
<script type="text/javascript src="${urls.base}/js/classHierarchy/uiSetting.js">
<script type="text/javascript src="${urls.base}/js/classHierarchy/uiController.js">

<link rel="stylesheet" href="${urls.theme}/css/classHierarchy/style.css" />


