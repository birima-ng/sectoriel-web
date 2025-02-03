import {EnteteConfigPrix} from 'app/components/modeles/entete-config-prix.modele';
import {Produit} from 'app/components/modeles/produit.modele';

export class ConfigPrix {
   id: string;
   config: number;
   prix: number;
   stock: number;
   enteteconfigprix: EnteteConfigPrix;
   produit: Produit;
   datesave: Date;
   dateupdate: Date;
}
