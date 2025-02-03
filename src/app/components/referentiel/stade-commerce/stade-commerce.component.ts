import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddStadeCommerceComponent } from './add/add-stade-commerce.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {StadeCommerce} from "../../modeles/stade-commerce.modele";
import {StadeCommerceService} from "../../services/stade-commerce.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-stade-commerce',
    templateUrl: './stade-commerce.component.html',
    styleUrls: ['./stade-commerce.component.scss'],
})

export class StadeCommerceComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
stadecommerces : StadeCommerce[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private stadecommerceService: StadeCommerceService) {
    }

  ngOnInit(): void {
   this.getAllStadeCommerce();
  }
    ngAfterViewChecked() {
    }


getAllStadeCommerce() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.stadecommerceService.getStadeCommerces().subscribe( data => {
 this.spinner.hide();
 this.stadecommerces = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddStadeCommerceComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllStadeCommerce();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(etatFeux: StadeCommerce) {
        const modalRef = this.modalService.open(AddStadeCommerceComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllStadeCommerce();
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

    this.stadecommerceService.deleteStadeCommerce(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllStadeCommerce();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

