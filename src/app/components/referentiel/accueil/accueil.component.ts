import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
declare var window: any;

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss'],
})

export class AccueilComponent implements OnInit {
safeSrc: SafeResourceUrl;
addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;

p=1;
    highlighted: boolean = false;
    constructor(
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,) {
    }

  ngOnInit(): void {
  //this.safeSrc =  this.domSanitizer.bypassSecurityTrustResourceUrl("http://docsarre.senhts.com/accueil1.php");
  }
    ngAfterViewChecked() {
    }

}

