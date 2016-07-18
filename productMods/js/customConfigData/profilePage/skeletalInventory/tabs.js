pageData.individual = "http://testIndividual"


coherentTabContainer = {
	type : sw.tabContainer,
	tabs : [ skullTab, shoulderGridleTab, upperLimbTab, vertebralColumnTab,
			thoraxTab, bonyPelvisTab, lowerLimbTab ]
}

coherentTab = {
		type : sw.tab,
		tabTitle : "Coherent Skeletal Regions",
		elements : [ coherentTabContainer ]
	}

singleTabContainer = {
		type : sw.tabContainer,
		tabs : [ singleSkullTab, singleLowerLimbTab ]
	}

singleTab = {
	type : sw.tab,
	tabTitle : "Single Bones",
	elements : [singleTabContainer]
}

skeletalDivision = {
		type : sw.tab,
		tabTitle : "Skeletal Subdivision",
		elements : skeletalRegionElements,
	}

tabContainer = {
	type : sw.tabContainer,
	//tabs : [skeletalDivision, coherentTab, singleTab ],
	tabs : [ coherentTab ]}

pageData.pageElements = [ tabContainer ]
