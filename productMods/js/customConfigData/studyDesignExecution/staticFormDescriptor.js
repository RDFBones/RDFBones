

var formDescription = [ {
	type : "adder",
	label : "Study Design Execution",
	dataKey : "assayType",
	subform :  {
	    style : "inline",        
	    elements : [{
			type : "adder",
			label : "Bone Segment",
			dataKey : "boneSegment",
		}, {
			type : "selector",
			label : "Measurement Datum",
			dataKey : "measurementDatum",
		}]
	}
}]
