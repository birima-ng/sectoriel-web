import {VolumeChargement} from 'app/components/modeles/volume-chargement.modele';
import {TypeChargement} from 'app/components/modeles/type-chargement.modele';
import {EtatPneus} from 'app/components/modeles/etat-pneus.modele';
import {EtatGeneral} from 'app/components/modeles/etat-general.modele';
import {EtatFeux} from 'app/components/modeles/etat-feux.modele';
import {AppartenanceVehicule} from 'app/components/modeles/appartenance-vehicule.modele';
import {GenreVehicule} from 'app/components/modeles/genre-vehicule.modele';
import {Baac} from 'app/components/modeles/baac.modele';

export class VehiculeImplique {
  id: string;
  numeroimmatriculation: string;
  anneepcirculation: number;
  validitecontroletechnique: boolean;
  validiteassurance: boolean;
  datesave: Date;
  dateupdate: Date;
  baac: Baac;
  genrevehicule: GenreVehicule;
  appartenancevehicule: AppartenanceVehicule;
  etatfeux: EtatFeux;
  etatgeneral: EtatGeneral;
  etatpneus: EtatPneus;
  typechargement: TypeChargement;
  volumechargement: VolumeChargement;


}
