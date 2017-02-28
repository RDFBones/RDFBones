
var dummyJSON = new Object()

dummyJSON.formGraphDef = {
			type : "navigator",
			dataKey : "crid",
			predicate : "skeletalInventories",
			table : {
				title : "Select CRID of skeletal inventories",
				cells : [
							{ title : "label", dataKey : "label", num : 1, type : "literalCell"}
						],
			},
			subForm : {
				type : "navigator",
				dataKey : "skeletalInventory",
				predicate : "boneOrgans",
				table : {
					title : "Select skeletal inventory",
					cells : [{ title : "label", dataKey : "label", num : 1, type : "literalCell"}],
				},
				subForm : {
					title : "Select bone to assay",
					type : "selector",
					dataKey : "boneOrgan",
					cells : [{ title : "label", dataKey : "label", num : 1, type : "literalCell"}]
				}
			}
	}

dummyJSON.formInfo = {
		
	dataDependencies : {},
	formDescriptor : {
		formElements : [{
		type : "existingInstanceSelector",
		title : "Bone Organs",
		style : "",
		dataKey : "boneOrgans",
		table : dummyJSON.formGraphDef,
		}]
	}
}

dummyJSON.formGraphData = {
	
	tableData : [{ 
		label : "CRID1",
		crid : "crid1",
		skeletalInventories : [
		{
			label : "skeletal inventory 1",
			skeletalInventory : "skelInv1",
			boneOrgans : [{label : "bone Organ 1", boneOrgan : "boneOrgan1"}]
		},{
			label : "skeletal inventory 2",
			skeletalInventory : "skelInv2",
			boneOrgans : [{label : "boneOrgan2", boneOrgan : "boneOrgan2"}]
		}],
	},{ 
		label : "CRID2",
		crid : "crid2",
		skeletalInventories : [
		{
			label : "skeletal inventory 3",
			skeletalInventory : "skelInv3",
			boneOrgans : [{label : "boneOrgan3", boneOrgan : "boneOrgan3"}]
		},{
			label : "skeletal inventory 4",
			skeletalInventory : "skelInv4",
			boneOrgans : [{label : "boneOrgan4", boneOrgan : "boneOrgan4"}]
		}],
	}]
}

dummyJSON.formDescriptor = {
	
	dataDependencies : {
		assayType : ["subjectUri", ],
		categoricalLabel : ["measurementDatumType", ],
		measurementDatumType : ["assayType", ],
		boneSegment : ["assayType"],
	},
	formDescriptor : {
			title : "Study Design Execution",
			formElements : {
				BFO_0000051 : {
					dataKey : "assayType",
					title : "Assays",
					type : "adder",
					formElements : {
						OBI_0000293 : {
							dataKey : "boneSegment",
							title : "Bone Segment",
							type : "existingInstanceSelector",
							table : {
								dataKey : "cridReg",
								predicate : "IAO_0000219",
								type : "navigator",
								table : {
									cells : [{
											dataKey : "cridRegLabel",
											num : 1,
											title : "Label",
											type : "literalCell",}],
									title : "Select CRID registry",},
								subForm : {
									dataKey : "crid",
									predicate : "IAO_0000136",
									type : "navigator",
									table : {
										cells : [{
												dataKey : "cridLabel",
												num : 1,
												title : "Label",
												type : "literalCell",}],
										title : "Select CRID",},
									subForm : {
										dataKey : "skeletalInventory",
										predicate : "BFO_0000051",
										type : "navigator",
										table : {
											cells : [{
													dataKey : "skeletalInventoryLabel",
													num : 1,
													title : "Label",
													type : "literalCell",}],
											title : "Select skeletal inventory",},
										subForm : {
											table : {
												cells : [{
														dataKey : "label",
														num : 0,
														title : "Label",
														type : "literalCell"}, {
														dataKey : "typeLabel",
														num : 1,
														title : "Type",
														type : "literalCell",}],
												title : "Select bone organ for assay",},},},},},},
						OBI_0000299 : {
							dataKey : "measurementDatumType",
							title : "Measurement Type",
							type : "adder",
							formElements : {
								OBI_0000299 : {
									dataKey : "categoricalLabel",
									title : "",
									type : "selector",},},},},},},}}

var jsonTest = false
var jsonMapping = {
	
		formDescriptor :  dummyJSON.formDescriptor,
		//formGraphData : dummyJSON.formGraphData,
}
