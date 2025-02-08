import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Intersection} from 'app/components/modeles/intersection.modele';
import {IntersectionService} from 'app/components/services/intersection.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddIntersectionComponent } from './add/add-intersection.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-intersection',
    templateUrl: './intersection.component.html',
    styleUrls: ['./intersection.component.scss'],
})

export class IntersectionComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  intersections : Intersection[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private intersectionService: IntersectionService) {
    }

  ngOnInit(): void {
   this.getAllIntersection();
  }
    ngAfterViewChecked() {
    }


getAllIntersection() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.intersectionService.getIntersections().subscribe( data => {
 this.spinner.hide();
 this.intersections = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddIntersectionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllIntersection();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(intersection: Intersection) {
        const modalRef = this.modalService.open(AddIntersectionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllIntersection();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = intersection;
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

    this.intersectionService.deleteIntersection(id).subscribe( data => {
    this.spinner.hide();
    this.toastr.success("Intersection supprimée avec succès!", 'STOCK-PRIX');
    this.getAllIntersection();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

