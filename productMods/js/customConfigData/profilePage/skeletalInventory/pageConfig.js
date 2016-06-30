

coherentTabContainer = {
	type : sw.tabContainer,
	tabs : [ skullTab, shoulderGridleTab, upperLimbTab, vertebralColumnTab,
			thoraxTab, bonyPelvisTab, lowerLimbTab ]
}

coherentTab = {
		type : sw.tab,
		tabTitle : "Coherent Bone Regions",
		elements : [ coherentTabContainer ]
	}

singleTab = {
	type : sw.tab,
	tabTitle : "Single Bones",
	elements : []
}

tabContainer = {
	type : sw.tabContainer,
	tabs : [ coherentTab, singleTab ]
}

pageData.pageElements = [ tabContainer ]
