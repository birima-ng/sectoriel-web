import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddDepartementComponent } from './add/add-departement.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-departement',
    templateUrl: './departement.component.html',
    styleUrls: ['./departement.component.scss'],
})

export class DepartementComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
departements : Departement[]; //departements pour respecter le principe
p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private departementService: DepartementService) {
    }

  ngOnInit(): void {
   this.getAllDepartement();
  }
    ngAfterViewChecked() {
    }


getAllDepartement() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.departementService.getDepartements().subscribe( data => {
 this.spinner.hide();
 this.departements = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddDepartementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDepartement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(departement: Departement) {
        const modalRef = this.modalService.open(AddDepartementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDepartement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = departement;
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

    this.departementService.deleteDepartement(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllDepartement();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

