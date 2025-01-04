import {PassagerSansConducteur} from 'app/components/modeles/passager-sans-conducteur.modele';
import {ConducteurImplique} from 'app/components/modeles/conducteur-implique.modele';
import {VehiculeImplique} from 'app/components/modeles/vehicule-implique.modele';

export class PassagerConducteurDTO {

vehiculeimplique: VehiculeImplique;
conducteurimpliques: ConducteurImplique[];
passagersansconducteurs: PassagerSansConducteur[];

}
