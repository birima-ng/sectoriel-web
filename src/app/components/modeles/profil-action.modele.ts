import {Profil} from 'app/components/modeles/profil.modele';
import {Action} from 'app/components/modeles/action.modele';

export class ProfilAction {
  id: string;
  profil: Profil;
  action: Action;
  allowed: boolean;
  datesave: Date;
  dateupdate: Date;
}
