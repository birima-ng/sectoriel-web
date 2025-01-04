import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

import {AddAppartenanceVehiculeComponent} from "./add/add-appartenance-vehicule.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {AppartenanceVehicule} from "../../modeles/appartenance-vehicule.modele";
import {AppartenanceVehiculeService} from "../../services/appartenance-vehicule.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
selector: 'app-appartenance-vehicule',
templateUrl: './appartenance-vehicule.component.html',
styleUrls: ['./appartenance-vehicule.component.scss'],
})

export class AppartenanceVehiculeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
appartenancevehicules : AppartenanceVehicule[];
p=1;
highlighted: boolean = false;
constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private appartenancevehiculeService: AppartenanceVehiculeService) {
    }

  ngOnInit(): void {
   this.getAllAppartenanceVehicule();
  }
    ngAfterViewChecked() {
    }


  getAllAppartenanceVehicule() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.appartenancevehiculeService.getAppartenanceVehicules().subscribe( data => {
 this.spinner.hide();
 this.appartenancevehicules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddAppartenanceVehiculeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAppartenanceVehicule();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(appartenancevehicule: AppartenanceVehicule) {
        const modalRef = this.modalService.open(AddAppartenanceVehiculeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAppartenanceVehicule();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = appartenancevehicule;
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

    this.appartenancevehiculeService.deleteAppartenanceVehicule(id).subscribe( data => {
    this.toastr.success("AppartenanceVehicule supprimée avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllAppartenanceVehicule();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

