export class DivisionAdministrativeDto {
  id: string;
nom: string;
parentId?: string;
children: DivisionAdministrativeDto[];

constructor(id: string, nom: string, parentId?: string, children: DivisionAdministrativeDto[] = []) {
    this.id = id;
    this.nom = nom;
    this.parentId = parentId;
    this.children = children;
  }
}
