import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {JourSemaine} from 'app/components/modeles/jour-semaine.modele';
import {JourSemaineService} from 'app/components/services/jour-semaine.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddJourSemaineComponent } from './add/add-jour-semaine.component';

import {AuthService} from 'app/shared/auth/auth.service';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;
import {DepartementService} from 'app/components/services/departement.service';
@Component({
    selector: 'app-jour-semaine',
    templateUrl: './jour-semaine.component.html',
    styleUrls: ['./jour-semaine.component.scss'],
})

export class JourSemaineComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;

//joursemaines: JourSemaine[];
joursemaines : JourSemaine[];
p=1;
    highlighted: boolean = false;

roleAdd= false;
roleEdit= false;
roleDelete= false;
    constructor(
    public authService: AuthService,
    public departementService: DepartementService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public joursemaineService: JourSemaineService) {
    }

  ngOnInit(): void {
//Autorisation des droits ajouter, modififer, supprimer etc..
this.roleAdd =  this.authService.hasPermission("7520b7f2-8bbc-48c5-a079-ce7760a7e91e");
this.roleEdit =  this.authService.hasPermission("80c4941f-8334-480b-b4a2-9eefed0e5e2a");
this.roleDelete =  this.authService.hasPermission("bc3b06f1-89e3-400c-9326-80041a7608dd");

console.log("######################################## this.roleAdd  "+this.roleAdd );
   this.getAllJourSemaine ();
this.getDepartementsByRegion("34a304ba-4138-4ee8-be78-00e65f0cf1481");
  }
    ngAfterViewChecked() {
    }


getAllJourSemaine () {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.joursemaineService.getJourSemaines().subscribe( data => {
 this.spinner.hide();
 this.joursemaines = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

getDepartementsByRegion (id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.spinner.hide();
 //this.joursemaines = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ departement",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddJourSemaineComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllJourSemaine ();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(joursemaine: JourSemaine) {
        const modalRef = this.modalService.open(AddJourSemaineComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllJourSemaine ();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = joursemaine;
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

    this.joursemaineService.deleteJourSemaine(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllJourSemaine ();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}


}

