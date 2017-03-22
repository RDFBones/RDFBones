package rdfbones.form;

public class AuxNodeSelector extends FormElement{
  
  public Form subForm;
  
  public AuxNodeSelector(String name){
    super(name, new String());
    this.type = new String("auxNodeSelector");
  }
  
  public AuxNodeSelector(String name, String title){
    super(name, title);
    this.type = new String("auxNodeSelector");
  }
}
