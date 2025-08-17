import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddFrequenceCollecteComponent } from './add/add-frequence-collecte.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {FrequenceCollecte} from "../../modeles/frequence-collecte.modele";
import {FrequenceCollecteService} from "../../services/frequence-collecte.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-frequence-collecte',
    templateUrl: './frequence-collecte.component.html',
    styleUrls: ['./frequence-collecte.component.scss'],
})

export class FrequenceCollecteComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
frequencecollectes : FrequenceCollecte[];
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
    private frequencecollecteService: FrequenceCollecteService) {
    }

  ngOnInit(): void {
  // this.getAllFrequenceCollecte();
this.loadItems();
  }
    ngAfterViewChecked() {
    }


getAllFrequenceCollecte() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.frequencecollecteService.getFrequenceCollectes().subscribe( data => {
 this.spinner.hide();
 this.frequencecollectes = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddFrequenceCollecteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFrequenceCollecte();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(frequencecollecte: FrequenceCollecte) {
        const modalRef = this.modalService.open(AddFrequenceCollecteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFrequenceCollecte();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = frequencecollecte;
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

    this.frequencecollecteService.deleteFrequenceCollecte(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllFrequenceCollecte();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

loadItems(): void {
  this.frequencecollecteService.getFrequenceCollectePages(this.currentPage, this.pageSize).subscribe(data => {
    this.frequencecollectes = data.content;
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

