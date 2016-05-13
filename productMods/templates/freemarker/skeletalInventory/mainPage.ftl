	<link rel="stylesheet" type="text/css" href="${urls.base}/css/lib.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/js/previewJS/css/lightbox.css">
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/moduleLoader/tableView.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/moduleLoader/treeView.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/moduleLoader/View.css">	
	
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

${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/jquery-1.11.3.min.js"></script>')}

${scripts.add(
    '<script type="text/javascript" src="${urls.base}/js/controllers/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/controllers/Controller.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/controllers/UIController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/previewJS/js/lightbox.js"></script>'
	)}
	
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/lib/DataOperations.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/lib/configData.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/lib/html.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/lib/library.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/lib/stringOperation.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/lib/treeData.js"></script>',	
	'<script type="text/javascript" src="${urls.base}/js/lib/UI.js"></script>'
	)}
	
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/moduleLoaders/pageLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/moduleLoaders/treeLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/moduleLoaders/treeLoaderUI.js"></script>'
	)}
	
${scripts.add(
	'<script type="text/javascript" src="${urls.base}/js/UIModules/ImageEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/LiteralEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/SubboneEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/TableLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/BoneEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIModules/SingleElements.js"></script>'
	)}
	