import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TrancheAge} from 'app/components/modeles/tranche-age.modele';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddTrancheAgeComponent } from './add/add-tranche-age.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {tr} from "date-fns/locale";
import {TrancheAgeService} from "../../services/tranche-age.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-tranche-age',
    templateUrl: './tranche-age.component.html',
    styleUrls: ['./tranche-age.component.scss'],
})

export class TrancheAgeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
trancheAges : TrancheAge[];
trancheAge : TrancheAge;
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private trancheageService: TrancheAgeService) {
    }

  ngOnInit(): void {
   this.getAllTrancheAge();
  }
    ngAfterViewChecked() {
    }


  getAllTrancheAge() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.trancheageService.getTrancheAge().subscribe( data => {
 this.spinner.hide();
 this.trancheAges = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddTrancheAgeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTrancheAge();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(trancheAge: TrancheAge) {
        const modalRef = this.modalService.open(AddTrancheAgeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTrancheAge();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = trancheAge;
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

    this.trancheageService.deleteTrancheAge(id).subscribe( data => {
    this.spinner.hide();
    this.toastr.success("Tranche d'âge supprimé avec succès!", 'BAAC');
    this.getAllTrancheAge();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

