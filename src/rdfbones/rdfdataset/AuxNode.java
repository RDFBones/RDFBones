package rdfbones.rdfdataset;

public class AuxNode extends RDFNode{

	String type;
	public AuxNode(String varName) {
		super(varName);
		// TODO Auto-generated constructor stub
	}
	
	public AuxNode(String varName, String type) {
		super(varName);
		this.type = type;
	}
	
}
