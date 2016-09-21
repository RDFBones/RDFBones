
/*
SELECT ?subClass ?label  (COUNT(?subClasses) as ?count)
WHERE
{
      ?subClass            rdfs:subClassOf  <http://purl.obolibrary.org/obo/FMA_24493>  .
      ?subClass            rdfs:label  ?label .
      ?subClasses        rdfs:subClassOf   ?subClass  .
 }  GROUP BY ?subClass ?label 
 */

		 
/*
	 SELECT ?label  (COUNT(?subClass) as ?count)
			 WHERE
			 {
			       ?subClass      rdfs:subClassOf   ?rib ,
			       ?rib                rdfs:label               ?label , 
			      FILTER ( ?rib  = http://purl,obolibrary,org/obo/FMA_7574" )
			  }  GROUP BY ?rib ?label  
*/		 

var rootPhalanxArr = [{
	
	uri : FMA + "24493",
	label : "Phalanx of toe",
	count : 45,
}]

var rootPhalanx = {
	
	uri : FMA + "24493",
	label : "Phalanx of toe",
	count : 45,
}

var irregularPhalanxArr = [
		
	{
		uri : FMA + "75830",
		label : "Distal phalanx of toe",
		count : "15",
	},
	{
		uri : FMA + "75828",
		label : "Proximal phalanx of toe",
		count : "15",
	},	
	{
		uri : FMA + "75829",
		label : "Middle phalanx of toe",
		count : "12"
	}
]


var thirdaryPhalanxArr = [
		
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32884",
		label : "Phalanx of big toe",
		count : "6",
	},
	{
	
		uri : "http://purl.obolibrary.org/obo/FMA_32899",
		label : "Phalanx of second toe",
		count : "9",
	},
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32900",
		label : "Phalanx of third toe",
		count : "9",
	}, 
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32901",
		label : "Phalanx of fourth toe",
		count : "9",
	}, 
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32900",
		label : "Phalanx of third toe",
		count : "9",
	}, 
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32902",
		label : "Phalanx of little toe",
		count : "9",
		parents : [FMA + "75830"],
	}
]

	
big = FMA + "32884"
second = FMA + "32899"
third = FMA + "32900"
fourth = FMA + "32901"
little = FMA + "32902"

distal = FMA + "75830"
proximal = FMA + "75828"
middle = FMA + "75829"

var secondaryPhalanxArr = [
	
	// Big
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32627",
		label : "Distal phalanx of big toe",
		count : "2",
		parent : big	
	}, {
		uri : "http://purl.obolibrary.org/obo/FMA_43252",
		label : "Proximal phalanx of big toe",
		count : "2",
		parent : big
	},

	
	// Second
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32618",
		label : "Proximal phalanx of second toe",
		count : "2",
		parent : second,
	},	{
		uri : "http://purl.obolibrary.org/obo/FMA_32628",
		label : "Distal phalanx of second toe",
		count : "2",
		parent : second,	
	},{
		uri : "http://purl.obolibrary.org/obo/FMA_32623",
		label : "Middle phalanx of second toe",
		count : "2",
		parent : second,
	},

	// Third
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32624",
		label : "Middle phalanx of third toe",
		count : "2",
		parent : third,

	},{
		uri : "http://purl.obolibrary.org/obo/FMA_32629",
		label : "Distal phalanx of third toe",
		count : "2",
		parent : third,

	},{
		uri : "http://purl.obolibrary.org/obo/FMA_32619",
		label : "Proximal phalanx of third toe",
		count : "2",
		parent : third,
	},
	
	// Fourth
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32620",
		label : "Proximal phalanx of fourth toe",
		count : "2",
		parent : fourth,
	},{
		uri : "http://purl.obolibrary.org/obo/FMA_32625",
		label : "Middle phalanx of fourth toe",
		count : "2",
		parent : fourth,
	}, {
		uri : "http://purl.obolibrary.org/obo/FMA_32630",
		label : "Distal phalanx of fourth toe",
		count : "2",
		parent : fourth,
	},
	
	// Little
	{
		uri : "http://purl.obolibrary.org/obo/FMA_32631",
		label : "Distal phalanx of little toe",
		count : "2",
		parent : little,
	}, {
		uri : "http://purl.obolibrary.org/obo/FMA_230984",
		label : "Middle phalanx of little toe",
		count : "2",
		parent : little,
	}, {
		uri : "http://purl.obolibrary.org/obo/FMA_32621",
		label : "Proximal phalanx of little toe",
		count : "2 ",
		parent : little,
	}]



