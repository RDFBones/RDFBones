package rdfbones.formProcessing;

import java.util.List;
import java.util.Map;

public interface WebappConnector {

  public String getUnusedURI();

  public String getInputParameter(String parameter);

  public List<Map<String, String>> sparqlResult(String queryStr, List<String> uris,
    List<String> literals);

  public void log(String msg);
  
  public boolean addTriples(String triples, String editKey);
  
  public boolean removeTriples(String triples, String editKey);	
}
