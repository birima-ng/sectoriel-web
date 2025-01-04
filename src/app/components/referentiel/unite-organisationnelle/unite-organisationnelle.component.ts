import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {UniteOrganisationnelle} from 'app/components/modeles/unite-organisationnelle.modele';
import {UniteOrganisationnelleService} from 'app/components/services/unite-organisationnelle.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddUniteOrganisationnelleComponent } from './add/add-unite-organisationnelle.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-unite-organisationnelle',
    templateUrl: './unite-organisationnelle.component.html',
    styleUrls: ['./unite-organisationnelle.component.scss'],
})

export class UniteOrganisationnelleComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
uniteorganisationnelles : UniteOrganisationnelle[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private uniteorganisationnelleService: UniteOrganisationnelleService ) {
    }

  ngOnInit(): void {
   this.getAllUniteOrganisationnelle();
  }
    ngAfterViewChecked() {
    }


getAllUniteOrganisationnelle() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.uniteorganisationnelleService.getUniteOrganisationnelles().subscribe( data => {
 this.spinner.hide();
 this.uniteorganisationnelles = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddUniteOrganisationnelleComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUniteOrganisationnelle();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(uniteorganisationnelle: UniteOrganisationnelle) {
        const modalRef = this.modalService.open(AddUniteOrganisationnelleComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUniteOrganisationnelle();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = uniteorganisationnelle;
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

    this.uniteorganisationnelleService.deleteUniteOrganisationnelle(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllUniteOrganisationnelle();
    this.toastr.success('Unite Organisationnelle supprimé avec succès!', 'BAAC');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

