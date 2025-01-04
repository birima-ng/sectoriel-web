import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddGraviteBlessureComponent } from './add/add-gravite-blessure.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {GraviteBlessure} from "../../modeles/gravite-blessure.modele";
import {GraviteBlessureService} from "../../services/gravite-blessure.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-gravite-blessure',
    templateUrl: './gravite-blessure.component.html',
    styleUrls: ['./gravite-blessure.component.scss'],
})

export class GraviteBlessureComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
graviteblessures : GraviteBlessure[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private graviteBlessureService: GraviteBlessureService) {
    }

  ngOnInit(): void {
   this.getAllGraviteBlessure();
  }
    ngAfterViewChecked() {
    }


getAllGraviteBlessure() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.graviteBlessureService.getGraviteBlessures().subscribe( data => {
 this.spinner.hide();
 this.graviteblessures = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddGraviteBlessureComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllGraviteBlessure();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(graviteBlessure: GraviteBlessure) {
        const modalRef = this.modalService.open(AddGraviteBlessureComponent);
        modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllGraviteBlessure();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = graviteBlessure;
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

    this.graviteBlessureService.deleteGraviteBlessure(id).subscribe( data => {
    this.toastr.success("Gravité blessure supprimée avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllGraviteBlessure();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

