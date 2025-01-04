import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs/index";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService} from 'app/components/services/file-upload.service';
import { Document } from 'app/components/modeles/document.modele';
import { DocumentService } from 'app/components/services/document.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../../environments/environment';
declare var window: any;



@Component({
  selector: 'app-baac-files',
  templateUrl: './baac-files.component.html',
  styleUrls: ['./baac-files.component.css']
})
export class BaacDocumentComponent implements OnInit {

selectedFiles?: FileList;
progressInfos: any[] = [];
message: string[] = [];
fileInfos?: Observable<any>;


id='';
addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;

documents: Document[];
document: Document;

docUrl: string = environment.docUrl;
nfactutre = '';
documentId = '';
constructor(
  private cdr: ChangeDetectorRef,
  private documentService: DocumentService,
  private uploadService: FileUploadService,
  private actRoute: ActivatedRoute,
  private modalService: NgbModal,
  private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

this.fileInfos = this.uploadService.getFiles();

this.actRoute.queryParams.subscribe(params => {
        this.documentId = params['vwp'];
        this.allDocument(this.documentId);
    });


    this.formModal = new window.bootstrap.Modal( document.getElementById('previsionModal'));
    this.formModalSup = new window.bootstrap.Modal( document.getElementById('formModalSup'));

   this.addForm = this.formBuilder.group({
  id:new FormControl(''),
  crop: new FormControl(null, Validators.required),
  cultivar: new FormControl(null, Validators.required),
  cycle: new FormControl(null, Validators.required),
  niveau: new FormControl(null, Validators.required),
  quantiteprevision: new FormControl(''),
  etat: new FormControl(''),
  superficie: new FormControl('', Validators.required),
  rendement: new FormControl('', Validators.required)
    });


 this.supForm = this.formBuilder.group({
      idsup: new FormControl('')
    });

  }

formAdd() {
this.addForm.reset();
this.submitted = false;
this.formModal.show();
}

 get f() { return this.addForm.controls; }
 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }
onSubmit() {

}

onClose(){
this.formModalSup.hide();
}

onCloseSup(){
this.formModalSup.hide();
}

allDocument (documentId){
this.documentService.getDocumentByBaacId(documentId).subscribe(
data => {
 this.documents = data;
 this.cdr.detectChanges();
 });
}


onDelete() {
this.documentService.deleteDocument(this.supForm.get('idsup').value).subscribe( data => {
this.allDocument(this.documentId);
this.formModalSup.hide();
      },
      error => {
console.log("error avant !!!");
      });
}

formSup(id: string) {
this.supForm.get('idsup').setValue(id);
console.log("################################################## sup "+id);
this.formModalSup.show();
}


selectFiles(event): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
}

uploadFiles(): void {
  this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
this.allDocument(this.documentId);
}

upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };
  if (file) {
    this.uploadService.uploadSarre(file,this.documentId).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.cdr.detectChanges();
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
        }
this.allDocument(this.documentId);
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
        this.fileInfos = this.uploadService.getFiles();
      }
    });
  }
}

}
