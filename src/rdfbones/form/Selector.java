package rdfbones.form;

public class Selector extends FormElement{
  
  public Form subForm;
  public Selector(String name, String title){
    super(name, title);
    this.type = new String("selector");
  }
}
