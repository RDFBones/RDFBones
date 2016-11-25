package rdfbones.form;

public class ExistingInstanceSelector extends FormElement {

  public ExistingInstanceSelector(String varName, String title){
    super(varName, title);
    this.type = new String("existingInstanceSelector");
  }
}
