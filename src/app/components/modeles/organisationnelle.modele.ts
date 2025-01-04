export interface Organisationnelle {
  id: string;
parent_id: string;
nom: string;
children: Organisationnelle[];
parent: Organisationnelle;

}
