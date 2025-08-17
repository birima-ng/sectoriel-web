import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Indicateur} from "../../../modeles/indicateur.modele";
import {IndicateurService} from "../../../services/indicateur.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-indicateur',
  templateUrl: './add-indicateur.component.html',
  styleUrls: ['./add-indicateur.component.scss']
})

export class AddIndicateurComponent {
invalidLogin = false;
submitted=false;
lng="en";
typeunite: Indicateur;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    libelleen: new UntypedFormControl('', [Validators.required]),
    libelle: new UntypedFormControl('', [Validators.required])
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    public toastr: ToastrService,
public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
 private typeuniteService: IndicateurService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      libelleen: this.entity.libelleen,
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

    this.typeuniteService.createIndicateur(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux ajouté avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'STOCK-PRIX');
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

    this.typeuniteService.updateIndicateur(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux modifié avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'STOCK-PRIX');
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
