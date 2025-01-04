import {Baac} from 'app/components/modeles/baac.modele';
import {User} from 'app/components/modeles/user.modele';
export class Historique {
  id: string;
  commentaire: string;
  statut: string;
  datestatut: Date;
  datesave: Date;
  dateupdate: Date;
  user: User;
  baac: Baac;
}
