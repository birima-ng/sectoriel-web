import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Organisationnelle} from 'app/components/modeles/organisationnelle.modele';
import {OrganisationnelleService} from 'app/components/services/organisationnelle.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-organisationnelle',
  templateUrl: './add-organisationnelle.component.html',
  styleUrls: ['./add-organisationnelle.component.scss']
})

export class AddOrganisationnelleComponent {
invalidLogin = false;
submitted=false;
lng="en";
organisationnelle: Organisationnelle;
organisationnelles: Organisationnelle[];

  isLoginFailed = false;

      addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
     nom: new UntypedFormControl('', [Validators.required]),
     organisationnelle: new UntypedFormControl(null)
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
 private organisationnelleService: OrganisationnelleService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      nom: this.entity.nom,
      organisationnelle: this.entity.organisationnelle
    });
}

this.getAllOrganisationnelle();
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

    this.organisationnelleService.createOrganisationnelle(this.addForm.value).subscribe(
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
/*
    this.organisationnelleService.updateOrganisationnelle(this.addForm.value).subscribe(
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
*/
}

getAllOrganisationnelle() {
 console.log("################1");
 this.organisationnelleService.getOrganisationnellesNomap().subscribe( data => {
 this.organisationnelles = data;
console.log("##############################-data",data);
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
