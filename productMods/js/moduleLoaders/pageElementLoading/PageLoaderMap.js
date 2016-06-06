var swPrefix = "http://softwareOntology.com/"
var sw = {
		tabContainer :  swPrefix + "TabContainer",
		tab : swPrefix + "Tab",
		dataContainer : swPrefix + "DataContainer",
		dataField : swPrefix + "DataField",
		literalField : swPrefix + "LiteralField",
		editButton : swPrefix + "EditButton",
		global : swPrefix + "global",
		local : swPrefix + "local",
}

var PageLoaderMap = new Object()

PageLoaderMap[sw.tabContainer] = TabContainerLoader
PageLoaderMap[sw.literalField] = LiteralLoader
PageLoaderMap[sw.tab] = TabLoader
PageLoaderMap[sw.dataContainer] =  DataContainerLoader
PageLoaderMap[sw.editButton] = EditButtonLoader
PageLoaderMap[sw.literalField] = LiteralLoader
PageLoaderMap[sw.local] = LinkDataInputLoader
PageLoaderMap[sw.global] = LinkDataInputLoader


var PageElementMap = new Object()

PageElementMap[sw.tabContainer] = TabContainer
PageElementMap[sw.tab] = TabLoader
PageElementMap[sw.dataContainer] = DataContainer


var RowElementMap = new Object()

RowElementMap[sw.editButton] = EditButton
RowElementMap[sw.literalField] = LiteralField

