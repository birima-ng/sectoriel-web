import { ActionDTO } from './action-dto.modele';

export interface FeatureDTO {
id: string;
nom: string;
actions: ActionDTO[];
}
