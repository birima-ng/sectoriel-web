import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {CategoriePermis} from 'app/components/modeles/categorie-permis.modele';
import {CategoriePermisService} from 'app/components/services/categorie-permis.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddCategoriePermisComponent } from './add/add-categorie-permis.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-categorie-permis',
    templateUrl: './categorie-permis.component.html',
    styleUrls: ['./categorie-permis.component.scss'],
})

export class CategoriePermisComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
categoriepermiss : CategoriePermis[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private categoriepermisService: CategoriePermisService) {
    }

  ngOnInit(): void {
   this.getAllCategoriePermis();
  }
    ngAfterViewChecked() {
    }


getAllCategoriePermis() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.categoriepermisService.getCategoriePermiss().subscribe( data => {
 this.spinner.hide();
 this.categoriepermiss = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddCategoriePermisComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllCategoriePermis();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(categoriepermis: CategoriePermis) {
        const modalRef = this.modalService.open(AddCategoriePermisComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllCategoriePermis();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = categoriepermis;
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

    this.categoriepermisService.deleteCategoriePermis(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllCategoriePermis();
    this.toastr.success('CategoriePermis supprimé avec succès!', 'STOCK-PRIX');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

