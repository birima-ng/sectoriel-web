import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {UniteOrganisationnelle} from 'app/components/modeles/unite-organisationnelle.modele';
import {UniteOrganisationnelleService} from 'app/components/services/unite-organisationnelle.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-unite-organisationnelle',
  templateUrl: './add-unite-organisationnelle.component.html',
  styleUrls: ['./add-unite-organisationnelle.component.scss']
})

export class AddUniteOrganisationnelleComponent {
invalidLogin = false;
submitted=false;
lng="en";
uniteorganisationnelle: UniteOrganisationnelle;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required])
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
  public toastr: ToastrService,
  public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
  private organisationnelleService: UniteOrganisationnelleService,
  private spinner: NgxSpinnerService,
  private route: ActivatedRoute) {
  }

ngOnInit(): void {
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom
    });
}
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

    this.organisationnelleService.createUniteOrganisationnelle(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('UniteOrganisationnelle ajouté avec succès!', 'STOCK-PRIX');
}else {
 this.spinner.hide();
 this.toastr.error('Le code ou le nom  existe déjà!', 'STOCK-PRIX');
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

    this.organisationnelleService.updateUniteOrganisationnelle(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('UniteOrganisationnelle modifié avec succès!', 'STOCK-PRIX');
}else {
 this.toastr.error('Le code ou le nom  existe déjà!', 'STOCK-PRIX');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

}
