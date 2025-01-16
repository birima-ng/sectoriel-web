import {Departement} from 'app/components/modeles/departement.modele';
import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {SecteurActivite} from 'app/components/modeles/secteur-activite.modele';

export class Entreprise {
   id: string;
   nom: string;
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
   secteuractivite: StadeCommerce;
   stadecommerce: SecteurActivite;
   datesave: Date;
   dateupdate: Date;
}
