import {EnteteConfigPrix} from 'app/components/modeles/entete-config-prix.modele';
import {Produit} from 'app/components/modeles/produit.modele';
import {Unite} from 'app/components/modeles/unite.modele';

export class ConfigPrix {
   id: string;
   config: number;
   prixachat: number;
   prix: number;
   stock: number;
   enteteconfigprix: EnteteConfigPrix;
   produit: Produit;
   unite: Unite;
   datesave: Date;
   dateupdate: Date;
}
