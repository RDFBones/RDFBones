
neurocranium = [ 
	"http://purl.obolibrary.org/obo/FMA_52734",
	"http://purl.obolibrary.org/obo/FMA_52735",
	"http://purl.obolibrary.org/obo/FMA_9613",
	"http://purl.obolibrary.org/obo/FMA_52734"]

viscerocranium = [ "http://purl.obolibrary.org/obo/FMA_52740",
		"http://purl.obolibrary.org/obo/FMA_52749",
		"http://purl.obolibrary.org/obo/FMA_54736",
		"http://purl.obolibrary.org/obo/FMA_52741",
		"http://purl.obolibrary.org/obo/FMA_52748",
		"http://purl.obolibrary.org/obo/FMA_9711",
		"http://purl.obolibrary.org/obo/FMA_52745",
		"http://purl.obolibrary.org/obo/FMA_52746",
		"http://purl.obolibrary.org/obo/FMA_52736",
		"http://purl.obolibrary.org/obo/FMA_52737",
		"http://purl.obolibrary.org/obo/FMA_9710",
		"http://purl.obolibrary.org/obo/FMA_52747" ]


pageData.neurocraniumClasses = neurocranium
pageData.viscerocraniumClasses = viscerocranium

singleNeurocranium = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "Neurocranium",
					key : "boneLabel",
				}, {
					type : sw.constant,
					value : "singleNeurocranium",
					key : "dataKey",
				}],
		elements : [ singleBones]
	}

singleViscerocranium = {
		type : sw.container,
		localData : [
				{
					type : sw.constant,
					value : "Viscerocranium",
					key : "boneLabel",
				}, {
					type : sw.constant,
					value : "singleViscerocranium",
					key : "dataKey",
				}],
		elements : [ singleBones]
	}

singleSkullTab = {
	type : sw.tab,
	tabTitle : "Skull",
	elements : [singleNeurocranium, singleViscerocranium]
}
