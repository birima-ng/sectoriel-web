import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Intersection} from 'app/components/modeles/intersection.modele';
import {IntersectionService} from 'app/components/services/intersection.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-intersection',
  templateUrl: './add-intersection.component.html',
  styleUrls: ['./add-intersection.component.scss']
})

export class AddIntersectionComponent {
invalidLogin = false;
submitted=false;
lng="en";
  intersection: Intersection;

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
 private intersectionService: IntersectionService,
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

    this.intersectionService.createIntersection(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Intersection ajoutée avec succès!", 'BAAC');
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

    this.intersectionService.updateIntersection(this.addForm.value).subscribe(
      data => {

if(data){
this.toastr.success("Intersection modifiée avec succès!", 'BAAC');
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
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
