
export class FurniturePiece {
  private static fieldNameSqlNameMapping: Map<string, string> = new Map<string, string>(
    [
      ["name", "name"],
      ["id", "id"],
      ["slot", "slot"],
      ["set", "furniture_set"]
    ]
  )
  name: string;
  slot: string;
  set: string;
  id: string;

  constructor(name: string, slot: string, set: string, id: string) {
    this.name = name;
    this.slot = slot;
    this.set = set;
    this.id = id;
  }

  public convertSqlToFurniturePiece(result: Map<string, string[]>): Map<string, FurniturePiece> {
    let out = new Map<string, FurniturePiece>()
    for (let i = 0; i < result.get(FurniturePiece.fieldNameSqlNameMapping.get("id")).length; i++) {
      let id = result.get(FurniturePiece.fieldNameSqlNameMapping.get("id"))[i];
      let name = result.get(FurniturePiece.fieldNameSqlNameMapping.get("name"))[i];
      let slot = result.get(FurniturePiece.fieldNameSqlNameMapping.get("slot"))[i];
      let set = result.get(FurniturePiece.fieldNameSqlNameMapping.get("set"))[i];
      out.set(id, new FurniturePiece(name, slot, set, id))
    }

    return out;
  }

}
