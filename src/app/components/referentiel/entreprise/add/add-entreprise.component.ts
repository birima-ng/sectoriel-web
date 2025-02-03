import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Entreprise} from "../../../modeles/entreprise.modele";
import {EntrepriseService} from "../../../services/entreprise.service";
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';

import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';

import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {StadeCommerceService} from 'app/components/services/stade-commerce.service';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})

export class AddEntrepriseComponent {
invalidLogin = false;
submitted=false;
lng="en";

departements : Departement[];
departement: Departement;

regions : Region[];
region: Region;

stadecommerces : StadeCommerce[];
stadecommerce: StadeCommerce;

entreprise: Entreprise;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    stocked: new UntypedFormControl(false),
    nom: new UntypedFormControl('', [Validators.required]),
    ninea: new UntypedFormControl('', [Validators.required]),
    telephoneportable: new UntypedFormControl('', [Validators.required]),
    regicommerce: new UntypedFormControl('', [Validators.required]),
    telephonefix: new UntypedFormControl(''),
    telephonefix2: new UntypedFormControl(''),
    longitude: new UntypedFormControl(''),
    latitude: new UntypedFormControl(''),
    departement: new UntypedFormControl(null, [Validators.required]),
    region: new UntypedFormControl(null, [Validators.required]),
    stadecommerce: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private cdr: ChangeDetectorRef,
    private stadecommerceService: StadeCommerceService,
    private departementService: DepartementService,
    private regionService: RegionService,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private entrepriseService: EntrepriseService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.departement = null;
this.region = null;
this.stadecommerce = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      nom: this.entity.nom,
      ninea: this.entity.ninea,
      telephoneportable: this.entity.telephoneportable,
      telephonefix: this.entity.telephonefix,
      telephonefix2: this.entity.telephonefix2,
      regicommerce: this.entity.regicommerce,
      departement: this.entity.departement,
      region: this.entity.departement.region,
      stocked: this.entity.stocked,
    });
this.region = this.entity.departement.region;
this.departement = this.entity.departement;
this.stadecommerce = this.entity.stadecommerce;

}
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

    this.entrepriseService.createEntreprise(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux ajouté avec succès!", 'BAAC');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'BAAC');
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

    this.entrepriseService.updateEntreprise(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux modifié avec succès!", 'BAAC');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'BAAC');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}


getAllDepartement() {
 console.log("################1");
 this.departementService.getDepartements().subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeRegion(region: Region) {
if(region){
console.log("################", region.nom);
this.getDepartementsByRegion(region.id);
}
this.departement = null;
}

getDepartementsByRegion(id: string) {
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.departements = data;
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

}
