import {TrancheAge} from 'app/components/modeles/tranche-age.modele';
import {GraviteBlessure} from 'app/components/modeles/gravite-blessure.modele';
import {Baac} from 'app/components/modeles/baac.modele';
import {VehiculeImplique} from 'app/components/modeles/vehicule-implique.modele';
export class PassagerSansConducteur {
 id: string;
 nombretues: number;
 nombreblessesgrave: number;
 nombreblesselger: number;
 datesave: Date;
 dateupdate: Date;
 baac: Baac;
 graviteblessure: GraviteBlessure;
 trancheage: TrancheAge;
 vehiculeimplique: VehiculeImplique;
}
