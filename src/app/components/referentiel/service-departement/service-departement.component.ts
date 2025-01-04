import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {ServiceDepartement} from "../../modeles/service-departement.modele";
import {ServiceDepartementService} from "../../services/service-departement.service";
import {AddServiceDepartementComponent} from "./add/add-service-departement.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-service-departement',
    templateUrl: './service-departement.component.html',
    styleUrls: ['./service-departement.component.scss'],
})

export class ServiceDepartementComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  servicedepartements : ServiceDepartement[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private servicedepartementService: ServiceDepartementService) {
    }

  ngOnInit(): void {
   this.getAllServiceDepartement();
  }
    ngAfterViewChecked() {
    }


getAllServiceDepartement() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.servicedepartementService.getServiceDepartements().subscribe( data => {
 this.spinner.hide();
 this.servicedepartements = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddServiceDepartementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllServiceDepartement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(servicedepartement: ServiceDepartement) {
        const modalRef = this.modalService.open(AddServiceDepartementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllServiceDepartement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = servicedepartement;
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

    this.servicedepartementService.deleteServiceDepartement(id).subscribe( data => {

    this.toastr.success("Service supprimée avec succès!", 'GED');
    this.spinner.hide();
    this.getAllServiceDepartement();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

