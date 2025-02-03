import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddTypeProduitComponent } from './add/add-type-produit.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {TypeProduit} from "../../modeles/type-produit.modele";
import {TypeProduitService} from "../../services/type-produit.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-type-produit',
    templateUrl: './type-produit.component.html',
    styleUrls: ['./type-produit.component.scss'],
})

export class TypeProduitComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
typeproduits : TypeProduit[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private typeproduitService: TypeProduitService) {
    }

  ngOnInit(): void {
   this.getAllTypeProduit();
  }
    ngAfterViewChecked() {
    }


getAllTypeProduit() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.typeproduitService.getTypeProduits().subscribe( data => {
 this.spinner.hide();
 this.typeproduits = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddTypeProduitComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeProduit();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(typeproduit: TypeProduit) {
        const modalRef = this.modalService.open(AddTypeProduitComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTypeProduit();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = typeproduit;
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

    this.typeproduitService.deleteTypeProduit(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllTypeProduit();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

