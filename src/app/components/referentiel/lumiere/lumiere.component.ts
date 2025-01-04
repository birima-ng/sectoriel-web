import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {Lumiere} from "../../modeles/lumiere.modele";
import {LumiereService} from "../../services/lumiere.service";
import {AddLumiereComponent} from "./add/add-lumiere.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-lumiere',
    templateUrl: './lumiere.component.html',
    styleUrls: ['./lumiere.component.scss'],
})

export class LumiereComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  lumieres : Lumiere[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private lumiereService: LumiereService) {
    }

  ngOnInit(): void {
   this.getAllLumiere();
  }
    ngAfterViewChecked() {
    }


getAllLumiere() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.lumiereService.getLumieres().subscribe( data => {
 this.spinner.hide();
 this.lumieres = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddLumiereComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllLumiere();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(lumiere: Lumiere) {
        const modalRef = this.modalService.open(AddLumiereComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllLumiere();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = lumiere;
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

    this.lumiereService.deleteLumiere(id).subscribe( data => {

    this.toastr.success("Lumière supprimée avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllLumiere();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

