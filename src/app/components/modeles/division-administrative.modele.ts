export class DivisionAdministrative {
  id: number;
nom: string;
parentId?: number;
children: DivisionAdministrative[];

constructor(id: number, nom: string, parentId?: number, children: DivisionAdministrative[] = []) {
    this.id = id;
    this.nom = nom;
    this.parentId = parentId;
    this.children = children;
  }
}
