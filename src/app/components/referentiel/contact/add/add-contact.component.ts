import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Contact} from 'app/components/modeles/contact.modele';
import {ContactService} from 'app/components/services/contact.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Fonction} from 'app/components/modeles/fonction.modele';
import {FonctionService} from 'app/components/services/fonction.service';

import {ServiceDepartement} from 'app/components/modeles/service-departement.modele';
import {ServiceDepartementService} from 'app/components/services/service-departement.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent {
invalidLogin = false;
submitted=false;
lng="en";
contact: Contact;
fonctions : Fonction[]; //regions pour respecter le principe
fonction: Fonction;
servicedepartements : ServiceDepartement[]; //regions pour respecter le principe
servicedepartement: ServiceDepartement;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    nom: new UntypedFormControl('', [Validators.required]),
    prenom: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    telephone: new UntypedFormControl('', [Validators.required]),
    fonction: new UntypedFormControl(null, [Validators.required]),
    servicedepartement: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private fonctionService: FonctionService,
    private servicedepartementService: ServiceDepartementService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.fonction = null;
this.servicedepartement = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      telephone: this.entity.telephone,
      email: this.entity.email,
      nom: this.entity.nom,
      prenom: this.entity.prenom,
      fonction: this.entity.fonction,
      servicedepartement: this.entity.servicedepartement
    });
this.fonction = this.entity.fonction;
this.servicedepartement = this.entity.servicedepartement;
console.log("########################## - this.entity.fonction",this.entity.fonction);
console.log("########################## - this.entity.servicedepartement",this.entity.servicedepartement);
}else {
this.fonction = null;
this.servicedepartement = null;
}
   this.getAllFonction();

   this.getAllServiceDepartement();
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

    this.contactService.createContact(this.addForm.value).subscribe(
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

edit(){

    this.contactService.updateContact(this.addForm.value).subscribe(
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

getAllFonction() {
 console.log("################1");
 this.fonctionService.getFonctions().subscribe( data => {
 this.fonctions = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getAllServiceDepartement() {
 console.log("################1");
 this.servicedepartementService.getServiceDepartements().subscribe( data => {
 this.servicedepartements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }
}
