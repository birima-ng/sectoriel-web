import {Module} from 'app/components/modeles/module.modele';

export class Feature {
  id: string;
  nom: string;
  code: string;
  module: Module;
  datesave: Date;
  dateupdate: Date;
}
