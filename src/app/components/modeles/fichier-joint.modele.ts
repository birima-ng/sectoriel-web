import {Courrier} from 'app/components/modeles/courrier.modele';
export class FichierJoint {
  id: string;
  path: string;
  nom: string;
  courrier: Courrier;
  datesave: Date;
  dateupdate: Date;
}
