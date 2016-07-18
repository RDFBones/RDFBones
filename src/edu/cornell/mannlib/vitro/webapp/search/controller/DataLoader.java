package edu.cornell.mannlib.vitro.webapp.search.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.ResultSet;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.ajax.VitroAjaxController;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;

public class DataLoader extends VitroAjaxController {

  private static final Log log = LogFactory
      .getLog(PageConfigurationLoader.class);

  VitroRequest vreq;
  
  @Override
  protected void doRequest(VitroRequest vreq, HttpServletResponse response)
    throws IOException, ServletException {

    List<Map<String, String>> result = new ArrayList<Map<String, String>>();
    this.vreq = vreq;

    switch (vreq.getParameter("queryType")) {
    
    case "literal" : 
      
      String[] inputParam0 = { "subject", "predicate" };
      String[] uris0 = {};
      String[] literals0 = { "object" };
      
      result = this.performQuery(Query, inputParam0, uris0, literals0);
      break;
      
    case "object":
      String[] inputParam1 = { "individual", "predicate"};
      String[] uris1 = {"object"};
      String[] literals1 = { "label" };

      result = this.performQuery(Query, inputParam1, uris1, literals1);
      break;

    case "boneOrgans" :
      String[] inputParam2 = { "boneDivision" };
      String[] uris2 = {"boneOrgan", "type", "completenessState", "completeness"};
      String[] literals2 = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(BoneOrganQuery, inputParam2, uris2, literals2);
      break;
    case "subClasses" : 
      
      String[] inputParam3 = { "classUri"};
      String[] uris3 = {"uri", "inputClass"};
      String[] literals3 = { "label", "inputClassLabel" };
      result = this.performQuery(subClassQuery, inputParam3, uris3, literals3);
      break; 
      
    case "coherentBones":
      String[] inputParam4 = { "skeletalInventory" };
      String[] uris4 = { "boneDivision", "type" };
      String[] literals4 = { "boneOrganCount", "label" };
      result = this.performQuery(CoherentQuery, inputParam4, uris4, literals4);
      break;
      
    case "skeletalRegions":
      String[] inputParam411 = { "skeletalInventory" };
      String[] uris411 = { "skeletalDivision", "type" };
      String[] literals411 = { "coherentSkeletalDivisionCount", "label" };
      result = this.performQuery(SkeletalRegionQuery, inputParam411, uris411, literals411);
      break;  
      
    case "CoherentSkeletalRegionOfSkeletalDivision" :
      String[] inputParam41 = { "skeletalDivision" };
      String[] uris41 = { "coherentSkeletalRegion", "type" };
      String[] literals41 = { "boneOrganCount", "typeLabel"};
      result = this.performQuery(CoherentSkeletalRegionOfSkeletalDivision, inputParam41, uris41, literals41);
      break;
      
    case "sytemicParts":
      String[] inputParam5 = { "classUri" };
      String[] uris5 = { "uri", "boneOrgan" };
      String[] literals5 = { "label", "boneOrganLabel" };
      result = this.performQuery(systemicQuery, inputParam5, uris5, literals5);
      break;
      
    case "subClassesWithout" : 
      
      String[] inputParam6 = { "classUri"};
      String[] uris6 = {"uri"};
      String[] literals6 = { "label" };
      result = this.performQuery(subClassQueryWithout, inputParam6, uris6, literals6);
      break;  
    case "systemicPartsWithout":
      String[] inputParam7 = { "classUri" };
      String[] uris7 = { "uri" };
      String[] literals7 = { "label"};
      result = this.performQuery(systemicPartsWithout, inputParam7, uris7, literals7);
      break;
    case "systemicPartsWithoutNoBoneOrgan":
      String[] inputParam72 = { "classUri" };
      String[] uris72 = { "uri" };
      String[] literals72 = { "label"};
      result = this.performQuery(systemicPartsWithoutNoBoneOrgan, inputParam72, uris72, literals72);
      break;  
      
    case "constitutionalParts":
      String[] inputParam71 = { "classUri" };
      String[] uris71 = { "uri" };
      String[] literals71 = { "label"};
      result = this.performQuery(constitutionalPartsWithout, inputParam71, uris71, literals71);
      break;  
    case "regionalParts":
      String[] inputParam8 = { "classUri" };
      String[] uris8 = { "uri", "boneOrgan" };
      String[] literals8 = { "label", "boneOrganLabel" };
      result = this.performQuery(regionalQuery, inputParam8, uris8, literals8);
      break;  
    case "regionalPartsWithout":
      String[] inputParam9 = { "classUri" };
      String[] uris9 = { "uri" };
      String[] literals9 = { "label"};
      result = this.performQuery(regionalPartsWithout, inputParam9, uris9, literals9);
      break;
     
     case "singleBones" :
       String[] inputParam10 = { "skeletalInventory", "inputType" };
       String[] uris10 = {"boneOrgan", "type", "completenessState", "completeness"};
       String[] literals10 = {"lable", "typeLabel", "completenessLabel"};
       result = this.performQuery(singleBoneQuery, inputParam10, uris10, literals10);
       break; 
     
     case "singleBones1" :
       String[] inputParam101 = { "skeletalInventory" };
       String[] uris101 = {"boneOrgan", "type", "completenessState", "completeness", "skeletalDivisionType"};
       String[] literals101 = {"lable", "typeLabel", "completenessLabel"};
       result = this.performQuery(singleBoneQuery1, inputParam101, uris101, literals101);
       break; 
       
      case "sytemicPartWithSubclass" :
        
       String[] inputParam11 = { "classUri" };
       String[] uris11 = { "uri", "systemicPart", "subClass" };
       String[] literals11 = { "label", "systemicPartLabel", "subClassLabel" };
       result = this.performQuery(systemicQueryWithSubClass, inputParam11, uris11, literals11);
       break;
       
      case "skeletalDivision" :
        
        String[] inputParam12 = { "skeletalDivision" };
        String[] uris12 = { "boneDivision","boneDivisionType", "uri", "type", "completenessState" };
        String[] literals12 = { "boneDivisionLabel", "label" };
        result = this.performQuery(skeletalDivisionQuery, inputParam12, uris12, literals12);
        break;
        
      case "skeletalRegion" :
        
        String[] inputParam13 = { "skeletalRegion" };
        String[] uris13 = { "boneDivision", "type" };
        String[] literals13 = { "boneOrganCount", "label" };
        result = this.performQuery(BoneOrganQueryInput, inputParam13, uris13, literals13);
        break;  
       
      case "filteredCoherentBones" :
        
        String[] inputParam14 = { "skeletalInventory", "boneDivisionType" };
        String[] uris14 = { "boneDivision", "uri", "type", "completenessState" };
        String[] literals14 = { "boneDivisionLabel" , "label"};
        result = this.performQuery(FilteredCoherentQuery, inputParam14, uris14, literals14);
        break;  
       
      case "skeletalSubdivision":
        String[] inputParam15 = { "skeletalInventory" };
        String[] uris15 = { "skeletalSubdivision", "type" };
        String[] literals15 = { "coherentSkeletalRegionCount", "label" };
        result = this.performQuery(SkeletalSubdivision, inputParam15, uris15, literals15);
        break;   
        
      case "coherentBonesOfSubdivision":
        String[] inputParam16 = { "skeletalInventory", "skeletalSubdivision"};
        String[] uris16 = { "coherentSkeletalRegion", "type" };
        String[] literals16 = { "boneOrganCount", "label", "typeLabel" };
        result = this.performQuery(CoherenBonesOfSubdivision, inputParam16, uris16, literals16);
        break; 
        
      case "existingCoherentSubdivision":
        String[] inputParam17 = { "skeletalInventory", "existingSkeletalSubdivision", "inputType"};
        String[] uris17 = { "coherentSkeletalRegion", "type" };
        String[] literals17 = { "boneOrganCount", "label", "typeLabel" };
        result = this.performQuery(ExistingCoherentSubDivision, inputParam17, uris17, literals17);
        break;     
        
      case "existingCoherentSubdivisionToAdd":
        String[] inputParam18 = { "skeletalInventory", "existingSkeletalSubdivision", "inputType"};
        String[] uris18 = { "coherentSkeletalRegion", "type" };
        String[] literals18 = { "boneOrganCount", "label", "typeLabel" };
        result = this.performQuery(ExistingCoherentSubDivision, inputParam18, uris18, literals18);
        break;    
      
      case "subClass2":
        String[] inputParam19 = {"classUri"};
        String[] uris19 = { "uri" };
        String[] literals19 = { "label" };
        result = this.performQuery(subClass2, inputParam19, uris19, literals19);
        break; 

      case "subClass3":
        String[] inputParam191 = {"classUri"};
        String[] uris191 = { "uri" };
        String[] literals191 = { "label" };
        result = this.performQuery(subClass3, inputParam191, uris191, literals191);
        break;   
        
      default :
        break;
    }
    
    log.info(result.toString());
    if (result.size() > 0) {
      JSONArray arrayToSend = new JSONArray();
      N3Utils.setJsonArray(arrayToSend, result);
      response.getWriter().write(arrayToSend.toString());
    } else {
      JSONObject obj = new JSONObject();
      try {
        obj.append("noResult", "true");
      } catch (JSONException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
      response.getWriter().write(obj.toString());
    }
  }

  private List<Map<String, String>> performQuery(String query,
    String[] inputParam, String[] uris, String[] literals) {

    String readyQuery = new String();
    ResultSet resultSet;
    Map<String, String> queryVars = new HashMap<String, String>();

    readyQuery = N3Utils.setPrefixes(null, query);
    readyQuery = N3Utils.subInputUriQuery(readyQuery, inputParam, this.vreq);
    log.info(readyQuery);
    resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
    return QueryUtils.getQueryVars(resultSet, uris, literals);
  }

  private static String Query = "" + " SELECT ?object \n" + " WHERE \n "
      + "   {  \n"
      + "    ?subject    ?predicate   ?object . \n"
      + "   }  \n";

  private static String subClass2 = "SELECT DISTINCT ?uri ?label  "
      + " WHERE { " 
      + " ?uri       rdfs:subClassOf   ?inputClass . "
      + " ?uri       rdfs:label        ?label . "
      + " ?subClass1 rdfs:subClassOf   ?uri . "
      + " FILTER( ?inputClass  =  ?classUri )  " 
      + " } ";
  
  private static String subClass3 = "SELECT DISTINCT ?uri ?label  "
      + " WHERE { " 
      + " ?uri       rdfs:subClassOf   ?inputClass . "
      + " ?uri       rdfs:label        ?label . "
      + " ?subClass1 rdfs:subClassOf   ?uri . "
      + " ?subClass2 rdfs:subClassOf   ?subClass1 . " 
      + " FILTER( ?inputClass  =  ?classUri )  " 
      + " } ";
  
  private static String specialSubclass = "SELECT DISTINCT ?uri ?label  "
      + " WHERE { " 
      + " ?uri       rdfs:subClassOf   ?inputClass . "
      + " ?uri       rdfs:label        ?label . "
      + " FILTER NOT EXISTS { ?anySubclass rdfs:label ?uri } ."
      + " FILTER NOT EXISTS { ?uri     rdfs:subClassOf ?uri } "
      + " } ";
  
  private static String SkeletalSubdivision =
      ""
          + "SELECT ?skeletalSubdivision ?label ?type (COUNT(?coherentSkeletalRegion) as ?coherentSkeletalRegionCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory obo:BFO_0000051         ?completeness . \n"
          + "    ?completeness      obo:IAO_0000136           ?boneSegment . \n"
          + "    ?boneSegment       obo:regional_part_of      ?boneOrgan  . \n"
          + "    ?boneOrgan         obo:systemic_part_of      ?coherentSkeletalRegion  . \n"
          + "    ?coherentSkeletalRegion       obo:systemic_part_of  ?skeletalSubdivision  . \n"
          + "    ?skeletalSubdivision    rdfs:label            ?label . \n"
          + "    ?skeletalSubdivision    vitro:mostSpecificType   ?type .  \n"
          + "   } GROUP BY ?skeletalSubdivision ?coherentSkeletalRegion ?label ?type \n";
  
  
  private static String CoherenBonesOfSubdivision =
      ""
          + "SELECT ?coherentSkeletalRegion ?label ?type ?typeLabel (COUNT(?boneOrgan) as ?boneOrganCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory       obo:BFO_0000051         ?completeness . \n"
          + "    ?completeness              obo:IAO_0000136           ?boneSegment . \n"
          + "    ?boneSegment            obo:regional_part_of      ?boneOrgan  . \n"
          + "    ?boneOrgan                 obo:systemic_part_of      ?coherentSkeletalRegion  . \n"
          + "    ?coherentSkeletalRegion       obo:systemic_part_of  ?skeletalSubdivision  . \n"
          + "    ?coherentSkeletalRegion    rdfs:label            ?label . \n"
          + "    ?coherentSkeletalRegion    vitro:mostSpecificType   ?type .  \n"
          + "    ?type    rdfs:label            ?typeLabel . \n"
          + "   } GROUP BY ?coherentSkeletalRegion  ?label ?type ?typeLabel \n";
  
  private static String ExistingCoherentSubDivision =
      ""
          + "SELECT ?coherentSkeletalRegion ?label ?type ?typeLabel (COUNT(?boneOrgan) as ?boneOrganCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory       obo:BFO_0000051         ?completeness . \n"
          + "    ?completeness              obo:IAO_0000136           ?boneSegment . \n"
          + "    ?boneSegment            obo:regional_part_of      ?boneOrgan  . \n"
          + "    ?boneOrgan                 obo:systemic_part_of      ?coherentSkeletalRegion  . \n"
          + "    ?coherentSkeletalRegion       obo:systemic_part_of  ?skeletalSubdivision  . \n"
          + "    ?coherentSkeletalRegion    rdfs:label            ?label . \n"
          + "    ?coherentSkeletalRegion    vitro:mostSpecificType   ?type .  \n"
          + "    ?type    rdfs:label            ?typeLabel . \n"
          + "   } GROUP BY ?coherentSkeletalRegion  ?label ?type ?typeLabel \n";
  
  
  private static String CoherentQuery =
      ""
          + "SELECT ?boneDivision ?label ?type (COUNT(?boneOrgan) as ?boneOrganCount) \n"
          + " WHERE \n " + "   { "
          + "    ?skeletalInventory obo:BFO_0000051  ?completeness . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
          + "    ?boneDivision    rdfs:label            ?label . \n"
          + "    ?boneDivision    vitro:mostSpecificType   ?type .  \n"
          + "   } GROUP BY ?boneDivision ?label ?type \n";

  private static String SkeletalRegionQuery =
      ""
          + "SELECT ?skeletalDivision ?label ?type (COUNT(?coherentSkeletalDivision) as ?coherentSkeletalDivisionCount) \n"
          + " WHERE \n " + "   { "
          + "    ?skeletalInventory obo:BFO_0000051  ?completeness . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?boneOrgan       obo:systemic_part_of  ?coherentSkeletalDivision  . \n"
          + "    ?coherentSkeletalDivision  obo:systemic_part_of   ?skeletalDivision . \n "
          + "    ?skeletalDivision    rdfs:label            ?label . \n"
          + "    ?skeletalDivision    vitro:mostSpecificType   ?type .  \n"
          + "   } GROUP BY ?skeletalDivision ?label ?type \n";
  
  
  private static String FilteredCoherentQuery =
      ""
          + "SELECT ?boneDivision ?boneDivisionLabel ?uri ?label ?type ?completenessState \n"
          + " WHERE \n " 
          + " {  \n "
          + "    ?skeletalInventory obo:BFO_0000051         ?completeness . \n"
          + "    ?completeness      obo:IAO_0000136         ?boneSegment . \n"
          + "    ?completeness      obo:OBI_0000999         ?completenessState . \n" 
          + "    ?boneSegment       obo:regional_part_of    ?uri  . \n"
          + "    ?uri               rdfs:label              ?label . \n "
          + "    ?uri               vitro:mostSpecificType  ?type . \n " 
          + "    ?uri               obo:systemic_part_of    ?boneDivision . \n"
          + "    ?boneDivision      rdfs:label              ?boneDivisionLabel . \n"
          + "    ?boneDivision      vitro:mostSpecificType  ?boneDivisionType . \n "
          + " }";

  private static String BoneOrganQuery =
      ""
          + "SELECT ?boneOrgan ?label ?typeLabel ?type ?completeness ?completenessState ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?completeness    obo:OBI_0000999       ?completenessState . \n" 
          + "    ?completenessState    rdfs:label       ?completenessLabel . \n"  
          + "    ?boneOrgan       vitro:mostSpecificType ?type .  \n"
          + "    ?boneOrgan       rdfs:label            ?label . \n " 
          + "    ?type            rdfs:label            ?typeLabel . \n" 
          + " } ";
  
  private static String CoherentSkeletalRegionOfSkeletalDivision =
      ""
          + "SELECT ?coherentSkeletalRegion ?type ?typeLabel (COUNT(?boneOrgan) as ?boneOrganCount)  \n"
          + " WHERE \n " 
          + "   { "
          + "    ?coherentSkeletalRegion    obo:systemic_part_of    ?skeletalDivision ."
          + "    ?coherentSkeletalRegion    vitro:mostSpecificType  ?type ."
          + "    ?type                      rdfs:label            ?typeLabel . \n" 
          + "    ?boneOrgan                 obo:systemic_part_of  ?coherentSkeletalRegion ."    
          + " } GROUP BY ?coherentSkeletalRegion ?type ?typeLabel  ";
  
  
  private static String subClassQuery =
       ""
           + "SELECT ?inputClass ?inputClassLabel ?uri ?label \n"
           + " WHERE { \n "
           + "    ?uri          rdfs:subClassOf  ?inputClass . \n"
           + "    ?uri          rdfs:label       ?label. \n "
           + "    ?inputClass   rdfs:label       ?inputClassLabel . \n"
           + "    FILTER( ?inputClass  =  ?classUri )"
           + "}"; 
   
   private static String subClassQueryWithout =
       ""
           + "SELECT ?uri ?label \n"
           + " WHERE {\n "
           + "    ?uri       rdfs:subClassOf  ?classUri . \n"
           + "    ?uri       rdfs:label       ?label . \n "
           + "}"; 
   
   private static String systemicQuery = 
       "select ?uri ?label ?boneOrgan ?boneOrganLabel "
           + "  where {  "
           + "  ?boneOrgan             rdfs:label             ?boneOrganLabel ."
           + "  ?boneOrgan             rdfs:subClassOf        ?restriction . "
           + "  ?restriction           owl:onProperty         <http://purl.obolibrary.org/obo/fma#systemic_part_of> . "
           + "  ?restriction           owl:someValuesFrom     ?uri .   "
           + "  ?uri                   rdfs:label             ?label . " 
           + "  FILTER( ?uri  =  ?classUri ) ."
           + "}";
   
   private static String regionalQuery = 
       "select ?uri ?label ?boneOrgan ?boneOrganLabel "
           + "  where {  "
           + "  ?boneOrgan             rdfs:label             ?boneOrganLabel ."
           + "  ?boneOrgan             rdfs:subClassOf        ?restriction . "
           + "  ?restriction           owl:onProperty         <http://purl.obolibrary.org/obo/fma#regional_part_of> . "
           + "  ?restriction           owl:someValuesFrom     ?uri .   "
           + "  ?uri                   rdfs:label             ?label . " 
           + "  FILTER( ?uri  =  ?classUri ) ."
           + "}";
   
   private static String systemicPartsWithout = 
       "select ?uri ?label "
           + "  where {  "
           + "  ?uri                rdfs:label             ?label ."
           + "  ?uri                rdfs:subClassOf        ?restriction . "
           + "  ?restriction        owl:onProperty         <http://purl.obolibrary.org/obo/fma#systemic_part_of> . "
           + "  ?restriction        owl:someValuesFrom     ?classUri .   "
           + "}";
   
   private static String systemicPartsWithoutNoBoneOrgan = 
       "select ?uri ?label "
           + "  where {  "
           + "  ?uri                rdfs:label             ?label ."
           + "  ?uri                rdfs:subClassOf        ?restriction . "
           + "  ?restriction        owl:onProperty         <http://purl.obolibrary.org/obo/fma#systemic_part_of> . "
           + "  ?restriction        owl:someValuesFrom     ?classUri .   "
           + "  FILTER NOT EXISTS {  ?uri   rdfs:subClassOf  <http://purl.obolibrary.org/obo/FMA_5018> } . "
           + "}";
   
   private static String constitutionalPartsWithout = 
       "select ?uri ?label "
           + "  where {  "
           + "  ?uri                rdfs:label             ?label ."
           + "  ?uri                rdfs:subClassOf        ?restriction . "
           + "  ?restriction        owl:onProperty         <http://purl.obolibrary.org/obo/fma#constitutional_part_of> . "
           + "  ?restriction        owl:someValuesFrom     ?classUri .   "
           + "}";
   
   private static String regionalPartsWithout = 
       "select ?uri ?label "
           + "  where {  "
           + "  ?uri                rdfs:label             ?label ."
           + "  ?uri                rdfs:subClassOf        ?restriction . "
           + "  ?restriction        owl:onProperty         <http://purl.obolibrary.org/obo/fma#regional_part_of> . "
           + "  ?restriction        owl:someValuesFrom     ?classUri .   "
           + "}";
   
   private static String singleBoneQuery = 
       ""
           + "SELECT ?boneOrgan ?label ?typeLabel ?type ?completeness ?completenessState ?completenessLabel \n"
           + " WHERE \n " 
           + "   { "
           + "    ?boneOrgan          rdfs:label              ?label . \n "
           + "    ?boneSegment        obo:regional_part_of    ?boneOrgan  . \n"
           + "    ?completeness       obo:IAO_0000136         ?boneSegment . \n"
           + "    ?completeness       obo:OBI_0000999         ?completenessState . \n" 
           + "    ?completenessState  rdfs:label              ?completenessLabel . \n" 
           + "    ?skeletalInventory  obo:BFO_0000051         ?completeness . \n"
           + "    ?boneOrgan          rdf:type                ?inputType \n ."
           + "    ?boneOrgan          vitro:mostSpecificType  ?type .  \n"
           + "    ?type               rdfs:label              ?typeLabel . \n" 
           + "    FILTER NOT EXISTS { ?boneOrgan       obo:systemic_part_of  ?boneDivision } . \n" 
           + " } ";
   
   private static String singleBoneQuery1 = 
       ""
           + "SELECT ?boneOrgan ?skeletalDivisionType ?label ?typeLabel ?type ?completeness ?completenessState ?completenessLabel \n"
           + " WHERE \n " 
           + "   { "
           + "    ?boneOrgan          rdfbones:singleBoneOf   ?skeletalDivisionType . \n "  
           + "    ?boneOrgan          rdfs:label              ?label . \n "
           + "    ?boneSegment        obo:regional_part_of    ?boneOrgan  . \n"
           + "    ?completeness       obo:IAO_0000136         ?boneSegment . \n"
           + "    ?completeness       obo:OBI_0000999         ?completenessState . \n" 
           + "    ?completenessState  rdfs:label              ?completenessLabel . \n" 
           + "    ?skeletalInventory  obo:BFO_0000051         ?completeness . \n"
           + "    ?boneOrgan          vitro:mostSpecificType  ?type .  \n"
           + "    ?type               rdfs:label              ?typeLabel . \n" 
           + "    FILTER NOT EXISTS { ?boneOrgan       obo:systemic_part_of  ?boneDivision } . \n" 
           + " } ";
   
   private static String systemicQueryWithSubClass = 
       
       "select ?uri ?label ?systemicPart ?systemicPartLabel ?subClass ?subClassLabel "
           + "  where {  "
           + "  ?subClass              rdfs:label             ?subClassLabel . " 
           + "  ?subClass              rdfs:subClassOf        ?systemicPart . "
           + "  ?systemicPart          rdfs:label             ?systemicPartLabel ."
           + "  ?systemicPart          rdfs:subClassOf        ?restriction . "
           + "  ?restriction           owl:onProperty         <http://purl.obolibrary.org/obo/fma#systemic_part_of> . "
           + "  ?restriction           owl:someValuesFrom     ?uri .   "
           + "  ?uri                   rdfs:label             ?label . " 
           + "  FILTER( ?uri  =  ?classUri ) ."
           + "}";
   
   private static String skeletalDivisionQuery = ""
       
       + "SELECT ?boneDivision ?boneDivisionType ?boneDivisionLabel ?uri ?label ?type ?completenessState  \n"
           + "  where {  " 
           + "  ?boneDivision         obo:systemic_part_of     ?inputUri .   "
           + "  ?boneDivision         rdfs:label               ?boneDivisionLabel . \n " 
           + "  ?boneDivision         vitro:mostSpecificType   ?boneDivisionType . \n "    
           + "  ?uri                  obo:systemic_part_of     ?boneDivision  . \n"
           + "  ?uri                  rdfs:label               ?label . \n " 
           + "  ?uri                  vitro:mostSpecificType   ?type . \n " 
           + "  ?boneSegment          obo:regional_part_of     ?uri . \n"
           + "  ?completeness         obo:IAO_0000136          ?boneSegment . \n"
           + "  ?completeness         obo:OBI_0000999          ?completenessState . \n" 
           + "  ?completenessState    rdfs:label               ?completenessLabel . \n"  
           + "  FILTER( ?inputUri  =  ?skeletalDivision ) ."
           + "}";
   
   private static String BoneOrganQueryInput =
       ""
           + "SELECT ?boneDivision ?label ?type (COUNT(?boneOrgan) as ?boneOrganCount) \n"
           + " WHERE \n " + "   { "
           + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
           + "    ?boneOrgan       obo:systemic_part_of  ?boneDivision  . \n"
           + "    ?boneDivision    rdfs:label            ?label . \n"
           + "    ?boneDivision    vitro:mostSpecificType   ?type .  \n"
           + "    ?boneDivision    obo:systemic_part_of  ?skeletalRegion . \n "
           + "   } GROUP BY ?boneDivision ?label ?type \n";
}
