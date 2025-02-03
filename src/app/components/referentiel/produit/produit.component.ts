import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input, ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

import {AddProduitComponent} from "./add/add-produit.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {Produit} from "../../modeles/produit.modele";
import {ProduitService} from "../../services/produit.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

import {
ColumnMode,
DatatableComponent,
SelectionType
} from '@swimlane/ngx-datatable';
@Component({
    selector: 'app-produit',
    templateUrl: './produit.component.html',
    styleUrls: ['./produit.component.scss', '../../../../assets/sass/libs/datatables.scss'],
encapsulation: ViewEncapsulation.None
})

export class ProduitComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
 produits : Produit[];
public ColumnMode = ColumnMode;
@ViewChild('tableRowDetails') tableRowDetails: any;
@ViewChild('tableResponsive') tableResponsive: any;
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private produitService: ProduitService) {
    }

  ngOnInit(): void {
   this.getAllProduit();
  }
    ngAfterViewChecked() {
    }


  getAllProduit() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.produitService.getProduits().subscribe( data => {
 this.spinner.hide();
 this.produits = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddProduitComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllProduit();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(produit: Produit) {
        const modalRef = this.modalService.open(AddProduitComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllProduit();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = produit;
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

    this.produitService.deleteProduit(id).subscribe( data => {
    this.toastr.success("Produit supprimée avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllProduit();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }


}

