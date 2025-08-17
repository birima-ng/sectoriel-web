import { Systeme } from '../modeles/systeme.modele';
export class TypeFicheCollecte {
  id: string;
  code: string;
  libelle: string;
  libelleen: string;
  icon: string;
  requete: string;
  typerequete: string;
  systeme: Systeme;
  datesave: Date;
  dateupdate: Date;
}
