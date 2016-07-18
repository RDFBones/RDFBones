pageData.queries = [
		{   
			parameters : [
				{ type : sw.constant, varName : "queryType", value : "CoherentSkeletalRegionOfSkeletalDivision" },
				{ type : sw.global, key : "individual", varName : "skeletalDivision" },
				{ type : sw.global, key : "skeletalInventory"},
			],
			mapping : "dataLoader",
			toVariable : "boneOrgans",
		}
		] 



pageData.pageElements = [{
	
	type : sw.DataTable,
	dataToDislay : {
		type : sw.global,
		key : "people"
	},
	dataFields : [
	 {
		 type : sw.literalField,
		 key : "label",
	 }, {
		 type : sw.editButton,
		 paremeters : [
		   {
			  type : sw.constant,
			  value : "pageUri",
			  varName : "personProfilePage"
		   }, {
			   type : sw.local,
			   key : "person",
			   varName : "uri",
		   } 
		 ]
	 }
	]
}]


//Initial Definition
pageData.people = {
	type : sw.queryResult,
	queryUri : "personLoader#1",
	inputParameters : [],
	images : {
		type : sw.queryResult,
		queryUri : "imageLoader#1", 
		inputParameters : [{
			type : sw.local,
			key : "person",
			varName : "uri",
		}]	
	}
}

//After the page data load process
pageData.people = [{
	person : "#348939843",
	label : "John",
	images : ["#4308944", "#82389233", "#49033409"]
},{
	person : "#348940933",
	label : "John",
	images : ["#43323234", "#2932329"]	
}]

