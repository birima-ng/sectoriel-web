import { SubFeatureModuleDTO } from './subfeature-module-dto.modele';
export interface FeatureModuleDTO {
  id: string;
  nom: string;
  state: string;
  path: string;
  title: string;
  icon: string;
  className: string;
  badge?: string;
  badgeClass?: string;
  isExternalLink: boolean;
  subfeatures: SubFeatureModuleDTO[];
}
