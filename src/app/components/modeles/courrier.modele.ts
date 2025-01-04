import {User} from 'app/components/modeles/user.modele';
import {EtatCourrier} from 'app/components/modeles/etat-courrier.modele';
import {Contact} from 'app/components/modeles/contact.modele';
export class Courrier {
id: string;
user: User;
etatcourrier: EtatCourrier;
entrant: boolean;
reference: string;
contact: Contact;
objetcourrier: string;
message: string;
datesave: Date;
dateupdate: Date;
destinataire: string;
}
