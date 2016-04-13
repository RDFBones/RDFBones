	<link rel="stylesheet" type="text/css" href="${urls.base}/css/lib.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/previewJS/css/lightbox.css">
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/tableView.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/treeView.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/View.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/boneEditor.css">	
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/BoneEditor.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/LiteralEditor.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/ImageEditor.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/SubboneEditor.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/SingleElements.css">

	<div id = "pageContainer">
	</div>
	<script>
		var imgSrc = "${urls.base}/images/general/"
		var testImgSource = "${urls.base}/"
		var baseUrl = "${urls.base}/"
		var skeletalInventory = '${individual.uri!}'
	</script>

${scripts.add('<script type="text/javascript" src="${urls.base}/js/classHierarchy/jquery-1.11.3.min.js"></script>')}

${scripts.add('<script type="text/javascript" src="${urls.base}/js/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/Controller.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/previewJS/js/lightbox.js"></script>')}
	
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/library.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/stringOperation.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/treeData.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/configData.js"></script>')}
	
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/html.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/UI.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/pageLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/treeLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/treeLoaderUI.js"></script>')}
	
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/ImageEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/LiteralEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/SubboneEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/TableLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/BoneEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/SingleElements.js"></script>')}
	