import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { AddEnteteConfigPrixComponent } from './add/add-entete-config-prix.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {EnteteConfigPrix} from "../../modeles/entete-config-prix.modele";
import {EnteteConfigPrixService} from "../../services/entete-config-prix.service";

import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';
import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {StadeCommerceService} from 'app/components/services/stade-commerce.service';
import {Secteur} from 'app/components/modeles/secteur.modele';
import {SecteurService} from 'app/components/services/secteur.service';
import {SearchDto} from 'app/components/modeles/search-dto.modele';
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";

import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-entete-config-prix',
    templateUrl: './entete-config-prix.component.html',
    styleUrls: ['./entete-config-prix.component.scss'],
})

export class EnteteConfigPrixComponent implements OnInit {

supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
enteteconfigprixs : EnteteConfigPrix[];

entreprises : Entreprise[];
entreprise : Entreprise;

departements : Departement[];
departement: Departement;

regions : Region[];
region: Region;

stadecommerces : StadeCommerce[];
stadecommerce: StadeCommerce;

secteurs : Secteur[];
secteur: Secteur;
searchdto: SearchDto = {departement: null, secteur: null, stadecommerce: null};
p=1;
    highlighted: boolean = false;
addForm = new UntypedFormGroup({
    entreprise: new UntypedFormControl(null, [Validators.required]),
    stadecommerce: new UntypedFormControl(null),
    region: new UntypedFormControl(null),
    departement: new UntypedFormControl(null),
    secteur: new UntypedFormControl(null),
  });

    constructor(
    private regionService: RegionService,
    private secteurService: SecteurService,
    private stadecommerceService: StadeCommerceService,
    private departementService: DepartementService,
    private entrepriseService: EntrepriseService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private enteteconfigprixService: EnteteConfigPrixService) {
    }

  ngOnInit(): void {
this.region = null;
this.stadecommerce = null;
   this.getAllEntreprise();
   this.getAllRegion();
   this.getAllStadeCommerce();

   this.getAllEnteteConfigPrix();
  }
    ngAfterViewChecked() {
    }


getAllEnteteConfigPrix() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.enteteconfigprixService.getEnteteConfigPrixs().subscribe( data => {
 this.spinner.hide();
 this.enteteconfigprixs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddEnteteConfigPrixComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEnteteConfigPrix();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(enteteconfigprix: EnteteConfigPrix) {
        const modalRef = this.modalService.open(AddEnteteConfigPrixComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEnteteConfigPrix();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = enteteconfigprix;
    }


    formDelete(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.message = 'Voulez-vous supprimer cet élément ?';

    modalRef.result.then((result) => {
      if (result === 'Yes') { // suppression de l'element
         console.log("YES");
         this.onDelete(id);
      } else if (result === 'No') {
        console.log("NO");
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
    }

   onDelete(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.enteteconfigprixService.deleteEnteteConfigPrix(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllEnteteConfigPrix();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

  get lf() {
    return this.addForm.controls;
  }

getEntrepriseSearch(serachdto: SearchDto) {
 console.log("################1");
 this.entrepriseService.getEntrepriseSearch(serachdto).subscribe( data => {
 this.entreprises = data;
 this.entreprise = null;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeSecteur(secteur: Secteur) {
if(secteur){
console.log("################", secteur);
this.searchdto.secteur = secteur.id;
this.getEntrepriseSearch(this.searchdto);
}
this.secteur = null;
}

onChangeStadeCommerce(stadecommerce: StadeCommerce) {
if(stadecommerce){
console.log("################", stadecommerce);
this.searchdto.stadecommerce = stadecommerce.id;
this.getEntrepriseSearch(this.searchdto);
}
this.stadecommerce = null;
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

onChangeRegion(region: Region) {
if(region){
console.log("################", region.nom);
this.getDepartementsByRegion(region.id);
}
this.departement = null;
this.entreprise = null;
this.entreprises = [];
}

getDepartementsByRegion(id: string) {
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeDepartement(departement: Departement) {
if(departement){
console.log("################", departement);
this.searchdto.departement = departement.id;
this.getEntrepriseSearch(this.searchdto);
this.getSecteursByDepartement(departement.id);
}
this.secteur = null;
}

getSecteursByDepartement(id: string) {
 console.log("################1");
 this.secteurService.getSecteursByDepartement(id).subscribe( data => {
 this.secteurs = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeEntreprise(entreprise: Entreprise) {
if(entreprise){
this.getEnteteConfigPrixByEntreprise(entreprise.id);
//this.searchdto.departement = departement.id;
//this.getEntrepriseSearch(this.searchdto);
//this.getSecteursByDepartement(departement.id);
}
//this.secteur = null;
}

getAllEntreprise() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.entrepriseService.getEntreprises().subscribe( data => {
 this.spinner.hide();
 this.entreprises = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getAllStadeCommerce() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.stadecommerceService.getStadeCommerces().subscribe( data => {
 this.spinner.hide();
 this.stadecommerces = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

getEnteteConfigPrixByEntreprise(id: string) {
 console.log("################1");
 this.enteteconfigprixService.getEnteteConfigPrixByEntreprise(id).subscribe( data => {
 this.enteteconfigprixs = data;
 console.log("################1111 regions ",this.regions);
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

}

