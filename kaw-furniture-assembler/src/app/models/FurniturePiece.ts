
export class FurniturePiece {
  private static fieldNameSqlNameMapping: Map<string, string> = new Map<string, string>(
    [
      ["name", "name"],
      ["id", "id"],
      ["slot", "slot"],
      ["set", "furniture_set"],
      ["hasImage", "has_image"],
      ["imagePath", "image_path"]
    ]
  )

  private static baseUrl: string = "https://firebasestorage.googleapis.com/v0/b/kaw-furniture-assembler-d98f5.appspot.com/o/images"
  private static urlSuffix: string = ".png?alt=media"

  name: string;
  slot: string;
  set: string;
  id: string;
  hasImage: boolean;
  imageUrl: string;

  constructor(name: string, slot: string, set: string, id: string, hasImage: boolean, imagePath: string) {
    this.name = name;
    this.slot = slot;
    this.set = set;
    this.id = id;
    this.hasImage = hasImage
    this.imageUrl = this.getImageUrlFromPath(imagePath);
  }

  public convertSqlToFurniturePiece(result: Map<string, string[]>): Map<string, FurniturePiece> {
    let out = new Map<string, FurniturePiece>()
    for (let i = 0; i < result.get(FurniturePiece.fieldNameSqlNameMapping.get("id")).length; i++) {
      let id: string = result.get(FurniturePiece.fieldNameSqlNameMapping.get("id"))[i];
      let name: string = result.get(FurniturePiece.fieldNameSqlNameMapping.get("name"))[i];
      let slot: string = result.get(FurniturePiece.fieldNameSqlNameMapping.get("slot"))[i];
      let set: string = result.get(FurniturePiece.fieldNameSqlNameMapping.get("set"))[i];
      let hasImage: boolean = result.get(FurniturePiece.fieldNameSqlNameMapping.get("hasImage"))[i] == "1";
      let imagePath: string = result.get(FurniturePiece.fieldNameSqlNameMapping.get("imagePath"))[i];

      out.set(id, new FurniturePiece(name, slot, set, id, hasImage, imagePath))
    }

    return out;
  }

  public getImageUrlFromPath(imagePath: string): string {
    return FurniturePiece.baseUrl + imagePath.replace("/", "%2F") + FurniturePiece.urlSuffix;
  }

}
