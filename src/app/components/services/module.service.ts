import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Module} from 'app/components/modeles/module.modele';
import {ModuleDTO} from 'app/components/modeles/module-dto.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface MenuItem {
path: string;
title: string;
icon: string;
className: string;
badge: string;
badgeClass: string;
isExternalLink: boolean;
submenu: MenuItem[];
}

@Injectable({
providedIn: 'root'
})
export class ModuleService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getModuleById(id: string): Observable<Module> {
    return this.http.get<Module>(this.baseUrl +'api/module/'+ id);
  }

  createModule(module: Module): Observable<Module> {
    return this.http.post<Module>(this.baseUrl+'api/module', module);
  }

  updateModule(module: Module): Observable<Module> {
    return this.http.put<Module>(this.baseUrl +'api/module/'+ module.id, module);
  }

  deleteModule(id: string): Observable<Module> {
    return this.http.delete<Module>(this.baseUrl +'api/module/'+ id);
  }

  getModules():  Observable<Module[]> {
      return this.http.get<any>(this.baseUrl+'api/module').pipe(
       map(
         moduleData => {
          return moduleData;
         }));
  }

  getModuleFeatures():  Observable<ModuleDTO[]> {
      return this.http.get<any>(this.baseUrl+'api/module/feature').pipe(
       map(
         moduleData => {
          return moduleData;
         }));
  }

  getModuleActives(id: string):  Observable<ModuleDTO[]> {
      return this.http.get<any>(this.baseUrl+'api/module/feature/'+id).pipe(
       map(
         moduleData => {
          return moduleData;
         }));
  }
  getModuleFeatureMenus():  Observable<any> {
      return this.http.get<any>(this.baseUrl+'api/module/feature/menu').pipe(
       map(
         moduleData => {
          return moduleData;
         }));
  }

  getModuleMenus():  Observable<any> {
      return this.http.get<any>(this.baseUrl+'api/menu-items').pipe(
       map(
         moduleData => {
          return moduleData;
         }));
  }

   getMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.baseUrl+'api/menu-items');
    }
}
