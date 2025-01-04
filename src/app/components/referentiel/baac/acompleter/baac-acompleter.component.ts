import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Baac} from 'app/components/modeles/baac.modele';
import { BaacService} from 'app/components/services/baac.service';
import { DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddBaacComponent } from 'app/components/referentiel/baac/add/add-baac.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-baac-acompleter',
    templateUrl: './baac-acompleter.component.html',
    styleUrls: ['./baac-acompleter.component.scss'],
})

export class BaacACompleterComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;

baacs : Baac[];
p=1;
    highlighted: boolean = false;
    constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private baacService: BaacService) {
    }

  ngOnInit(): void {
   this.getAllBaac();
  }
    ngAfterViewChecked() {
    }


getAllBaac() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.baacService.getBaacs().subscribe( data => {
 this.spinner.hide();
 this.baacs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
 const modalOptions: NgbModalOptions = {
      windowClass: 'custom-modal-size'
    };
        const modalRef = this.modalService.open(AddBaacComponent, modalOptions);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllBaac();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(baac: Baac) {
        const modalRef = this.modalService.open(AddBaacComponent, { windowClass: 'custom-modal-size' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllBaac();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = baac;
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

    this.baacService.deleteBaac(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllBaac();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}

