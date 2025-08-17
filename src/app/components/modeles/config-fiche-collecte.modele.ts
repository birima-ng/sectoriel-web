import { TypeFicheCollecte } from '../modeles/type-fiche-collecte.modele';
import { Speculation } from '../modeles/speculation.modele';
import { Systeme } from '../modeles/systeme.modele';
import { Pays } from '../modeles/pays.modele';
import { CampagneAgricol } from '../modeles/campagne-agricol.modele';
export class ConfigFicheCollecte {
  id: string;
  speculation: Speculation;
  typefiche: TypeFicheCollecte;
  configured: boolean;
  afficher: boolean;
  systeme: Systeme;
  pays: Pays;
  campagne: CampagneAgricol;
  datesave: Date;
  dateupdate: Date;
}
