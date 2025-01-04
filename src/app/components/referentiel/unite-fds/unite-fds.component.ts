import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import {UniteFdsService} from 'app/components/services/unite-fds.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddUniteFdsComponent } from './add/add-unite-fds.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-unite-fds',
    templateUrl: './unite-fds.component.html',
    styleUrls: ['./unite-fds.component.scss'],
})

export class UniteFdsComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
unitefdss : UniteFds[];
p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private unitefdsService: UniteFdsService) {
    }

  ngOnInit(): void {
   this.getAllUniteFds();
  }
    ngAfterViewChecked() {
    }


getAllUniteFds() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.unitefdsService.getUniteFdss().subscribe( data => {
 this.spinner.hide();
 this.unitefdss = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddUniteFdsComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUniteFds();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(unitefds: UniteFds) {
        const modalRef = this.modalService.open(AddUniteFdsComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUniteFds();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = unitefds;
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

    this.unitefdsService.deleteUniteFds(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllUniteFds();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

