import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DivisionAdministrative} from 'app/components/modeles/division-administrative.modele';
import {DivisionAdministrativeService} from 'app/components/services/division-administrative.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddDivisionAdministrativeComponent } from './add/add-division-administrative.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-division-administrative',
    templateUrl: './division-administrative.component.html',
    styleUrls: ['./division-administrative.component.scss'],
})

export class DivisionAdministrativeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
divisionadministratives : DivisionAdministrative[];

divisions: DivisionAdministrative[];
rootDivisions: DivisionAdministrative[];
selectedDivision: DivisionAdministrative;

p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private divisionadministrativeService: DivisionAdministrativeService) {
    }

  ngOnInit(): void {
   this.getAllDivisionAdministrative();
this.loadDivisions();
  }
    ngAfterViewChecked() {
    }


getAllDivisionAdministrative() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.divisionadministrativeService.getDivisionAdministratives().subscribe( data => {
 this.spinner.hide();
 this.divisionadministratives = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddDivisionAdministrativeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDivisionAdministrative();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(divisionadministrative: DivisionAdministrative) {
        const modalRef = this.modalService.open(AddDivisionAdministrativeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDivisionAdministrative();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = divisionadministrative;
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

    this.divisionadministrativeService.deleteDivisionAdministrative(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllDivisionAdministrative();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

loadDivisions(): void {
    this.divisionadministrativeService.getDivisionAdministratives().subscribe((data) => {
      this.divisions = data;
      this.rootDivisions = this.divisions.filter(d => !d.parentId);
    });
  }

  selectDivision(division: DivisionAdministrative): void {
    this.selectedDivision = division;
  }

}

