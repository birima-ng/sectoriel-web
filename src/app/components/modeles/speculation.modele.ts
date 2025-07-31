import { CategorieSpeculation } from '../modeles/categorie-speculation.modele';
export class Speculation {
  id: string;
  libelle: string;
  libelleen: string;
  description: string;
  descriptionen: string;
  categorie: CategorieSpeculation;
  code: string;
  datesave: Date;
  dateupdate: Date;
}
