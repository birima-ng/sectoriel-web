import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddEnteteConfigPrixComponent } from './add/add-entete-config-prix.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {EnteteConfigPrix} from "../../modeles/entete-config-prix.modele";
import {EnteteConfigPrixService} from "../../services/entete-config-prix.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-entete-config-prix',
    templateUrl: './entete-config-prix.component.html',
    styleUrls: ['./entete-config-prix.component.scss'],
})

export class EnteteConfigPrixComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
enteteconfigprixs : EnteteConfigPrix[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private enteteconfigprixService: EnteteConfigPrixService) {
    }

  ngOnInit(): void {
   this.getAllEnteteConfigPrix();
  }
    ngAfterViewChecked() {
    }


getAllEnteteConfigPrix() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.enteteconfigprixService.getEnteteConfigPrixs().subscribe( data => {
 this.spinner.hide();
 this.enteteconfigprixs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddEnteteConfigPrixComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEnteteConfigPrix();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(enteteconfigprix: EnteteConfigPrix) {
        const modalRef = this.modalService.open(AddEnteteConfigPrixComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllEnteteConfigPrix();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = enteteconfigprix;
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

    this.enteteconfigprixService.deleteEnteteConfigPrix(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllEnteteConfigPrix();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

