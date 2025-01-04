import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Feature} from 'app/components/modeles/feature.modele';
import {FeatureService} from 'app/components/services/feature.service';

import {Module} from 'app/components/modeles/module.modele';
import {ModuleService} from 'app/components/services/module.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss']
})

export class AddFeatureComponent {
invalidLogin = false;
submitted=false;
lng="en";
feature: Feature;
modules: Module [];
module: Module;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    module: new UntypedFormControl('', [Validators.required]),
    path: new UntypedFormControl('', [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
  private cdr: ChangeDetectorRef,
  public toastr: ToastrService,
  public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
  private featureService: FeatureService,
  private moduleService: ModuleService,
  private spinner: NgxSpinnerService,
  private route: ActivatedRoute) {
  }

ngOnInit(): void {
   this.getAllModule();
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      module: this.entity.module,
      path: this.entity.path,
    });
     this.module = this.entity.module;
} else {
   this.module = null;
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

    this.featureService.createFeature(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('Feature ajouté avec succès!', 'BAAC');
}else {
 this.spinner.hide();
 this.toastr.error('Le code ou le nom  existe déjà!', 'BAAC');
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

    this.featureService.updateFeature(this.addForm.value).subscribe(
      data => {
if(data){
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success('Feature modifié avec succès!', 'BAAC');
}else {
 this.toastr.error('Le code ou le nom  existe déjà!', 'BAAC');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

getAllModule() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModules().subscribe( data => {
 this.spinner.hide();
 this.modules = data;
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
