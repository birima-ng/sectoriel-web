import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Feature} from 'app/components/modeles/feature.modele';
import {FeatureService} from 'app/components/services/feature.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddFeatureComponent } from './add/add-feature.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss'],
})

export class FeatureComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
features : Feature[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private featureService: FeatureService) {
    }

  ngOnInit(): void {
   this.getAllFeature();
  }
    ngAfterViewChecked() {
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

    openContent() {
        const modalRef = this.modalService.open(AddFeatureComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFeature();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(feature: Feature) {
        const modalRef = this.modalService.open(AddFeatureComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFeature();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = feature;
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

    this.featureService.deleteFeature(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllFeature();
    this.toastr.success('Feature supprimé avec succès!', 'BAAC');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

