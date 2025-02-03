import {Departement} from 'app/components/modeles/departement.modele';
import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';

export class Entreprise {
   id: string;
   nom: string;
   stocked: boolean;
   ninea: string;
   regicommerce: string;
   adresse: string;
   latitude: number;
   longitude: number;
   telephonefix: string;
   telephonefix2: string;
   telephoneportable: string;
   email: string;
   departement: Departement;
   stadecommerce: StadeCommerce;
   datesave: Date;
   dateupdate: Date;
}
