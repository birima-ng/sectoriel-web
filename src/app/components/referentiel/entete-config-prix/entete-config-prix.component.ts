import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { AddEntrepriseNewComponent } from './add-entreprise/add-entreprise.component';
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

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TreeNode {
id: string;
nom: string;
departements?: TreeNode[];
}

@Component({
    selector: 'app-entete-config-prix',
    templateUrl: './entete-config-prix.component.html',
    styleUrls: ['./entete-config-prix.component.scss'],
})

export class EnteteConfigPrixComponent implements OnInit {

treeControl = new NestedTreeControl<TreeNode>(node => node.departements);
dataSource = new MatTreeNestedDataSource<TreeNode>();
selectedDepartmentId = '';
openedRegion: TreeNode | null = null; // Région actuellement ouverte

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
searchdto: SearchDto = {departement: null, secteur: null, stadecommerce: null, nom: null, telephonefix: null};
p=1;
    highlighted: boolean = false;
addForm = new UntypedFormGroup({
    entreprise: new UntypedFormControl(null, [Validators.required]),
    telephone: new UntypedFormControl(''),
    stadecommerce: new UntypedFormControl(null),
    pointcollecte: new UntypedFormControl(''),
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
/*
    this.dataSource.data = [
      {
id: 1,
        name: 'Région 1',
        departements: [
          { id: 1, name: 'Département 1.1' },
          { id: 2, name: 'Département 1.2' }
        ]
      },
      {
id: 2,
        name: 'Région 2',
        departements: [
          { id: 3, name: 'Département 2.1' },
          { id: 4, name: 'Département 2.2' }
        ]
      }
    ];
*/
    }

 hasChild = (_: number, node: TreeNode) => !!node.departements && node.departements.length > 0;

  // Ouvrir/fermer une région
 toggleRegion(node: TreeNode) {
    if (this.openedRegion === node) {
      this.treeControl.collapse(node); // Si on clique sur la même région, on la ferme
      this.openedRegion = null;
    } else {
      if (this.openedRegion) {
        this.treeControl.collapse(this.openedRegion); // Ferme l'ancienne région
      }
      this.treeControl.expand(node); // Ouvre la nouvelle
      this.openedRegion = node;
    }
  }

  toggleNode(node: TreeNode) {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);
    } else {
      this.treeControl.expand(node);
    }
  }
selectDepartment(node: TreeNode) {
    if (!node.departements) { // Vérifie si c'est un département
      console.log("############################################ node ",node);
      this.selectedDepartmentId = node.id || null;
      this.getEntreprisesByDepartement(this.selectedDepartmentId);
      this.getDepartementById(this.selectedDepartmentId);

     this.addForm.patchValue({
      telephone: null,
      stadecommerce: null,
      pointcollecte: null,
      });
    }
  }

  ngOnInit(): void {
this.region = null;
this.stadecommerce = null;
   this.getAllEntreprise();
   this.getAllRegion();
   this.getRegionsDto();
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
        const modalRef = this.modalService.open(AddEntrepriseNewComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        //this.getAllEnteteConfigPrix();
        this.getEntreprisesByDepartement(this.selectedDepartmentId);
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
        modalRef.componentInstance.departement1 = this.departement;
    }


    formEdit(enteteconfigprix: EnteteConfigPrix) {
        const modalRef = this.modalService.open(AddEntrepriseNewComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        //this.getAllEnteteConfigPrix();
  this.getEntreprisesByDepartement(this.selectedDepartmentId);
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = enteteconfigprix;
        modalRef.componentInstance.departement1 = this.departement;
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
 console.log("################ serachdto",serachdto);
 this.entrepriseService.getEntrepriseSearch(serachdto).subscribe( data => {
 this.entreprises = data;
 this.entreprise = null;
 this.cdr.detectChanges(); // Forcer la détection des changements
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
this.stadecommerce = stadecommerce;
this.searchdto.stadecommerce = stadecommerce.id;
this.searchdto.departement = this.selectedDepartmentId;
this.searchdto.nom = this.addForm.value.pointcollecte;
this.searchdto.telephonefix = this.addForm.value.telephone;
this.getEntrepriseSearch(this.searchdto);
}

}

onSearch() {

if(this.stadecommerce!=null)
this.searchdto.stadecommerce = this.stadecommerce.id;
this.searchdto.departement = this.selectedDepartmentId;
this.searchdto.nom = this.addForm.value.pointcollecte;
this.searchdto.telephonefix = this.addForm.value.telephone;
this.getEntrepriseSearch(this.searchdto);
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


getEntreprisesByDepartement(id:string) {
 console.log("################1");
 this.entrepriseService.getEntreprisesByDepartement(id).subscribe( data => {
 this.entreprises = data;
 console.log("################1111 regions ",this.regions);
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getRegionsDto(){
 console.log("################1");
 this.regionService.getRegionsDto().subscribe( data => {
 this.dataSource.data = data;
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

getDepartementById(id:string) {
 console.log("################1");
 this.departementService.getDepartementById(id).subscribe( data => {
 this.departement = data;
 console.log("################1111 regions ",this.departement);
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
}

