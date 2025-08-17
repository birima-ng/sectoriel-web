import { Pays } from '../modeles/pays.modele';
import { TypeFicheCollecte } from '../modeles/type-fiche-collecte.modele';
import { Speculation } from '../modeles/speculation.modele';

export class PrincipauxProduitsFiche {
  id: string;
  speculation: Speculation;
  pays: Pays;
  typefiche: TypeFicheCollecte;
  configured: boolean;
  datesave: Date;
  dateupdate: Date;
}
