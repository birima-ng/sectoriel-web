import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

import {AddProfessionComponent} from "./add/add-profession.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {Profession} from "../../modeles/profession.modele";
import {ProfessionService} from "../../services/profession.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-profession',
    templateUrl: './profession.component.html',
    styleUrls: ['./profession.component.scss'],
})

export class ProfessionComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
 professions : Profession[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private professionService: ProfessionService) {
    }

  ngOnInit(): void {
   this.getAllProfession();
  }
    ngAfterViewChecked() {
    }


  getAllProfession() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.professionService.getProfessions().subscribe( data => {
 this.spinner.hide();
 this.professions = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddProfessionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllProfession();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(profession: Profession) {
        const modalRef = this.modalService.open(AddProfessionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllProfession();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = profession;
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

    this.professionService.deleteProfession(id).subscribe( data => {
    this.toastr.success("Profession supprimée avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllProfession();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

