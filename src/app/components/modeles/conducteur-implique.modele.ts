import {Baac} from 'app/components/modeles/baac.modele';
import {Profession} from 'app/components/modeles/profession.modele';
import {Pays} from 'app/components/modeles/pays.modele';
import {CategoriePermis} from 'app/components/modeles/categorie-permis.modele';
import {GraviteBlessure} from 'app/components/modeles/gravite-blessure.modele';
import {VehiculeImplique} from 'app/components/modeles/vehicule-implique.modele';

export class ConducteurImplique {
  id: string;
  age: number;
  anneeobtentionpermis: number;
  sexe: string;
  numeropermis: string;
  datesave: Date;
  dateupdate: Date;
  baac: Baac;
  profession: Profession;
  nationalite: Pays;
  categoriepermis: CategoriePermis;
  vehiculeimplique: VehiculeImplique;
  graviteblessure: GraviteBlessure;
  paysobtentionpermis: Pays;
}
