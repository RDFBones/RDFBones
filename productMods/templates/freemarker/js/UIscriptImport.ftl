<#macro js url>
	${scripts.add(
		'<script type="text/javascript" src="${urls.base}/js/${url}.js"></script>')}
</#macro>

<@js url="lib/jquery-1.11.3.min" />

<@js url="pageInit/SWMAP" />

<@js url="lib/utils" />
<@js url="lib/JSONDummy" />
<@js url="lib/dataOperation/DataLibrary" />

<@js url="UIModules/UILib/html" />	
<@js url="UIModules/UILib/PopUpController" />
<@js url="UIModules/UILib/ImgUI" />	
<@js url="UIModules/UILib/UI" />

<@js url="lib/debug/TripleDebug" />

<@js url="lib/dataOperation/Arithmetic" />
<@js url="lib/dataOperation/DataLibrary" />
<@js url="lib/dataOperation/DataOperations" />
<@js url="lib/dataOperation/stringOperation" />
<@js url="lib/dataOperation/treeData" />

<@js url="UIModules/onPageEditors/OnPageEditor" />
<@js url="UIModules/onPageEditors/LiteralEditor" />
<@js url="UIModules/onPageEditors/SelectEditor" />

<@js url="UIModules/generalElements/Button" />
<@js url="UIModules/generalElements/TextField" />
<@js url="UIModules/generalElements/TextButton" />
<@js url="UIModules/generalElements/ExistingSelector" />
<@js url="UIModules/generalElements/SelectorField" />

<@js url="UIModules/pageElements/buttonLink/ParentButtonLink" />
<@js url="UIModules/pageElements/buttonLink/AddButtonLink" />
<@js url="UIModules/pageElements/buttonLink/EditButtonLink" />

<@js url="UIModules/pageElements/Module" />	

<@js url="formGeneration/Item" />
<@js url="formGeneration/SelectorTable" />
<@js url="formGeneration/Cells" />
<@js url="formGeneration/Navigator" />
<@js url="formGeneration/TableRow" />
<@js url="formGeneration/InstanceBrowser" />
<@js url="formGeneration/InstanceSelector" />
<@js url="formGeneration/DataController" />
<@js url="formGeneration/FormElements" />
<@js url="formGeneration/FormLoader" />
	
<#--
	<@js url="UIModules/pageElements/Container" />
	<@js url="UIModules/pageElements/Row" />
	<@js url="UIModules/pageElements/LinkRow" />
	<@js url="UIModules/pageElements/DataTable" />	
	<@js url="UIModules/pageElements/LabelEditor" />	
	<@js url="UIModules/pageElements/LinkDataTable" />	
	<@js url="UIModules/pageElements/DataContainer" />
	<@js url="UIModules/pageElements/ImagesField" />
	<@js url="UIModules/pageElements/SelectorAddField" />
	<@js url="UIModules/pageElements/DataField" />
	<@js url="UIModules/pageElements/LinkField" />
	<@js url="UIModules/pageElements/TabContainer" />
	<@js url="UIModules/pageElements/LiteralField" /> -->