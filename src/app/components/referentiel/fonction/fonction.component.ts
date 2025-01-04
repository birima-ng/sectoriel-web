import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {Fonction} from "../../modeles/fonction.modele";
import {FonctionService} from "../../services/fonction.service";
import {AddFonctionComponent} from "./add/add-fonction.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-fonction',
    templateUrl: './fonction.component.html',
    styleUrls: ['./fonction.component.scss'],
})

export class FonctionComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  fonctions : Fonction[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private fonctionService: FonctionService) {
    }

  ngOnInit(): void {
   this.getAllFonction();
  }
    ngAfterViewChecked() {
    }


getAllFonction() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.fonctionService.getFonctions().subscribe( data => {
 this.spinner.hide();
 this.fonctions = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddFonctionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFonction();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(fonction: Fonction) {
        const modalRef = this.modalService.open(AddFonctionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllFonction();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = fonction;
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

    this.fonctionService.deleteFonction(id).subscribe( data => {

    this.toastr.success("Lumière supprimée avec succès!", 'GED');
    this.spinner.hide();
    this.getAllFonction();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

