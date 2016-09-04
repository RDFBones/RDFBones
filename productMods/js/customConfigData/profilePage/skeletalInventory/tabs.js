coherentTabContainer = {
	type : sw.tabContainer,
	tabs : [ skullTab, shoulderGridleTab, upperLimbTab, vertebralColumnTab,
			thoraxTab, bonyPelvisTab, lowerLimbTab ]
}

pageData.pageElements = [ {
	type : sw.literalEditor,
	title : {
		type : sw.constant,
		value : "Label",
	},
	subject : {
		type : sw.global,
		key : "individual",
	},
	predicate : {
		type : sw.constant,
		value : "rdfs:label",
	}
}, coherentTabContainer ]
