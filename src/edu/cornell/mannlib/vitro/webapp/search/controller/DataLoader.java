
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
      String[] inputParam1 = { "subject", "predicate"};
      String[] uris1 = {"object"};
      String[] literals1 = { "label" };

      result = this.performQuery(Query, inputParam1, uris1, literals1);
      break;

     /*
      * Coherent Skeletal Division 
      */
    
    case "instances" :
      
      String[] inputParamInst = { "class"};
      String[] urisInst = {"uri", "type" };
      String[] literalsInst = { "label" , "typeLabel"};
      result = this.performQuery(instancesQuery, inputParamInst, urisInst, literalsInst);
      break;
      
    
    case "completeness" :
      
      String[] inputParamComp = { "boneOrgan"};
      String[] urisComp = {"object"};
      String[] literalsComp = {};
      result = this.performQuery(completenessQuery, inputParamComp, urisComp, literalsComp);
      break;
      
    case "completenessState" :
      
      String[] inputParamCompState = { "boneOrgan"};
      String[] urisCompState= {"object"};
      String[] literalsCompState = {};
      result = this.performQuery(completenessQueryState, inputParamCompState, urisCompState, literalsCompState);
      break;  
      
    case "coherentSkeletalDivisions":
      
      String[] inputParamCSD = { "skeletalInventory" };
      String[] urisCSD = { "uri", "type" };
      String[] literalsCSD = { "skeletalDivisionCount", "label" };
      result = this.performQuery(CoherentSkeletalDivision, inputParamCSD, urisCSD, literalsCSD);
      break;
      
     /*
      * Skeletal Division 
      */
    case "skeletalDivisions":
    
      String[] inputParamSD = { "skeletalInventory" };
      String[] urisSD = { "uri", "type" };
      String[] literalsSD = { "boneOrganCount", "label" };
      result = this.performQuery(SkeletalDivision, inputParamSD, urisSD, literalsSD);
      break;
    
     /*
      * Bone Organs
      */
    case "singleBones" :
      String[] inputParam101 = { "skeletalInventory" };
      String[] uris101 = {"boneOrgan", "type", "completenessState", "completeness", "skeletalDivisionType"};
      String[] literals101 = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(singleBoneQuery1, inputParam101, uris101, literals101);
      break;  
    
    case "singleBonesWithout" :
      String[] inputParam1010 = {};
      String[] uris1010 = {"uri", };
      String[] literals1010 = {};
      result = this.performQuery(singleBoneQuery1Without, inputParam1010, uris1010, literals1010);
      break;    
      
    case "boneOrgans":
      
      String[] inputParamBO = { "skeletalInventory" };
      String[] urisBO = { "uri", "type" };
      String[] literalsBO = { "completenessLabel", "label", "typeLabel" };
      result = this.performQuery(BoneOrgan, inputParamBO, urisBO, literalsBO);
      break;
      
    case "boneOrganOfSkeletalDivision" :
      String[] inputParam2 = { "skeletalDivision" };
      String[] uris2 = {"uri", "type", "completenessState", "completeness"};
      String[] literals2 = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(BoneOrganOfSkeletalDivision, inputParam2, uris2, literals2);
      break;    
    
      
    /*
    case "coherentSkeletalRegions" : 
      
      String[] inputCSR = { "boneDivision" };
      String[] urisCSR = {"boneOrgan", "type", "completenessState", "completeness"};
      String[] literalsCSR = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(BoneOrganQuery, inputCSR, urisCSR, literalsCSR);
      break;   
      */
      
      
    case "existingBoneOrgan" :  
      String[] inputParam21 = { "skeletalInventory" };
      String[] uris21 = {"boneOrgan", "type", "completenessState", "completeness"};
      String[] literals21 = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(ExistingBoneOrgan, inputParam21, uris21, literals21);
      break;
    
    case "existingBoneOrgan1" :  
      String[] inputParam211 = { "skeletalInventory" };
      String[] uris211 = {"uri", "type", "comp2State", "completeness"};
      String[] literals211 = {"label", "typeLabel", "completenessLabel"};
      result = this.performQuery(ExistingBoneOrgan1, inputParam211, uris211, literals211);
      break;  
     
    case "existingCoherentSkeletalRegion" :  
      String[] inputParam2111 = { "skeletalInventory" };
      String[] uris2111 = {"uri", "type"};
      String[] literals2111 = {"label", "typeLabel"};
      result = this.performQuery(ExistingSkeletalRegions, inputParam2111, uris2111, literals2111);
      break;  
     
    case "subClasses" : 
      
      String[] inputParam3 = { "classUri"};
      String[] uris3 = {"uri", "inputClass"};
      String[] literals3 = { "label", "inputClassLabel" };
      result = this.performQuery(subClassQuery, inputParam3, uris3, literals3);
      break; 
      
    
    case "skeletalRegions":
      String[] inputParam411 = { "skeletalInventory" };
      String[] uris411 = { "skeletalRegion", "type" };
      String[] literals411 = { "coherentSkeletalDivisionCount", "label" };
      result = this.performQuery(SkeletalRegionQuery, inputParam411, uris411, literals411);
      break;  
      
    case "skeletalDivisionOfCoherentSkeletalDivision" :
      String[] inputParam41 = { "coherentSkeletalDivision" };
      String[] uris41 = { "uri", "type" };
      String[] literals41 = { "systemicPartCount", "typeLabel"};
      result = this.performQuery(skeletalDivisionOfCoherentSkeletalDivision, inputParam41, uris41, literals41);
      break;
    
    case "skeletalInventory1" :
      String[] inputParamSI1 = { "coherentSkeletalDivision" };
      String[] urisSI1 = { "skeletalInventory"};
      String[] literalsSI1 = {};
      result = this.performQuery(skeletalInventory1, inputParamSI1, urisSI1, literalsSI1);
      break;
      
    case "skeletalInventory2" :
      String[] inputParamSI2 = {"skeletalDivision"};
      String[] urisSI2 = {"skeletalInventory"};
      String[] literalsSI2 = {};
      result = this.performQuery(skeletalInventory2, inputParamSI2, urisSI2, literalsSI2);  
      break;
      
    case "skeletalInventory3" :  
      String[] inputParamSI3 = { "boneOrgan" };
      String[] urisSI3 = {"skeletalInventory"};
      String[] literalsSI3 = {};
      result = this.performQuery(skeletalInventory3, inputParamSI3, urisSI3, literalsSI3);       
      break;
      
    case "skeletalInventory4" :  
      String[] inputParamSI4 = { "skeletalInventory" };
      String[] urisSI4 = {"boneSegment"};
      String[] literalsSI4 = {};
      result = this.performQuery(skeletalInventory4, inputParamSI4, urisSI4, literalsSI4);   
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
     
      
     /*
     case "singleBones" :
       String[] inputParam10 = { "skeletalInventory", "inputType" };
       String[] uris10 = {"boneOrgan", "type", "completenessState", "completeness"};
       String[] literals10 = {"lable", "typeLabel", "completenessLabel"};
       result = this.performQuery(singleBoneQuery, inputParam10, uris10, literals10);
       break; 
     */
       
     case "mostSpecificType" :
       String[] inputParam102 = { "uri" };
       String[] uris102 = {"object"};
       String[] literals102 = {};
       result = this.performQuery(singleBoneQuery, inputParam102, uris102, literals102);
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
        
        String[] inputParam14 = { "skeletalInventory", "coherentSkeletalDivision" };
        String[] uris14 = { "uri", "type" };
        String[] literals14 = { "label"};
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
        
      case "systemicParts":
        String[] inputParamE = {"skeletalRegion"};
        String[] urisE = { "uri" , "type"};
        String[] literalsE = { "label" };
        result = this.performQuery(sytemicParts, inputParamE, urisE, literalsE);
        break;   
       
      case "systemicPartsWithCompleteness":
        String[] inputParamE1 = {"skeletalRegion"};
        String[] urisE1 = { "uri" , "type", "comp2State"};
        String[] literalsE1 = { "label" };
        result = this.performQuery(sytemicPartsWithCompleteness, inputParamE1, urisE1, literalsE1);
        break;    
        
      default :
        break;
    }
    
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
    resultSet = QueryUtils.getQueryResults(readyQuery, vreq);
    return QueryUtils.getQueryVars(resultSet, uris, literals);
  }
  
  
  private static String instancesQuery =
      ""
          + "SELECT ?uri ?label ?type ?typeLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?uri              rdf:type                 ?class . \n"
          + "    ?uri              rdfs:label               ?label . \n"
          + "    ?uri              vitro:mostSpecificType   ?type  .  \n"
          + "    ?type             rdfs:label               ?typeLabel . \n"
          + "   } \n";
  
  private static String CoherentSkeletalDivision =
      ""
          + "SELECT ?uri ?label ?type (COUNT(?skeletalDivision) as ?skeletalDivisionCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory     obo:BFO_0000051          ?completeness . \n"
          + "    ?completeness          obo:IAO_0000136          ?boneSegment . \n"
          + "    ?boneSegment           obo:regional_part_of     ?boneOrgan  . \n"
          + "    ?boneOrgan             obo:systemic_part_of     ?skeletalDivision . \n"
          + "    ?skeletalDivision      obo:systemic_part_of     ?uri . \n"
          + "    ?uri                   rdfs:label               ?label . \n"
          + "    ?uri                   vitro:mostSpecificType   ?type  .  \n"
          + "   } GROUP BY ?uri ?label ?type \n";
  
  private static String completenessQuery = 
      ""
      + "SELECT ?object \n"
      + " WHERE \n " 
      + "   { "
      + "    ?object                obo:IAO_0000136          ?boneSegment . \n"
      + "    ?boneSegment           obo:regional_part_of     ?boneOrgan  . \n"
      + "} ";
    
  private static String completenessQueryState =
      ""
      + "SELECT ?object \n"
      + " WHERE \n " 
      + "   { "
      + "    ?completeness          obo:OBI_0000999           ?object . \n" 
      + "    ?completeness          obo:IAO_0000136          ?boneSegment . \n"
      + "    ?boneSegment           obo:regional_part_of     ?boneOrgan  . \n"
      + "} ";
  
  
  private static String SkeletalDivision =
      ""
          + "SELECT ?uri ?label ?type (COUNT(?boneOrgan) as ?boneOrganCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory   obo:BFO_0000051          ?completeness . \n"
          + "    ?completeness        obo:IAO_0000136          ?boneSegment . \n"
          + "    ?boneSegment         obo:regional_part_of     ?boneOrgan  . \n"
          + "    ?boneOrgan           obo:systemic_part_of     ?uri     . \n"
          + "    ?uri                 rdfs:label               ?label   . \n"
          + "    ?uri                 vitro:mostSpecificType   ?type    .  \n"
          + "    FILTER NOT EXISTS { ?uri   obo:systemic_part_of  ?coherentSkeletalRegion }  . \n "
          + "   } GROUP BY ?uri ?label ?type ";
  
  
  private static String BoneOrgan =
      ""
          + "SELECT ?uri ?label ?type ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory       obo:BFO_0000051           ?completeness . \n"
          + "    ?completeness            obo:IAO_0000136           ?boneSegment . \n"
          + "    ?completeness            obo:OBI_0000999           ?completenessState . \n" 
          + "    ?completenessState       rdfs:label                ?completenessLabel . \n"  
          + "    ?boneSegment             obo:regional_part_of      ?uri  . \n"
          + "    ?uri                     rdfs:label                ?label   . \n"
          + "    ?uri                     vitro:mostSpecificType    ?type    .  \n"
          + "    ?type                    rdfs:label                ?typeLabel . \n "   
          + "   } ";
  
  
  private static String Query = "" + " SELECT ?object \n" + " WHERE \n "
      + "   {  \n"
      + "    ?subject    ?predicate   ?object . \n"
      + "   }  \n";

  private static String mstQuery = "" + " SELECT ?object \n" + " WHERE \n "
      + "   {  \n"
      + "    ?uri     vitro:mostSpecificType   ?type . \n"
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
  
  private static String sytemicParts =
      ""
          + "SELECT ?uri ?label ?type  \n"
          + "WHERE { \n"
          + "    ?uri              obo:systemic_part_of     ?skeletalRegion  . \n"
          + "    ?uri              rdfs:label               ?label . \n"
          + "    ?uri              vitro:mostSpecificType   ?type .  \n"
          + "   } ";
  
  private static String sytemicPartsWithCompleteness =
      ""
          + "SELECT ?uri ?label ?type ?comp2State \n"
          + "WHERE { \n"
          + "    ?uri              obo:systemic_part_of     ?skeletalRegion  . \n"
          + "    ?uri              rdfs:label               ?label . \n"
          + "    ?uri              vitro:mostSpecificType   ?type .  \n"
          + "    ?boneSegment     obo:regional_part_of      ?uri  . \n"
          + "    ?completeness    obo:IAO_0000136           ?boneSegment . \n"
          + "    ?completeness    obo:OBI_0000999           ?comp2State . \n" 
          + "   } ";
  
  
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
  
  



  
  
  private static String SkeletalRegionQuery =
      ""
          + "SELECT ?skeletalRegion ?label ?type (COUNT(?coherentSkeletalDivision) as ?coherentSkeletalDivisionCount) \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory obo:BFO_0000051  ?completeness . \n"
          + "    ?completeness    obo:IAO_0000136       ?boneSegment . \n"
          + "    ?boneSegment     obo:regional_part_of  ?boneOrgan  . \n"
          + "    ?boneOrgan       obo:systemic_part_of  ?coherentSkeletalDivision  . \n"
          + "    ?coherentSkeletalDivision  obo:systemic_part_of   ?skeletalRegion . \n "
          + "    ?skeletalRegion    rdfs:label            ?label . \n"
          + "    ?skeletalRegion    vitro:mostSpecificType   ?type .  \n"
          + "   } GROUP BY ?skeletalRegion ?label ?type \n";
  
  private static String FilteredCoherentQuery =
      ""
          + "SELECT ?uri ?label ?type \n"
          + " WHERE \n " 
          + " {  \n "
          + "    ?skeletalInventory obo:BFO_0000051         ?completeness . \n"
          + "    ?completeness      obo:IAO_0000136         ?boneSegment . \n"
          + "    ?boneSegment       obo:regional_part_of    ?uri  . \n"
          + "    ?uri               rdfs:label              ?label . \n "
          + "    ?uri               vitro:mostSpecificType  ?type . \n " 
          + "    ?uri               obo:systemic_part_of    ?coherentSkeletalDivision . \n"
          + " }";

  private static String BoneOrganOfSkeletalDivision =
      ""
          + "SELECT ?uri ?label ?typeLabel ?type ?completeness ?completenessState ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?uri                  obo:systemic_part_of      ?skeletalDivision  . \n"
          + "    ?boneSegment          obo:regional_part_of      ?uri   . \n"
          + "    ?completeness         obo:IAO_0000136           ?boneSegment . \n"
          + "    ?completeness         obo:OBI_0000999           ?completenessState . \n" 
          + "    ?completenessState    rdfs:label                ?completenessLabel . \n"  
          + "    ?uri                  vitro:mostSpecificType    ?type .  \n"
          + "    ?uri                  rdfs:label                ?label . \n " 
          + "    ?type                 rdfs:label                ?typeLabel . \n" 
          + " } ";
  

  private static String ExistingBoneOrgan =
      ""
          + "SELECT ?boneOrgan ?label ?typeLabel ?type ?completeness ?completenessState ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    FILTER NOT EXISTS { ?boneOrgan       obo:systemic_part_of  ?boneDivision  } . \n"
          + "    ?boneSegment           obo:regional_part_of      ?boneOrgan  . \n"
          + "    ?completeness          obo:IAO_0000136           ?boneSegment . \n"
          + "    ?skeletalInventory     obo:BFO_0000051           ?completeness . \n "
          + "    ?completeness          obo:OBI_0000999           ?completenessState . \n" 
          + "    ?completenessState     rdfs:label                ?completenessLabel . \n"  
          + "    ?boneOrgan             vitro:mostSpecificType    ?type . \n"
          + "    ?boneOrgan             rdfs:label                ?label . \n " 
          + "    ?type                  rdfs:label                ?typeLabel . \n"  
          + " } ";
  
  private static String ExistingBoneOrgan1 =
      ""
          + "SELECT ?uri ?label ?type ?typeLabel ?completeness ?comp2State ?completenessLabel \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory     obo:BFO_0000051           ?completeness . \n "
          + "    ?completeness          obo:OBI_0000999           ?comp2State . \n" 
          + "    ?comp2State            rdfs:label                ?completenessLabel . \n"  
          + "    ?completeness          obo:IAO_0000136           ?boneSegment . \n"
          + "    ?boneSegment           obo:regional_part_of      ?uri  . \n"
          + "    ?uri                   vitro:mostSpecificType    ?type . \n"
          + "    ?uri                   rdfs:label                ?label . \n " 
          + "    ?type                   rdfs:label                ?typeLabel . \n"  
          + "    FILTER NOT EXISTS { ?uri     obo:systemic_part_of  ?boneDivision  } . \n"
          + " } ";
  
  private static String ExistingSkeletalRegions =
      ""
          + "SELECT ?uri ?label ?type ?typeLabel  \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalInventory     obo:BFO_0000051           ?completeness . \n "
          + "    ?completeness          obo:OBI_0000999           ?comp2State . \n" 
          + "    ?comp2State            rdfs:label                ?completenessLabel . \n"  
          + "    ?completeness          obo:IAO_0000136           ?boneSegment . \n"
          + "    ?boneSegment           obo:regional_part_of      ?boneOrgan . \n "
          + "    ?boneOrgan             obo:systemic_part_of      ?uri  . \n"
          + "    ?uri                   vitro:mostSpecificType    ?type . \n"
          + "    ?uri                   rdfs:label                ?label . \n " 
          + "    ?type                  rdfs:label               ?typeLabel . \n"  
          + "    FILTER NOT EXISTS { ?uri     obo:systemic_part_of  ?boneDivision  } . \n"
          + " } ";
  
  
  private static String skeletalDivisionOfCoherentSkeletalDivision =
      ""
          + "SELECT ?uri ?type ?typeLabel (COUNT(?systemicPart) as ?systemicPartCount)  \n"
          + " WHERE \n " 
          + "   { "
          + "    ?uri                       obo:systemic_part_of    ?coherentSkeletalDivision . \n"
          + "    ?uri                       vitro:mostSpecificType  ?type . \n"
          + "    ?type                      rdfs:label              ?typeLabel . \n" 
          + "    ?systemicPart              obo:systemic_part_of    ?uri ."    
          + " } GROUP BY ?uri ?type ?typeLabel  ";
  
  
  private static String skeletalInventory1 =
      ""
          + "SELECT ?skeletalInventory \n"
          + " WHERE \n " 
          + "   { "
          + "    ?skeletalDivision          obo:systemic_part_of    ?coherentSkeletalDivision . \n"
          + "    ?boneOrgan                 obo:systemic_part_of    ?skeletalDivision . \n"
          + "    ?boneSegment               obo:regional_part_of    ?boneOrgan  . \n"  
          + "    ?completeness              obo:IAO_0000136         ?boneSegment . \n" 
          + "    ?skeletalInventory         obo:BFO_0000051         ?completeness . \n"
          + " } LIMIT 1 ";
  
  private static String skeletalInventory2 =
      ""
          + "SELECT ?skeletalInventory \n"
          + " WHERE \n " 
          + "   { "
          + "    ?boneOrgan                 obo:systemic_part_of    ?skeletalDivision . "
          + "    ?boneSegment               obo:regional_part_of    ?boneOrgan  . "  
          + "    ?completeness              obo:IAO_0000136         ?boneSegment . " 
          + "    ?skeletalInventory         obo:BFO_0000051         ?completeness . "
          + " } LIMIT 1 ";
  
  private static String skeletalInventory3 =
      ""
          + "SELECT ?skeletalInventory \n"
          + " WHERE \n " 
          + "   { "
          + "    ?boneSegment               obo:regional_part_of    ?boneOrgan  . "  
          + "    ?completeness              obo:IAO_0000136         ?boneSegment . " 
          + "    ?skeletalInventory         obo:BFO_0000051         ?completeness . "
          + " } LIMIT 1 ";
 
  private static String skeletalInventory4 =
      ""
          + "SELECT ?skeletalInventory \n"
          + " WHERE \n " 
          + "   { "
          + "    ?completeness              obo:IAO_0000136         ?boneSegment . " 
          + "    ?skeletalInventory         obo:BFO_0000051         ?completeness . "
          + " } LIMIT 1 ";
  
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
   
   private static String singleBoneQuery1Without = 
       ""
           + "SELECT ?uri \n"
           + " WHERE \n " 
           + "   { "
           + "    ?boneSegment        obo:regional_part_of    ?uri  . \n"
           + "    ?completeness       obo:IAO_0000136         ?boneSegment . \n"
           + "    ?skeletalInventory  obo:BFO_0000051         ?completeness . \n"
           + "    FILTER NOT EXISTS {  ?uri                rdfbones:singleBoneOf   ?skeletalDivisionType } . \n " 
           + "    FILTER NOT EXISTS { ?uri              obo:systemic_part_of  ?boneDivision } . \n" 
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
