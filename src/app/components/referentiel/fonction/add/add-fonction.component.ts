import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Fonction} from "../../../modeles/fonction.modele";
import {FonctionService} from "../../../services/fonction.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-fonction',
  templateUrl: './add-fonction.component.html',
  styleUrls: ['./add-fonction.component.scss']
})

export class AddFonctionComponent {
invalidLogin = false;
submitted=false;
lng="en";
  fonction: Fonction;

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
    private fonctionService: FonctionService,
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

    this.fonctionService.createFonction(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();
//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Lumière ajoutée avec succès!", 'GED');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'GED');
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

    this.fonctionService.updateFonction(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Lumière modifiée avec succès!", 'GED');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'GED');
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
