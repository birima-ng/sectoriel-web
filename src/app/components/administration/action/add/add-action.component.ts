import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Action} from 'app/components/modeles/action.modele';
import {ActionService} from 'app/components/services/action.service';

import {Feature} from 'app/components/modeles/feature.modele';
import {FeatureService} from 'app/components/services/feature.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})

export class AddActionComponent {
invalidLogin = false;
submitted=false;
lng="en";
action: Action;
features: Feature [];
feature: Feature;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    feature: new UntypedFormControl('', [Validators.required]),
  });

@Input() action1: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
  private cdr: ChangeDetectorRef,
  public toastr: ToastrService,
  public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
  private actionService: ActionService,
  private featureService: FeatureService,
  private spinner: NgxSpinnerService,
  private route: ActivatedRoute) {
  }

ngOnInit(): void {
   this.getAllFeature();
if(this.action1 == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      feature: this.entity.feature,
    });
     this.feature = this.entity.feature;
} else {
   this.feature = null;
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
    if(this.action1 =='add'){
        this.add();
    }else  if(this.action1 =='edit'){
       this.edit();
    }
}

add(){

    this.actionService.createAction(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('Action ajouté avec succès!', 'STOCK-PRIX');
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

    this.actionService.updateAction(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('Action modifié avec succès!', 'STOCK-PRIX');
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

getAllFeature() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.featureService.getFeatures().subscribe( data => {
 this.spinner.hide();
 this.features = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

}