distalBig = FMA + "32627"
distalSecond = FMA + "32628"
distalThird = FMA + "32629"
distalFourth = FMA + "32630"
distalLittle = FMA + "32631"

proximalBig = FMA + "43252"
proximalSecond = FMA + "32618"
proximalThird = FMA + "32619"
proximalFourth = FMA + "32620"
proximalLittle = FMA + "32621"

middleSecond = FMA + "32623"
middleThird = FMA + "32624"
middleFourth = FMA + "32625"
middleLittle = FMA + "230984"	


var primaryPhalanxArr = [{
	uri : "http://purl.obolibrary.org/obo/FMA_32641",
	label : "Distal phalanx of left little toe",
	parent : distalLittle
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32640",
	label : "Distal phalanx of right little toe",
	parents : distalLittle
}, {
	uri : "http://purl.obolibrary.org/obo/FMA_62635",
	label : "Proximal phalanx of left second toe",
	parent : proximalSecond
},{
	uri : "http://purl.obolibrary.org/obo/FMA_62634",
	label : "Proximal phalanx of right second toe",
	parent : proximalSecond
},
// /////////

{
	uri : "http://purl.obolibrary.org/obo/FMA_62639",
	label : "Proximal phalanx of left fourth toe",
	parent : proximalFourth
},{
	uri : "http://purl.obolibrary.org/obo/FMA_62638",
	label : "Proximal phalanx of right fourth toe",
	parent : proximalFourth
},
// ////////

{
	uri : "http://purl.obolibrary.org/obo/FMA_32645",
	label : "Middle phalanx of left third toe",
	parent : middleThird
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32644",
	label : "Middle phalanx of right third toe",
	parent : middleThird
},

// ////////

{
	uri : "http://purl.obolibrary.org/obo/FMA_62651",
	label : "Distal phalanx of left big toe",
	parent : distalBig
},{
	uri : "http://purl.obolibrary.org/obo/FMA_62650",
	label : "Distal phalanx of right big toe",
	parent : distalBig
},

// ////////
{
	uri : "http://purl.obolibrary.org/obo/FMA_62653",
	label : "Distal phalanx of left second toe",
	parent : distalSecond
},{
	uri : "http://purl.obolibrary.org/obo/FMA_62652",
	label : "Distal phalanx of right second toe",
	parent : distalSecond
},
// //////////

{
	uri : "http://purl.obolibrary.org/obo/FMA_230988",
	label : "Middle phalanx of left little toe",
	parent : middleLittle
},{
	uri : "http://purl.obolibrary.org/obo/FMA_230986",
	label : "Middle phalanx of right little toe",
	parent : middleLittle
},
// ////////

{
	uri : "http://purl.obolibrary.org/obo/FMA_32641",
	label : "Proximal phalanx of left little toe",
	parent : proximalLittle
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32640",
	label : "Proximal phalanx of right little toe",
	parent : proximalLittle
},
// ///////

{
	uri : "http://purl.obolibrary.org/obo/FMA_43254",
	label : "Proximal phalanx of left big toe",
	parent : proximalBig
},{
	uri : "http://purl.obolibrary.org/obo/FMA_43253",
	label : "Proximal phalanx of right big toe",
	parent : proximalBig
},

// ///////
 
{
	uri : "http://purl.obolibrary.org/obo/FMA_32655",
	label : "Distal phalanx of left third toe",
	parent : distalThird
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32654",
	label : "Distal phalanx of right third toe",
	parent : distalThird
},

// //////

{
	uri : "http://purl.obolibrary.org/obo/FMA_32647",
	label : "Middle phalanx of left fourth toe",
	parent : middleFourth
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32646",
	label : "Middle phalanx of right fourth toe",
	parent : middleFourth
},
// //////
 {
	uri : "http://purl.obolibrary.org/obo/FMA_62637",
	label : "Proximal phalanx of left third toe",
	parent : proximalThird
 },{
	uri : "http://purl.obolibrary.org/obo/FMA_62636",
	label : "Proximal phalanx of right third toe",
	parent : proximalThird
},

// //////
{
	uri : "http://purl.obolibrary.org/obo/FMA_62657",
	label : "Distal phalanx of left fourth toe",
	parent : distalFourth
},{
	uri : "http://purl.obolibrary.org/obo/FMA_62665",
	label : "Distal phalanx of right fourth toe",
	parent : distalFourth
},

// //////
{
	uri : "http://purl.obolibrary.org/obo/FMA_32643",
	label : "Middle phalanx of left second toe",
	parent : middleSecond
},{
	uri : "http://purl.obolibrary.org/obo/FMA_32642",
	label : "Middle phalanx of right second toe",
	parent : middleSecond
}]



