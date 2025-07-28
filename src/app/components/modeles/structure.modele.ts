import { Pays } from '../modeles/pays.modele';
export class Structure {
  id: string;
  libelle: string;
  code: string;
  adresse: string;
  pays: Pays;
  datesave: Date;
  dateupdate: Date;
}
