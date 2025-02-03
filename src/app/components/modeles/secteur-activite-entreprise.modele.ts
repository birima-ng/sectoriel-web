
import {Entreprise} from 'app/components/modeles/entreprise.modele';
import {SecteurActivite} from 'app/components/modeles/secteur-activite.modele';

export class SecteurActiviteEntreprise {
  id: string;
  etat: number;
  secteuractivite: SecteurActivite;
  entreprise: Entreprise;
  datesave: Date;
  dateupdate: Date;
}
