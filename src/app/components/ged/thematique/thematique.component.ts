import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

import {AddThematiqueComponent} from "./add/add-thematique.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {Thematique} from "../../modeles/thematique.modele";
import {ThematiqueService} from "../../services/thematique.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-thematique',
    templateUrl: './thematique.component.html',
    styleUrls: ['./thematique.component.scss'],
})

export class ThematiqueComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
 thematiques : Thematique[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private thematiqueService: ThematiqueService) {
    }

  ngOnInit(): void {
   this.getAllThematique();
  }
    ngAfterViewChecked() {
    }


  getAllThematique() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.thematiqueService.getThematiques().subscribe( data => {
 this.spinner.hide();
 this.thematiques = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddThematiqueComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllThematique();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(thematique: Thematique) {
        const modalRef = this.modalService.open(AddThematiqueComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllThematique();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = thematique;
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

    this.thematiqueService.deleteThematique(id).subscribe( data => {
    this.toastr.success("Thematique supprimée avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllThematique();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

