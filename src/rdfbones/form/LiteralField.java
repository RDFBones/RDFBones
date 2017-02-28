package rdfbones.form;

public class LiteralField extends FormElement{
  
  public Form subForm;
  
  public LiteralField(String name){
    super(name, new String());
    this.type = new String("literalField");
  }
  
  public LiteralField(String name, String title){
    super(name, title);
    this.type = new String("literalField");
  }
}
