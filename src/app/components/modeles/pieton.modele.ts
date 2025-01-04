import {Baac} from 'app/components/modeles/baac.modele';
import {GraviteBlessure} from 'app/components/modeles/gravite-blessure.modele';
import {TrancheAge} from 'app/components/modeles/tranche-age.modele';
export class Pieton {
  id: string;
  nombretue: number;
  nombreblessegrave: number;
  nombreblesseleger: number;
  datesave: Date;
  dateupdate: Date;
  baac: Baac;
  graviteblessure: GraviteBlessure;
  trancheage: TrancheAge;
}
