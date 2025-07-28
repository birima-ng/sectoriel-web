import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddCategorieSpeculationComponent } from './add/add-categorie-speculation.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {CategorieSpeculation} from "../../modeles/categorie-speculation.modele";
import {CategorieSpeculationService} from "../../services/categorie-speculation.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-categorie-speculation',
    templateUrl: './categorie-speculation.component.html',
    styleUrls: ['./categorie-speculation.component.scss'],
})

export class CategorieSpeculationComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
categoriespeculations : CategorieSpeculation[];
totalPages: number = 0;
currentPage: number = 0;
pageSize = 15;
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private categoriespeculationService: CategorieSpeculationService) {
    }

  ngOnInit(): void {
   this.loadItems();
  }
    ngAfterViewChecked() {
    }

loadItems() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.categoriespeculationService.getCategorieSpeculationPages(this.currentPage, this.pageSize).subscribe( data => {
 this.spinner.hide();
 this.categoriespeculations = data.content;
 this.totalPages = data.totalPages;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddCategorieSpeculationComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.loadItems();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(categoriespeculation: CategorieSpeculation) {
        const modalRef = this.modalService.open(AddCategorieSpeculationComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.loadItems();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = categoriespeculation;
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

    this.categoriespeculationService.deleteCategorieSpeculation(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.loadItems();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}


goToPage(page: number): void {
if (page >= 0 && page < this.totalPages) {
  this.loadItems();
}
}

onPageChange(page: number) {
  this.currentPage = page;
  this.loadItems();
}

onPageSizeChange(size: number) {
  this.pageSize = size;
  this.currentPage = 0;
  this.loadItems();
}


}

