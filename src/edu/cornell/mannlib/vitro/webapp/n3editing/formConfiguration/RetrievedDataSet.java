package edu.cornell.mannlib.vitro.webapp.n3editing.formConfiguration;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.hp.hpl.jena.query.ResultSet;

import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.dao.jena.N3Utils;
import edu.cornell.mannlib.vitro.webapp.dao.jena.QueryUtils;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.DataSet;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triple;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.Triples;
import edu.cornell.mannlib.vitro.webapp.n3editing.rdfdataset.UnionTriples;

public class RetrievedDataSet extends DataSet{

  public List<Triple> triples = new ArrayList<Triple>();
  public List<UnionTriples> unionTripes = new ArrayList<UnionTriples>();
  public List<Triples> multiTriples = new ArrayList<Triples>();
  public List<String> selectLiterals = new ArrayList<String>();
  public List<String> selectUris = new ArrayList<String>();
  public List<String> inputVars = new ArrayList<String>();
  public Map<String, String> filters = new HashMap<String, String>();
  private static final Log log = LogFactory.getLog(DataSet.class.getName());

@Override
public void setData(Form form){
    
    String query = new String("SELECT");
    //Select Variables
    
    for(String var : this.selectUris){
      query += " ?" + var;
    }
    
    for(String var : this.selectLiterals){
      query += " ?" + var;
    }
    query += "\nWHERE { \n ";
    
    
    String triples = new String("");
    //Single triples
    for(Triple t : this.triples){
      triples += t.getTriple();
    }
    
    //Multiple triples
    for(Triples t : this.multiTriples){
      triples += t.getTriples();
    }
    
    for(String key : this.filters.keySet()){
      triples += "\t FILTER ( ?" + key + " = <" + this.filters.get(key) + "> ) . \n";
    }
    
    List<String> unionQueries = new ArrayList<String>();
    int cnt = 0;
    for(UnionTriples unionTriples : this.unionTripes){
      List<String> existing = unionTriples.getExisting(cnt);
      
      String buf = new String(triples);
      for(Triple t : unionTriples.additional){
        String q = t.getTriple();
        //Delete from the existing
        log.info(q);
        buf = buf.replace(q, "");
      }
      log.info("Buf");
      log.info(buf);
      String replacedQuery = this.getReplacedQuery(existing, cnt, buf);
      
      //Replaced query is the original extended with the union
      replacedQuery += unionTriples.getTriples();
      //Add the additional queries
      replacedQuery += unionTriples.getAdditional();
      //Now I have to remove the all the additional queries
      
      unionQueries.add(replacedQuery);
      cnt++;
    }
    //Assemble UNION queries if some exists
    
    if(unionQueries.size() > 0){
      query += "{ \n " + triples + " } ";
      
      for(String unionQuery : unionQueries){
        query += "UNION { \n " + unionQuery + " }";
      }
      query += "\n } ";
    } else {
      query += triples + " } ";
    }
    
    //MyLog
    log.info("Query");
    log.info(query);

    List<String> missingVars = checkInputVariables(form.vreq);

    if(missingVars.size() > 0){
      form.errors.put("missingVars", missingVars);
    } else {
      String readyQuery = new String();
      ResultSet resultSet;
      Map<String, String> queryVars = new HashMap<String, String>();

      readyQuery = N3Utils.setPrefixes(null, query);
      readyQuery = N3Utils.subInputUriQueryList(readyQuery, this.inputVars, form.vreq);
      
      form.debugData.get("dataQuery").data.put(this.name, readyQuery);
      
      resultSet = QueryUtils.getQueryResults(readyQuery, form.vreq);
      this.data = QueryUtils.getQueryVarsList(resultSet, this.selectUris, this.selectLiterals);
      
      //log.info(this.data.toString());      
    }
  }

  List<String> checkInputVariables(VitroRequest vreq){
    
    List<String> missingVars = new ArrayList<String>();
    for(String inputVar : this.inputVars){
      if(vreq.getParameter(inputVar) == null){
        missingVars.add(inputVar);
      }
    }
    return missingVars;
  }
  
  public String getReplacedQuery(List<String> variable, int cnt, String query){
    
    for(String var : variable){
      //Remove @ character
      var = "?" + var;
      query = query.replaceAll("\\" + var, var + Integer.toString(cnt)); 
    }
    return query;
  }
  
}
