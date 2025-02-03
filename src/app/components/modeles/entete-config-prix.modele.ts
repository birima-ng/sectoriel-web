import {Entreprise} from 'app/components/modeles/entreprise.modele';
import {Unite} from 'app/components/modeles/unite.modele';

export class EnteteConfigPrix {
   id: string;
   config: number;
   entreprise: Entreprise;
   unite: Unite;
   datecolleecte: Date;
   datesave: Date;
   dateupdate: Date;
}
