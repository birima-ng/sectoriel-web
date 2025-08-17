import { Pays } from '../modeles/pays.modele';
import { Systeme } from '../modeles/systeme.modele';
import { Speculation } from '../modeles/speculation.modele';

export class PrincipauxProduits {
  id: string;
  speculation: Speculation;
  pays: Pays;
  systeme: Systeme;
  configured: boolean;
  datesave: Date;
  dateupdate: Date;
}
