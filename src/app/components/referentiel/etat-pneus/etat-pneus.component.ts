import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddEtatPneusComponent } from './add/add-etat-pneus.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {EtatPneus} from "../../modeles/etat-pneus.modele";
import {EtatPneusService} from "../../services/etat-pneus.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-etat-pneus',
    templateUrl: './etat-pneus.component.html',
    styleUrls: ['./etat-pneus.component.scss'],
})

export class EtatPneusComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
etatpneuss : EtatPneus[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private etatPneusService: EtatPneusService) {
    }

  ngOnInit(): void {
   this.getAllEtatPneus();
  }
    ngAfterViewChecked() {
    }


getAllEtatPneus() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.etatPneusService.geEtatEtatPneuss().subscribe( data => {
 this.spinner.hide();
 this.etatpneuss = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddEtatPneusComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatPneus();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(etatPneus: EtatPneus) {
        const modalRef = this.modalService.open(AddEtatPneusComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEtatPneus();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = etatPneus;
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

    this.etatPneusService.deleteEtatPneus(id).subscribe( data => {
    this.toastr.success("Etat pneus supprimé avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllEtatPneus();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

