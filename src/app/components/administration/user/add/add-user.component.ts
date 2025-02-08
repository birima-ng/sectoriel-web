import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {User} from 'app/components/modeles/user.modele';
import {UserService} from 'app/components/services/user.service';
import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import {UniteFdsService} from 'app/components/services/unite-fds.service';
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import {TypeUniteFdsService} from 'app/components/services/type-unite-fds.service';
import {UniteOrganisationnelle} from 'app/components/modeles/unite-organisationnelle.modele';
import {UniteOrganisationnelleService} from 'app/components/services/unite-organisationnelle.service';
import {Profil} from 'app/components/modeles/profil.modele';
import {ProfilService} from 'app/components/services/profil.service';

import {Fonction} from 'app/components/modeles/fonction.modele';
import {FonctionService} from 'app/components/services/fonction.service';

import {ServiceDepartement} from 'app/components/modeles/service-departement.modele';
import {ServiceDepartementService} from 'app/components/services/service-departement.service';

import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AddUserComponent {
invalidLogin = false;
submitted=false;
lng="en";
user: User;
unitefdss: UniteFds[];
unitefds: UniteFds;

profiles: Profil[];
profile: Profil;

fonctions: Fonction[];
fonction: Fonction;

services: ServiceDepartement[];
service: ServiceDepartement;

uniteorganisationnelles: UniteOrganisationnelle[];
uniteorganisationnelle: UniteOrganisationnelle;

typeunitefdss: TypeUniteFds[];
typeunitefds: TypeUniteFds;

  isLoginFailed = false;
  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
     username: new UntypedFormControl('', [Validators.required]),
     nom: new UntypedFormControl('', [Validators.required]),
     prenom: new UntypedFormControl('', [Validators.required]),
     email: new UntypedFormControl('', [Validators.required]),
     telephone: new UntypedFormControl('', [Validators.required]),
     profile: new UntypedFormControl('', [Validators.required]),
     fonction: new UntypedFormControl(null),
     service: new UntypedFormControl(null)
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
@Input() organisationnelle: any;  // Peut être de n'importe quel type
@Input() nom_unitte: string;
  constructor(
 public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private serviceService: ServiceDepartementService,
    private fonctionService: FonctionService,
    private userService: UserService,
    private profilService: ProfilService,
    private unitefdsService: UniteFdsService,
    private typeunitefdsService: TypeUniteFdsService,
    private uniteorganisationnelleService: UniteOrganisationnelleService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.profile = null;
this.fonction = null;
this.service = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      nom: this.entity.nom,
      prenom: this.entity.prenom,
      email: this.entity.email,
      telephone: this.entity.telephone,
      username: this.entity.username,
      fonction: this.entity.fonction,
      service: this.entity.service
    });
this.profile = this.entity.profile;
this.fonction = this.entity.fonction;
this.service = this.entity.service;
}

this.getAllProfil();
this.getAllFonction();
this.getAllService();

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
console.log("################################ organisationnelle ", this.organisationnelle);
      this.addForm.patchValue({
      organisationnelle: this.organisationnelle
    });
        this.add();
    }else  if(this.action =='edit'){
       this.edit();
    }
}

add(){

    this.userService.createUser(this.addForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
if(data){
 this.spinner.hide();

//fermer le popup
 this.activeModal.close('Data updated');
 this.toastr.success('Utilisateur ajouté avec succès!', 'STOCK-PRIX');
}else {
 this.spinner.hide();
 this.toastr.error("L'identifiant  existe déjà!", 'STOCK-PRIX');
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
console.log("################################ this.addForm.value ", this.addForm.value);
    this.userService.updateUser(this.addForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

getAllProfil() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.profilService.getProfils().subscribe( data => {
 this.spinner.hide();
 this.profiles = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

getAllFonction() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.fonctionService.getFonctions().subscribe( data => {
 this.spinner.hide();
 this.fonctions = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

getAllService() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.serviceService.getServiceDepartements().subscribe( data => {
 this.spinner.hide();
 this.services = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}
 compareFn(a, b) {
  if(a==b)
      return true
  else
    return a && b && a.id == b.id;
  }


}
