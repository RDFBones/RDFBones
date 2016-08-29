
skullTab = {
	type : sw.tab,
	tabTitle : "Skull",
	localData : [
		{
			type : sw.constant,
			value : "http://purl.obolibrary.org/obo/FMA_46565",
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of Skull",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}],
	elements : [dryBones]
}

shoulderGirdleTab = {
	type : sw.tab,
	tabTitle : "Shoulder Girdle",
	localData : [
		{
			type : sw.constant,
			value : FMA + 24144,
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of Pectoral Girdle",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType2",
		}
	],
	elements : [dryBones]
}

upperLimbTab = {
	type : sw.tab,
	tabTitle : "Upper Limbs",
	elements : [bonyForearm, bonyCarpal, bonyMetacarpal, bonyPhalanxFinger]
}

vertebralTab = {
		
	type : sw.tab,
	tabTitle : "Shoulder Girdle",
	localData : [
		{
			type : sw.constant,
			value : FMA + 24144,
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Part of vertebra",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}
	],
	elements : [dryBones]
}

ribCageTab = {
	type : sw.tab,
	tabTitle : "Rib Cage",
	localData : [
		{
			type : sw.constant,
			value : FMA + 225549,
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Part of rib",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}
	],
	elements : [dryBones]
}


lowerLimbTab = {
	type : sw.tab,
	tabTitle : "Upper Limbs",
	elements : [ /* lower limb is missing */, bonyTarsal, bonyMetatarsal, bonyPhalanxToe]
}

tabcontainer = {
	type : sw.tabContainer,
	tabs : [ skullTab, shoulderGirdleTab, upperLimbTab, vertebralTab, lowerLimbTab]
}

pageData.pageElemnents = [tabContainer]

