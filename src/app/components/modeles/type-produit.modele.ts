import {Categorie} from 'app/components/modeles/categorie.modele';

export class TypeProduit {
  id: string;
  libelle: string;
  code: string;
  categorie: Categorie;
  datesave: Date;
  dateupdate: Date;
}
