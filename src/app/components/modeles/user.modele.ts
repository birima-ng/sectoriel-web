import { Profil } from '../modeles/profil.modele';
import { Systeme } from '../modeles/systeme.modele';
import { ServiceDepartement } from '../modeles/service-departement.modele';
import { Fonction } from '../modeles/fonction.modele';
import { Pays } from '../modeles/pays.modele';
export class User {
  id: string;
  prenom: string;
  adresse: string;
  nom: string;
  email: string;
  telephone: string;
  username: string;
  password: string;
  datesave: Date;
  dateupdate: Date;
  service: ServiceDepartement;
  fonction: Fonction;
  profile: Profil;
  systeme: Systeme;
  pays: Pays;
}
