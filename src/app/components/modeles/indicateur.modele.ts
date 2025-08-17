import {Systeme} from 'app/components/modeles/systeme.modele';
import {FrequenceCollecte} from 'app/components/modeles/frequence-collecte.modele';
import {Unite} from 'app/components/modeles/unite.modele';

export class Indicateur {
  id: string;
  categorie: string;
  code: string;
  libelleen: string;
  libellefr: string;
  variable: string;
  formule: string;
  responsablecollecte: string;
  methodecollecte: string;
  niveau: string;
  codeformule: string;
  codeformulenumerateur: string;
  codeformuledenominateur: string;
  ordre: number;
  type: string;
  ouinondept: boolean;
  ouinonreg: boolean;
  ouinonpays: boolean;
  ouinonecowas: boolean;
  iscomposite: boolean;
  iscra: boolean;
  description: string;
  descriptionen: string;
  systeme: Systeme;
  frequencecollecte: FrequenceCollecte;
  unite: Unite;
  datesave: Date;
  dateupdate: Date;
}
