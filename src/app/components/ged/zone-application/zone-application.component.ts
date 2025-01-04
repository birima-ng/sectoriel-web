import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

import {AddZoneApplicationComponent} from "./add/add-zone-application.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {ZoneApplication} from "../../modeles/zone-application.modele";
import {ZoneApplicationService} from "../../services/zone-application.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-zone-application',
    templateUrl: './zone-application.component.html',
    styleUrls: ['./zone-application.component.scss'],
})

export class ZoneApplicationComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
 zoneapplications : ZoneApplication[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private zoneapplicationService: ZoneApplicationService) {
    }

  ngOnInit(): void {
   this.getAllZoneApplication();
  }
    ngAfterViewChecked() {
    }


  getAllZoneApplication() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.zoneapplicationService.getZoneApplications().subscribe( data => {
 this.spinner.hide();
 this.zoneapplications = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddZoneApplicationComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllZoneApplication();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(zoneapplication: ZoneApplication) {
        const modalRef = this.modalService.open(AddZoneApplicationComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllZoneApplication();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = zoneapplication;
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

    this.zoneapplicationService.deleteZoneApplication(id).subscribe( data => {
    this.toastr.success("ZoneApplication supprimée avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllZoneApplication();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

