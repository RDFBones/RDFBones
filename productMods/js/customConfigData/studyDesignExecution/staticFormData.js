

var formData = {
	
	//Currently AssayTypes are hard coded
	assayType : {
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.ExternalOccipitalProtuberance" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.FrontalAndParietalEminences" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.Glabella" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.MentalProtuberance" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.MylohyoidLine" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.ZygomaticProcess" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.SuperciliaryArch"  :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.SupramastoidCrest"  :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.MastoidProcess" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.FrSexEst.ZygomaticArch" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.NuchalPlanum" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.GonialAngle" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.MandibleAsAWhole" :{},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Assay.Zygomatics" :{},
	},
	
	categoricalLabel : {
		"http://w3id.org/rdfbones/extensions/FrSexEst#Hyperfeminine" : { label : "Hyperfeminine"},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Feminine" : { label : "Feminine"},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Indifferent" : { label : "Indifferent"},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Masculine" : { label : "Masculine"},
		"http://w3id.org/rdfbones/extensions/FrSexEst#Hypermasculine" : { label : "HyperMasculine"},
	},
}

var dataDependencies = {
	boneSegment : ["assayType"],
	measurementDatumType : ["assayType"],	
}

var dataFromAJAX = new Object()

