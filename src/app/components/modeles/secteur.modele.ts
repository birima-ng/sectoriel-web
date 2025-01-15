import {Village} from 'app/components/modeles/village.modele';

export class Secteur {
  id: string;
  libelle: string;
  code: string;
  village: Village
  datesave: Date;
  dateupdate: Date;
}
