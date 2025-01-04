import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddEtatFeuxComponent } from './add/add-etat-feux.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {EtatFeux} from "../../modeles/etat-feux.modele";
import {EtatFeuxService} from "../../services/etat-feux.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-etat-feux',
    templateUrl: './etat-feux.component.html',
    styleUrls: ['./etat-feux.component.scss'],
})

export class EtatFeuxComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
etatfeuxs : EtatFeux[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private etatFeuxService: EtatFeuxService) {
    }

  ngOnInit(): void {
   this.getAllEtatFeux();
  }
    ngAfterViewChecked() {
    }


getAllEtatFeux() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.etatFeuxService.getEtatFeuxs().subscribe( data => {
 this.spinner.hide();
 this.etatfeuxs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddEtatFeuxComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatFeux();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(etatFeux: EtatFeux) {
        const modalRef = this.modalService.open(AddEtatFeuxComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatFeux();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = etatFeux;
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

    this.etatFeuxService.deleteEtatFeux(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllEtatFeux();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

