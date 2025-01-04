import {Thematique} from 'app/components/modeles/thematique.modele';
import {NatureDocument} from 'app/components/modeles/nature-document.modele';
import {ZoneApplication} from 'app/components/modeles/zone-application.modele';
export class Document {
  id: string;
  reference: string;
  intitule: string;
  contenucomplementaire: string;
  path: string;
  thematique: Thematique;
  naturedocument: NatureDocument;
  zoneapplication: ZoneApplication;
  datedocument: Date;
  datesave: Date;
  dateupdate: Date;
}
