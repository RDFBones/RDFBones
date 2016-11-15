
var formDescriptor = {
	title : "Study Design Execution",	
	formElements : {
		specimenCollectionProcess : {
			type : "adder",
			title : "Assays",
			//If dataKey is defined, then it is different form key of the object
			dataKey : "assayType",
			formElements : {
				boneSegment : {
					title : "Bone Segment",
					type : "adder",
				},
				measurementDatum : {
					dataKey : "measurementDatumType",
					type : "adder",
					title : "Measurement Datum",
					formElements : {
						categoricalLabel : {
							type : "selector",
						}
					},
				},
			}
		}
	}
}
