import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import {TypeUniteFdsService} from 'app/components/services/type-unite-fds.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddTypeUniteFdsComponent } from './add/add-type-unite-fds.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-type-unite-fds',
    templateUrl: './type-unite-fds.component.html',
    styleUrls: ['./type-unite-fds.component.scss'],
})

export class TypeUniteFdsComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
typeunitefdss : TypeUniteFds[];
p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private typeunitefdsService: TypeUniteFdsService) {
    }

  ngOnInit(): void {
   this.getAllTypeUniteFds();
  }
    ngAfterViewChecked() {
    }


getAllTypeUniteFds() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.typeunitefdsService.getTypeUniteFdss().subscribe( data => {
 this.spinner.hide();
 this.typeunitefdss = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddTypeUniteFdsComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeUniteFds();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(typeunitefds: TypeUniteFds) {
        const modalRef = this.modalService.open(AddTypeUniteFdsComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeUniteFds();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = typeunitefds;
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

    this.typeunitefdsService.deleteTypeUniteFds(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllTypeUniteFds();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

