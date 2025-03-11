import {Departement} from 'app/components/modeles/departement.modele';
import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {Secteur} from 'app/components/modeles/secteur.modele';
import {Commune} from 'app/components/modeles/commune.modele';

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
   secteur: Secteur;
   commune: Commune;
   datesave: Date;
   dateupdate: Date;
}
