import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {Produit} from 'app/components/modeles/produit.modele';
import {Unite} from 'app/components/modeles/unite.modele';

export class ConfigUnite {
   id: string;
   stadecommerce: StadeCommerce;
   produit: Produit;
   unite: Unite;
   datesave: Date;
   dateupdate: Date;
}
