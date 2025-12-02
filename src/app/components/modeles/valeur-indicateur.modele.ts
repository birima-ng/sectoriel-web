import {Unite} from 'app/components/modeles/unite.modele';
import {Pays} from 'app/components/modeles/pays.modele';
import {Decoupage1} from 'app/components/modeles/decoupage1.modele';
import {Decoupage2} from 'app/components/modeles/decoupage2.modele';
import {Indicateur} from 'app/components/modeles/indicateur.modele';
import {CampagneAgricol} from 'app/components/modeles/campagne-agricol.modele';

export class ValeurIndicateur {
  id: string;
  unite: Unite;
  campagneagricole: CampagneAgricol;
  indicateur: Indicateur;
  departement: Decoupage2;
  region: Decoupage1;
  pays: Pays;
  datesaisie: Date;
  datevalidee: Date;
  valeur: number;
  periode: string;
  statut: number;
  niveau: number;
  generer: number;
  codecomposite: string;
  decade: number;
  mois: number;
  datesave: Date;
  dateupdate: Date;
}
