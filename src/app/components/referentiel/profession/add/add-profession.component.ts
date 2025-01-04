import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Profession} from "../../../modeles/profession.modele";
import {ProfessionService} from "../../../services/profession.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.scss']
})

export class AddProfessionComponent {
invalidLogin = false;
submitted=false;
lng="en";
  profession: Profession;

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
    private professionService: ProfessionService,
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

    this.professionService.createProfession(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();
//fermer le popup
this.activeModal.close('Data updated');
 this.toastr.success("Profession ajoutée avec succès!", 'BAAC');
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

    this.professionService.updateProfession(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();
//fermer le popup
 this.activeModal.close('Data updated');
 this.toastr.success("Profession modifiée avec succès!", 'BAAC');
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
