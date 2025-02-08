import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {ClassificationRoute} from "../../modeles/classification-route.modele";
import {ClassificationRouteService} from "../../services/classification-route.service";
import {AddClassificationRouteComponent} from "./add/add-classification-route.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-classification-route',
    templateUrl: './classification-route.component.html',
    styleUrls: ['./classification-route.component.scss'],
})

export class ClassificationRouteComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  classificationroutes : ClassificationRoute[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private classificationrouteService: ClassificationRouteService) {
    }

  ngOnInit(): void {
   this.getAllClassificationRoute();
  }
    ngAfterViewChecked() {
    }


getAllClassificationRoute() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.classificationrouteService.getClassificationRoutes().subscribe( data => {
 this.spinner.hide();
 this.classificationroutes = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddClassificationRouteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllClassificationRoute();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(classificationroute: ClassificationRoute) {
        const modalRef = this.modalService.open(AddClassificationRouteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllClassificationRoute();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = classificationroute;
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

    this.classificationrouteService.deleteClassificationRoute(id).subscribe( data => {

    this.toastr.success("Lumière supprimée avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllClassificationRoute();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

