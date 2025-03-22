import {Departement} from 'app/components/modeles/departement.modele';
import {Region} from 'app/components/modeles/region.modele';

export class CumulSearchDTO {
  departement: Departement;
  region: Region;
  startDate: Date;
  endDate: Date;
}
