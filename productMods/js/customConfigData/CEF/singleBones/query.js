
lowerLimb = [ {
	value : "http://purl.obolibrary.org/obo/FMA_24493",
	varName : "phalanxOfToe"
}, {
	value : "http://purl.obolibrary.org/obo/FMA_24492",
	varName : "metatarsal",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_24491",
	varName : "tarsal",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_9611",
	varName : "femur",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_24476",
	varName : "tibia",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_24479",
	varName : "fibula",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_24485",
	varName : "patella",
}, {

} ]

neurocranium = [ {
	value : "http://purl.obolibrary.org/obo/FMA_52734",
	varName : "frontalBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52735",
	varName : "occipitalBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_9613",
	varName : "parietalBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52734",
	varName : "occipitalBone",
} ]

viscerocranium = [ {
	value : "http://purl.obolibrary.org/obo/FMA_52740",
	varName : "ethmoid",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52749",
	varName : "hyoidBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_54736",
	varName : "inferiorNasalConcha",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52741",
	varName : "lacrimalBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52748",
	varName : "mandible",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_9711",
	varName : "maxilla",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52745",
	varName : "nasalBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52746",
	varName : "palatineBone",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52736",
	varName : "sphenoid",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52737",
	varName : "temporal",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_9710",
	varName : "vomer",
}, {
	value : "http://purl.obolibrary.org/obo/FMA_52747",
	varName : "zygomaticBone",
} ]


pageData.boneOrganClasses = neuroCranium.concat(viscerocranium).concat(lowerLimb)
