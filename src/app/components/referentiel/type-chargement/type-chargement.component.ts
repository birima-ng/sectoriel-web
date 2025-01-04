import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TypeChargement} from 'app/components/modeles/type-chargement.modele';
import {TypeChargementService} from 'app/components/services/type-chargement.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddTypeChargementComponent } from './add/add-type-chargement.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-type-chargement',
    templateUrl: './type-chargement.component.html',
    styleUrls: ['./type-chargement.component.scss'],
})

export class TypeChargementComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
typechargements : TypeChargement[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private typechargementService: TypeChargementService) {
    }

  ngOnInit(): void {
   this.getAllTypeChargement();
  }
    ngAfterViewChecked() {
    }


getAllTypeChargement() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.typechargementService.getTypeChargements().subscribe( data => {
 this.spinner.hide();
 this.typechargements = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddTypeChargementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeChargement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(typechargement: TypeChargement) {
        const modalRef = this.modalService.open(AddTypeChargementComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeChargement();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = typechargement;
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

    this.typechargementService.deleteTypeChargement(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
this.toastr.success('Type de charge supprimé avec succès!', 'BAAC');
    this.getAllTypeChargement();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

