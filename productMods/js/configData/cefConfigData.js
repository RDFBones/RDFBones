pageData.cefConfig = [

{
	uri : "set",
	label : "set",
	systemicParts : [ {
		uri : "A1",
		label : "A1",
		subClasses : [ {
			uri : "leftA1",
			label : "leftA1",
		}, {
			uri : "rightA1",
			label : "rightA1",
		} ]
	}, {
		uri : "B1",
		label : "B1",
		subClasses : [ {
			uri : "leftB1",
			label : "leftB1",
		}, {
			uri : "rightB1",
			label : "rightB1",
		} ]
	} ]
}, {
	uri : "leftSet",
	label : "leftSet",
	systemicParts : [ {
		uri : "leftA1",
		label : "leftA1",
	}, {
		uri : "leftB1",
		label : "leftB1",
	} ]
}, {
	uri : "rightSet",
	label : "rightSet",
	systemicParts : [ {
		uri : "rightA1",
		label : "rightA1",
	}, {
		uri : "rightB1",
		label : "rightB1",
	} ]
}

]

pageData.boneDivisions2 = [ { systemicPartLabel : 'Left claviclel' , systemicPart : 'http://purl.obolibrary.org/obo/FMA_13323l' , boneDivisionLabel : 'Skeleton of left pectoral girdlel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_24164l' ,  } , { systemicPartLabel : 'Left scapulal' , systemicPart : 'http://purl.obolibrary.org/obo/FMA_13396l' , boneDivisionLabel : 'Skeleton of left pectoral girdlel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_24164l' ,  } , { systemicPartLabel : 'Right claviclel' , systemicPart : 'http://purl.obolibrary.org/obo/FMA_13322l' , boneDivisionLabel : 'Skeleton of right pectoral girdlel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_24163l' ,  } , { systemicPartLabel : 'Right scapulal' , systemicPart : 'http://purl.obolibrary.org/obo/FMA_13395l' , boneDivisionLabel : 'Skeleton of right pectoral girdlel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_24163l' ,  } ,  ]

pageData.boneDivisions1 = [ { inputClassLabel : 'Skeleton of pectoral girdlel' , inputClass : 'http://purl.obolibrary.org/obo/FMA_24141l' , subClass : 'http://purl.obolibrary.org/obo/FMA_13322l' , subClassLabel : 'Right claviclel' , boneDivisionLabel : 'Claviclel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_13321l' ,  } , { inputClassLabel : 'Skeleton of pectoral girdlel' , inputClass : 'http://purl.obolibrary.org/obo/FMA_24141l' , subClass : 'http://purl.obolibrary.org/obo/FMA_13323l' , subClassLabel : 'Left claviclel' , boneDivisionLabel : 'Claviclel' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_13321l' ,  } , { inputClassLabel : 'Skeleton of pectoral girdlel' , inputClass : 'http://purl.obolibrary.org/obo/FMA_24141l' , subClass : 'http://purl.obolibrary.org/obo/FMA_13396l' , subClassLabel : 'Left scapulal' , boneDivisionLabel : 'Scapulal' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_13394l' ,  } , { inputClassLabel : 'Skeleton of pectoral girdlel' , inputClass : 'http://purl.obolibrary.org/obo/FMA_24141l' , subClass : 'http://purl.obolibrary.org/obo/FMA_13395l' , subClassLabel : 'Right scapulal' , boneDivisionLabel : 'Scapulal' , boneDivision : 'http://purl.obolibrary.org/obo/FMA_13394l' ,  } ,  ]
