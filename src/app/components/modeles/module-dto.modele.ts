import {FeatureModuleDTO} from 'app/components/modeles/feature-module-dto.modele';
export interface ModuleDTO {
  id: string;
  nom: string;
  path: string;
  title: string;
icon: string;
className: string;
badge?: string;
badgeClass?: string;
isExternalLink: boolean;
  features: FeatureModuleDTO[];
}
