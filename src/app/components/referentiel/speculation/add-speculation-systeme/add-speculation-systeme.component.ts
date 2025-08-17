import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {SpeculationSysteme} from "app/components/modeles/speculation-systeme.modele";
import {SpeculationSystemeService} from "app/components/services/speculation-systeme.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
selector: 'app-add-speculation-systeme',
templateUrl: './add-speculation-systeme.component.html',
styleUrls: ['./add-speculation-systeme.component.scss'],
encapsulation: ViewEncapsulation.None // très important
})

export class AddSpeculationSystemeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
speculationsystemes : SpeculationSysteme[];
totalPages: number = 0;
currentPage: number = 0;
pageSize = 15;
p=1;
highlighted: boolean = false;
selectedVals: any[] = [];
speculationSelectionnes = [];
columns = ['Code', 'Libellé', 'Type unité', 'Action'];
constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private speculationsystemeService: SpeculationSystemeService) {
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
 this.speculationsystemeService.getSpeculationSystemePageConfigureFalses(this.currentPage, this.pageSize).subscribe( data => {
 this.spinner.hide();
 this.speculationsystemes = data.content;
 this.totalPages = data.totalPages;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {

    if(!this.speculationSelectionnes || this.speculationSelectionnes.length === 0){
       this.toastr.error("Merci de choisir un produit!", 'ECOWAS');
    }else{
       this.updaleConfig(this.speculationSelectionnes);
    }

    }


    formEdit(speculationsysteme: SpeculationSysteme) {

    }

    formDisable(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.message = 'Voulez-vous désactiver le produit ?';

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

    this.speculationsystemeService.deleteSpeculationSysteme(id).subscribe( data => {
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



isSelected(val: any): boolean {
  return this.selectedVals.includes(val);
}

onCheckboxChange(val: any, isChecked: boolean) {
  if (isChecked) {
    this.selectedVals.push(val);
  } else {
    this.selectedVals = this.selectedVals.filter(v => v !== val);
  }
}

toggleSelection(val: any): void {
  const index = this.selectedVals.indexOf(val);
  if (index === -1) {
    this.selectedVals.push(val);
  } else {
    this.selectedVals.splice(index, 1);
  }
}

isChecked(val: any): boolean {
  return this.selectedVals.includes(val);
}

toggleAll(): void {
  if (this.selectedVals.length === this.speculationsystemes.length) {
    this.selectedVals = [];
  } else {
    this.selectedVals = [...this.speculationsystemes];
  }
}


   updaleConfig(speculations: any) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.speculationsystemeService.updateSpeculationSystemeconfiguration(speculations).subscribe( data => {
    this.toastr.success("Produits configurés avec succès!", 'BAAC');
    this.spinner.hide();
    this.loadItems();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}



}

