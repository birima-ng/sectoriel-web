import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Trace} from 'app/components/modeles/trace.modele';
import {TraceService} from 'app/components/services/trace.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddTraceComponent } from './add/add-trace.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
declare var window: any;

@Component({
    selector: 'app-trace',
    templateUrl: './trace.component.html',
    styleUrls: ['./trace.component.scss'],
})

export class TraceComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
traces : Trace[];
p=1;
    highlighted: boolean = false;
    constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private traceService: TraceService) {
    }

  ngOnInit(): void {
   this.getAllTrace();
  }
    ngAfterViewChecked() {
    }


getAllTrace() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.traceService.getTraces().subscribe( data => {
 this.spinner.hide();
 this.traces = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddTraceComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTrace();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(trace: Trace) {
        const modalRef = this.modalService.open(AddTraceComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllTrace();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = trace;
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

    this.traceService.deleteTrace(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllTrace();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

