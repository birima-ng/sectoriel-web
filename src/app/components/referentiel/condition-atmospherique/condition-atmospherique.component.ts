import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {AddConditionAtmospheriqueComponent} from "./add/add-condition-atmospherique.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {ClassificationRoute} from "../../modeles/classification-route.modele";
import {ConditionAtmospheriqueService} from "../../services/condition-atmospherique.service";
import {ConditionAtmospherique} from "../../modeles/condition-atmospherique.modele";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-condition-atmospherique',
    templateUrl: './condition-atmospherique.component.html',
    styleUrls: ['./condition-atmospherique.component.scss'],
})

export class ConditionAtmospheriqueComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
  conditionAtmospheriques : ConditionAtmospherique[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private conditionAtmospheriqueService: ConditionAtmospheriqueService) {
    }

  ngOnInit(): void {
   this.getAllConditionAtmospherique();
  }
    ngAfterViewChecked() {
    }


  getAllConditionAtmospherique() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.conditionAtmospheriqueService.geConditionAtmospheriques().subscribe( data => {
 this.spinner.hide();
 this.conditionAtmospheriques = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddConditionAtmospheriqueComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllConditionAtmospherique();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(conditionAtmospherique: ConditionAtmospherique) {
        const modalRef = this.modalService.open(AddConditionAtmospheriqueComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllConditionAtmospherique();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = conditionAtmospherique;
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

    this.conditionAtmospheriqueService.deleteConditionAtmospherique(id).subscribe( data => {
   this.toastr.success("Condition atmosphérique supprimée avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllConditionAtmospherique();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

