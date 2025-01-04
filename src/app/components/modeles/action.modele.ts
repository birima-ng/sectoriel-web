import {Feature} from 'app/components/modeles/feature.modele';

export class Action {
  id: string;
  nom: string;
  code: string;
  feature: Feature;
  datesave: Date;
  dateupdate: Date;
}
