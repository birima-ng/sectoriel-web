import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {UserLog} from 'app/components/modeles/user-log.modele';
import {UserLogService} from 'app/components/services/user-log.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-user-log',
    templateUrl: './user-log.component.html',
    styleUrls: ['./user-log.component.scss'],
})

export class UserLogComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
userlogs : UserLog[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userlogService: UserLogService) {
    }

  ngOnInit(): void {
   this.getAllUserLog();
  }
    ngAfterViewChecked() {
    }


getAllUserLog() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.userlogService.getUserLogs().subscribe( data => {
 this.spinner.hide();
 this.userlogs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}


}

