import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgZone } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

import {TypeFicheCollecte} from 'app/components/modeles/type-fiche-collecte.modele';
import {TypeFicheCollecteService} from 'app/components/services/type-fiche-collecte.service';

import {SpeculationSysteme} from 'app/components/modeles/speculation-systeme.modele';
import {SpeculationSystemeService} from 'app/components/services/speculation-systeme.service';

import {PrincipauxProduitsFiche} from 'app/components/modeles/principaux-produits-fiche.modele';
import {PrincipauxProduitsFicheService} from 'app/components/services/principaux-produits-fiche.service';

import { ConfigFicheCollecte } from 'app/components/modeles/config-fiche-collecte.modele';
import {ConfigFicheCollecteService} from 'app/components/services/config-fiche-collecte.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl, UntypedFormGroup, UntypedFormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-configuration-fiche',
  templateUrl: './configuration-fiche.component.html',
  styleUrls: ['./configuration-fiche.component.scss', '../../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationFicheComponent implements OnInit {

  activeTab = "general";
  typefichecollectes : TypeFicheCollecte[];
  speculationsystemes: SpeculationSysteme[];
  configfichecollectes : ConfigFicheCollecte[];
  principalproduitfiche: PrincipauxProduitsFiche;
  ppconfigs: PrincipauxProduitsFiche[];
  totalPagesPpconfigs: number = 0;
  idTypeFiche = '';
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize = 15;

  constructor(
   private principauxproduitsficheService: PrincipauxProduitsFicheService,
   private actRoute: ActivatedRoute,
   private speculationsystemeService: SpeculationSystemeService,
   private configfichecollecteService: ConfigFicheCollecteService,
   private zone: NgZone,
   private spinner: NgxSpinnerService,
   private typefichecollecteService: TypeFicheCollecteService,
   public toastr: ToastrService,
   private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
     this.getAllTypeFicheCollecte();
  }

  setActiveTab(tab) {
 this.idTypeFiche = tab;
console.log("###################################################### tab",tab);
    this.activeTab = tab;

this.loadItems();
  }

getAllTypeFicheCollecte() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.typefichecollecteService.getTypeFicheCollectes().subscribe( data => {
 this.spinner.hide();
 this.typefichecollectes = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}


goToPage(page: number): void {
if (page >= 0 && page < this.totalPages) {
  this.loadItems();
}
}

onPageChange(page: number) {
  this.currentPage = page;
  this.loadItems();
}

onPageSizeChange(size: number) {
  this.pageSize = size;
  this.currentPage = 0;
  this.loadItems();
}

loadItems() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.speculationsystemeService.getSpeculationSystemePageConfigures(this.currentPage, this.pageSize).subscribe( data => {
 this.spinner.hide();
 this.speculationsystemes = data.content;
 this.totalPages = data.totalPages;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

configSpeculation(speculationsysteme: SpeculationSysteme){
this.principalproduitfiche = null;
 this.getPrincipauxProduitsFicheBySpeculationAndTypeFiche(speculationsysteme.speculation.id,  this.idTypeFiche);
this.getPrincipauxProduitsFichePageTypeFicheConfigured(this.idTypeFiche, this.currentPage, this.pageSize);
this.getConfigFicheCollectePages(this.currentPage, this.pageSize);
}

getPrincipauxProduitsFicheBySpeculationAndTypeFiche(speculation: string, typefiche: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.principauxproduitsficheService.getPrincipauxProduitsFicheBySpeculationAndTypeFiche(speculation, typefiche).subscribe( data => {
 this.spinner.hide();
 this.principalproduitfiche = data;
this.cdr.detectChanges(); // Forcer la détection des changements

   });
}

getPrincipauxProduitsFichePageTypeFicheConfigured(idtypefiche: string, page: number, size: number){
 this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.principauxproduitsficheService.getPrincipauxProduitsFichePageTypeFicheConfigured(idtypefiche, page, size).subscribe( data => {
 this.spinner.hide();
 this.ppconfigs = data.content;
 this.totalPagesPpconfigs = data.totalPages;
 this.cdr.detectChanges(); // Forcer la détection des changements
   });
}

getConfigFicheCollectePages(page: number, size: number){
 this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.configfichecollecteService.getConfigFicheCollectePages(page, size).subscribe( data => {
 this.spinner.hide();
 this.configfichecollectes = data.content;
 this.totalPages = data.totalPages;
 this.cdr.detectChanges(); // Forcer la détection des changements
   });
}

}
