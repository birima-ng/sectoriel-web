import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddAnneeComponent } from './add/add-annee.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {Annee} from "../../modeles/annee.modele";
import {AnneeService} from "../../services/annee.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-annee',
    templateUrl: './annee.component.html',
    styleUrls: ['./annee.component.scss'],
})

export class AnneeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
annees : Annee[];
totalPages: number = 0;
currentPage: number = 0;
pageSize = 10;
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private anneeService: AnneeService) {
    }

  ngOnInit(): void {
  // this.getAllAnnee();
this.loadItems();
  }
    ngAfterViewChecked() {
    }


getAllAnnee() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.anneeService.getAnnees().subscribe( data => {
 this.spinner.hide();
 this.annees = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddAnneeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAnnee();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(annee: Annee) {
        const modalRef = this.modalService.open(AddAnneeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllAnnee();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = annee;
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

    this.anneeService.deleteAnnee(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllAnnee();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

loadItems(): void {
  this.anneeService.getAnneePages(this.currentPage, this.pageSize).subscribe(data => {
    this.annees = data.content;
    this.totalPages = data.totalPages;

    //this.currentPage = data.number;
this.cdr.detectChanges(); // Forcer la détection des changements
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

