


//Counts
/*
SELECT ?parent ?label (COUNT(?subClass) as ?subClassCount)
WHERE
{
   ?parent      rdfs:subClassOf    ?rib  .
   ?subClass     rdfs:subClassOf   ?parent .
   ?parent     rdfs:label               ?label  . 
   FILTER ( ?rib  = <http://purl.obolibrary.org/obo/FMA_7574> )
} GROUP BY ?parent  ?label 
*/
//Primary 


pageData.ribs = {
	uri : FMA + "7574",
	subClasses : subClass
}

pageData.pageElements = [ {
	type : sw.customPage,
	pageLoader : RibController,
} ]