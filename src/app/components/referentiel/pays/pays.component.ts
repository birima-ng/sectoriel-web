import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Pays} from 'app/components/modeles/pays.modele';
import {PaysService} from 'app/components/services/pays.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddPaysComponent } from './add/add-pays.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-pays',
    templateUrl: './pays.component.html',
    styleUrls: ['./pays.component.scss'],
})

export class PaysComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
payss : Pays[]; //payss pour respecter le principe
p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private paysService: PaysService) {
    }

  ngOnInit(): void {
   this.getAllPays();
  }
    ngAfterViewChecked() {
    }


getAllPays() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.paysService.getPayss().subscribe( data => {
 this.spinner.hide();
 this.payss = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddPaysComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllPays();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(pays: Pays) {
        const modalRef = this.modalService.open(AddPaysComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllPays();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = pays;
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

    this.paysService.deletePays(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllPays();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

