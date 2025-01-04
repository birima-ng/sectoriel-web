import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Courrier} from 'app/components/modeles/courrier.modele';
import {CourrierService} from 'app/components/services/courrier.service';
import {FichierJoint} from 'app/components/modeles/fichier-joint.modele';
import {FichierJointService} from 'app/components/services/fichier-joint.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddCourrierComponent } from './add/add-courrier.component';
import { ShowCourrierComponent } from './show/show-courrier.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-courrier',
    templateUrl: './courrier.component.html',
    styleUrls: ['./courrier.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CourrierComponent implements OnInit {
@Input() message: string = 'Nouvelle notification';
selectedMail: any = null;
isVisible: boolean = true;
addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
courriers : Courrier[]; //courriers pour respecter le principe

fichierjoints : Courrier[];
fichierjoint : Courrier;
p=1;
    highlighted: boolean = false;
    selectedItem: any = null;
    constructor(
    private fichierjointService: FichierJointService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private courrierService: CourrierService) {
    }

  ngOnInit(): void {
   this.getAllCourrier();
  }
    ngAfterViewChecked() {
    }


getAllCourrier() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.courrierService.getCourriers().subscribe( data => {
 this.spinner.hide();
 this.courriers = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ bbbbbbbbbbb",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddCourrierComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllCourrier();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(courrier: Courrier) {
        const modalRef = this.modalService.open(AddCourrierComponent,  { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllCourrier();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = courrier;
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

    this.courrierService.deleteCourrier(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllCourrier();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}
/*
closePopup() {
    this.isVisible = false;
  }
*/

  openPopup(item: any) {
    this.selectedItem = item;
  }

  openIconPopup(event: MouseEvent, item: any) {
    event.stopPropagation(); // Empêche le déclenchement de l'événement parent
    this.selectedItem = item; // Personnalisez pour chaque icône si nécessaire
  }

  closePopup() {
    this.selectedItem = null;
  }

 openMail(item: any) {
    item.opened = true; // Marquer comme lu
    this.selectedMail = item;
    this.getFichierJointByCourierId(this.selectedMail.id);
  }

  goBack() {
    this.selectedMail = null;
  }
getFichierJointByCourierId(id: string){
 this.fichierjointService.getFichierJointByCourierId(id).subscribe( data => {
 this.fichierjoints = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ courriers ",data); });
}

    showCourrier(fichierjoint: FichierJoint) {
        const modalRef = this.modalService.open(ShowCourrierComponent,  { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {

    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'download';
        modalRef.componentInstance.entity = fichierjoint;
    }
}

