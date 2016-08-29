

/*
bonyForearm = {
		
	type : sw.container,
	localData : [
		{
			type : sw.constant,
			value : "http://purl.obolibrary.org/obo/FMA_71199",
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of Forearm",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType2",
		}],
	elements : [dryBones]
}
*/
bonyTarsal = {
		
	type : sw.container,
	localData : [
		{
			type : sw.constant,
			value : FMA + "232148",
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of Carpal Bones",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}],
	elements : [dryBones]
}

bonyMetatarsal = {
		
	type : sw.container,
	localData : [
		{
			type : sw.constant,
			value : FMA + "34595",
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of Metacarpal Bone",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}],
	elements : [dryBones]
}

bonyPhalanxToe = {
		
	type : sw.container,
	localData : [
		{
			type : sw.constant,
			value : FMA + "64087",
			key : "skeletalDivisionClass"
		},{
			type : sw.constant,
			value : "Bony Parts of phalanx of finger",
			key : "typeLabel",
		},{
			type : sw.constant,
			key : "formUri",
			value : "bonyPartType1",
		}],
	elements : [dryBones]
	}