import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddEtatChausseeComponent } from './add/add-etat-chaussee.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {EtatChaussee} from "../../modeles/etat-chaussee.modele";
import {EtatChausseeService} from "../../services/etat-chaussee.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-etat-chaussee',
    templateUrl: './etat-chaussee.component.html',
    styleUrls: ['./etat-chaussee.component.scss'],
})

export class EtatChausseeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
etatchaussees : EtatChaussee[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private etatChausseeService: EtatChausseeService) {
    }

  ngOnInit(): void {
   this.getAllEtatChaussee();
  }
    ngAfterViewChecked() {
    }


getAllEtatChaussee() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.etatChausseeService.geEtatChaussees().subscribe( data => {
 this.spinner.hide();
 this.etatchaussees = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddEtatChausseeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatChaussee();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(etatChaussee: EtatChaussee) {
        const modalRef = this.modalService.open(AddEtatChausseeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatChaussee();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = etatChaussee;
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

    this.etatChausseeService.deleteEtatChaussee(id).subscribe( data => {
    this.toastr.success("Etat chaussée supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllEtatChaussee();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

