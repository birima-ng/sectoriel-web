import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EnteteConfigPrix} from "app/components/modeles/entete-config-prix.modele";
import {EnteteConfigPrixService} from "app/components/services/entete-config-prix.service";
import {Unite} from "app/components/modeles/unite.modele";
import {UniteService} from "app/components/services/unite.service";
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';
import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {StadeCommerceService} from 'app/components/services/stade-commerce.service';
import {Secteur} from 'app/components/modeles/secteur.modele';
import {SecteurService} from 'app/components/services/secteur.service';
import {SearchDto} from 'app/components/modeles/search-dto.modele';


@Component({
  selector: 'app-add-entete-config-prix',
  templateUrl: './add-entete-config-prix.component.html',
  styleUrls: ['./add-entete-config-prix.component.scss']
})

export class AddEnteteConfigPrixComponent {
invalidLogin = false;
submitted=false;
lng="en";
enteteconfigprix: EnteteConfigPrix;
unites : Unite[];
unite : Unite;
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
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    datecollecte: new UntypedFormControl('', [Validators.required]),
    entreprise: new UntypedFormControl(null, [Validators.required]),
    stadecommerce: new UntypedFormControl(null),
    region: new UntypedFormControl(null),
    departement: new UntypedFormControl(null),
    secteur: new UntypedFormControl(null),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private secteurService: SecteurService,
    private stadecommerceService: StadeCommerceService,
    private departementService: DepartementService,
    private regionService: RegionService,
    private uniteService: UniteService,
    private entrepriseService: EntrepriseService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private enteteconfigprixService: EnteteConfigPrixService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.unite = null;
this.entreprise = null;
this.region = null;
this.departement = null;
this.secteur = null;
this.stadecommerce = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      datecollecte: this.entity.datecollecte,
      entreprise: this.entity.entreprise,
      departement: this.entity.entreprise.departement,
      region: this.entity.entreprise.departement.region,
      secteur: this.entity.entreprise.secteur,
      stadecommerce: this.entity.entreprise.stadecommerce,
    });
//this.unite = this.entity.unite;
this.entreprise = this.entity.entreprise;
this.departement = this.entity.entreprise.departement;
this.region = this.entity.entreprise.departement.region;
this.secteur = this.entity.entreprise.secteur;
this.stadecommerce = this.entity.entreprise.stadecommerce;
}
  // this.getAllUnite();
   this.getAllEntreprise();
   this.getAllRegion();
   this.getAllStadeCommerce();
}

  get lf() {
    return this.addForm.controls;
  }

  // On submit button click
  onSubmit() {

this.submitted=true;
console.log("################################ this.addForm.value ", this.addForm.value);
    if (this.addForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    if(this.action =='add'){
        this.add();
    }else  if(this.action =='edit'){
       this.edit();
    }
}

add(){

    this.enteteconfigprixService.createEnteteConfigPrix(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Date de collecte ajoutée avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('La date de collecte existe déjà pour cette entreprise!', 'STOCK-PRIX');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

edit(){

    this.enteteconfigprixService.updateEnteteConfigPrix(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Date de collecte modifiée avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('La date de collecte existe déjà pour cette entreprise!', 'STOCK-PRIX');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

getAllUnite() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.uniteService.getUnites().subscribe( data => {
 this.spinner.hide();
 this.unites = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
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

getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
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
}
