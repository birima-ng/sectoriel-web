import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {VolumeChargement} from 'app/components/modeles/volume-chargement.modele';
import {VolumeChargementService} from 'app/components/services/volume-chargement.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddVolumeChargementComponent } from './add/add-volume-chargement.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-volume-chargement',
    templateUrl: './volume-chargement.component.html',
    styleUrls: ['./volume-chargement.component.scss'],
})

export class VolumeChargementComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
volumechargements : VolumeChargement[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private volumechargementService: VolumeChargementService) {
    }

  ngOnInit(): void {
   this.getAllVolumeChargement();
  }
    ngAfterViewChecked() {
    }


getAllVolumeChargement() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.volumechargementService.getVolumeChargements().subscribe( data => {
 this.spinner.hide();
 this.volumechargements = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddVolumeChargementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllVolumeChargement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(volumechargement: VolumeChargement) {
        const modalRef = this.modalService.open(AddVolumeChargementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllVolumeChargement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = volumechargement;
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

    this.volumechargementService.deleteVolumeChargement(id).subscribe( data => {
console.log("############### ID",id);
this.toastr.success('Volume de chargement supprimé avec succès!', 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllVolumeChargement();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

