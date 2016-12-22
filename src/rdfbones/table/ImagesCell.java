package rdfbones.table;

public class ImagesCell extends TableCell{
	
	public ImagesCell(int number){
		super("Images", "isDepicted", number);
		this.type = new String("imagesCell");
	}
}
