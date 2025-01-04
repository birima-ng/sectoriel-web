import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {TypeChargementService} from 'app/components/services/type-chargement.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EtatChaussee} from "../../../modeles/etat-chaussee.modele";
import {EtatGeneralService} from "../../../services/etat-general.service";
import {EtatGeneral} from "../../../modeles/etat-general.modele";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-etat-general',
  templateUrl: './add-etat-general.component.html',
  styleUrls: ['./add-etat-general.component.scss']
})

export class AddEtatGeneralComponent {
invalidLogin = false;
submitted=false;
lng="en";
etatGeneral: EtatGeneral;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    libelle: new UntypedFormControl('', [Validators.required])
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    public toastr: ToastrService,
public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
 private etatGeneralService: EtatGeneralService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      libelle: this.entity.libelle
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

    this.etatGeneralService.createEtatGeneral(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat général ajouté avec succès!", 'BAAC');
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

    this.etatGeneralService.updateEtatGeneral(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat général modifié avec succès!", 'BAAC');
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

}
