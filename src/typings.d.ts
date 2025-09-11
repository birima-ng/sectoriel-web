/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'quill';
declare module 'leaflet';
declare module 'screenfull';
declare module 'd3-shape';

declare module 'keycloak-js' {
export interface KeycloakConfig {
url: string;
realm: string;
clientId: string;
}

export interface KeycloakInstance {
init(options?: any): Promise<boolean>;
    login(): Promise<void>;
    logout(): Promise<void>;
    token?: string;
    tokenParsed?: any;
  }

  const Keycloak: {
    new(config?: KeycloakConfig): KeycloakInstance;
  };
  export default Keycloak;
}

