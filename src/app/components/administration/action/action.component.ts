import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Action} from 'app/components/modeles/action.modele';
import {ActionService} from 'app/components/services/action.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl, UntypedFormGroup, UntypedFormControl} from "@angular/forms";
import { AddActionComponent } from './add/add-action.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Feature} from 'app/components/modeles/feature.modele';
import {FeatureService} from 'app/components/services/feature.service';
declare var window: any;

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
})

export class ActionComponent implements OnInit {

supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
actions : Action[];
features: Feature [];
feature: Feature;
p=1;

addForm = new UntypedFormGroup({
    feature: new UntypedFormControl('', [Validators.required])
  });

    highlighted: boolean = false;
    constructor(
    private featureService: FeatureService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private actionService: ActionService) {
    }

  ngOnInit(): void {
   this.feature = null;
   this.getActionBySysteme();
   this.getFeaturesSysteme();
  }
    ngAfterViewChecked() {
    }

getActionBySysteme() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
  console.log("################1");
  this.actionService.getActionBySysteme().subscribe( data => {
  this.spinner.hide();
  this.actions = data;
  this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
  console.log("################2");
}

getActionByFeatureId(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.actionService.getActionByFeatureId(id).subscribe( data => {
 this.spinner.hide();
 this.actions = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

getAllAction() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.actionService.getActions().subscribe( data => {
 this.spinner.hide();
 this.actions = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddActionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAction();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action1 = 'add';
    }


    formEdit(action: Action) {
        const modalRef = this.modalService.open(AddActionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAction();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action1 = 'edit';
        modalRef.componentInstance.entity = action;
    }


    formDelete(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.message = 'Voulez-vous supprimer cet élément ?';

    modalRef.result.then((result) => {
      if (result === 'Yes') { // suppression de l'element
         console.log("YES");
         this.onDelete(id);
      } else if (result === 'No') {
        console.log("NO");
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
    }

   onDelete(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.actionService.deleteAction(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllAction();
    this.toastr.success('Action supprimé avec succès!', 'STOCK-PRIX');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

   getFeaturesSysteme() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    console.log("################1");
    this.featureService.getFeaturesSysteme().subscribe( data => {
    this.spinner.hide();
    this.features = data;
    this.cdr.detectChanges(); // Forcer la détection des changements
    console.log("################",data); });
    console.log("################2");
  }

  get lf() {
    return this.addForm.controls;
  }

  compareFn(a, b) {
    if(a==b)
       return true
     else
    return a && b && a.id == b.id;
  }

  onSubmit() {
    console.log("################################ this.addForm.value ", this.addForm.value.feature.id);
    this.getActionByFeatureId(this.addForm.value.feature.id);
  }

}

