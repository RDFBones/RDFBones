	<#macro css url>
		<link rel="stylesheet" type="text/css" href="${urls.base}/css/${url}.css">
	</#macro>
	
	<@css url="lib" />
	<@css url="image" />
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/js/previewJS/css/lightbox.css">
	
	<@css url="formGeneration/Form" />
	<@css url="formGeneration/FormElements" />
	<@css url="formGeneration/FormLoader" />
	<@css url="formGeneration/InstanceBrowser" />
	<@css url="formGeneration/Item" />
	<@css url="formGeneration/Navigator" />
	<@css url="formGeneration/SelectorTable" />
	
	<@css url="moduleLoader/tableView" />
	<@css url="moduleLoader/treeView" />	
	<@css url="moduleLoader/View" />	
	
	<@css url="pageElements/Module" />
	
	<@css url="skeletalInventoryCEF/boneSegmentField" />	
	<@css url="skeletalInventoryCEF/classSelector" />	
	<@css url="skeletalInventoryCEF/systemicPartSelector" />	
	
	<@css url="UIModules/pageElements/AddNew" />	
	<@css url="UIModules/pageElements/DataTable" />	
	<@css url="UIModules/pageElements/collector" />	
	<@css url="UIModules/pageElements/Tab" />	
	
	<@css url="UIModules/generalElements/Button" />	
	
	
	<@css url="UIModules/BoneEditor" />	
	<@css url="UIModules/LiteralEditor" />
	<@css url="UIModules/ImageEditor" />
	<@css url="UIModules/SubboneEditor" />
	<@css url="UIModules/SingleElements" />
	<@css url="UIModules/PopUpController" />