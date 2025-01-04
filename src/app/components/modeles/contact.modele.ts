import {ServiceDepartement} from 'app/components/modeles/service-departement.modele';
import {Fonction} from 'app/components/modeles/fonction.modele';
export class Contact {
id: string;
datesave: Date;
dateupdate: Date;
nom: string;
prenom: string;
email: string;
telephone: string;
servicedepartement: ServiceDepartement;
fonction: Fonction;
}
