import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Document} from "../../../modeles/document.modele";
import {DocumentService} from "../../../services/document.service";

import {NatureDocument} from "../../../modeles/nature-document.modele";
import {NatureDocumentService} from "../../../services/nature-document.service";

import {ZoneApplication} from "../../../modeles/zone-application.modele";
import {ZoneApplicationService} from "../../../services/zone-application.service";

import {Thematique} from "../../../modeles/thematique.modele";
import {ThematiqueService} from "../../../services/thematique.service";
import { FileUploadService} from 'app/components/services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})

export class AddDocumentComponent {
selectedFiles?: FileList;
invalidLogin = false;
submitted=false;
lng="en";
  document: Document;
  naturedocuments: NatureDocument[];
  naturedocument: NatureDocument;

  thematiques: Thematique[];
  thematique: Thematique;

  zoneapplications: ZoneApplication[];
  zoneapplication: ZoneApplication;

  isLoginFailed = false;
path = '';
  safeSrc: SafeResourceUrl;
docUrl: string = environment.docUrl;
  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    contenusupplementaire: new UntypedFormControl('', [Validators.required]),
    naturedocument: new UntypedFormControl(null, [Validators.required]),
    thematique: new UntypedFormControl(null, [Validators.required]),
    zoneapplication: new UntypedFormControl(null, [Validators.required]),
    intitule: new UntypedFormControl('', [Validators.required]),
    datedocument: new UntypedFormControl('', [Validators.required]),
    reference: new UntypedFormControl('', [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private domSanitizer: DomSanitizer,
    private uploadService: FileUploadService,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private documentService: DocumentService,
    private naturedocumentService: NatureDocumentService,
    private zoneapplicationService: ZoneApplicationService,
    private thematiqueService: ThematiqueService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.thematique = null;
this.naturedocument = null;
this.zoneapplication = null;
if(this.action == 'edit'){
   this.addForm.patchValue({
    id: this.entity.id,
    contenusupplementaire: this.entity.contenusupplementaire,
    naturedocument: this.entity.naturedocument,
    thematique: this.entity.thematique,
    zoneapplication: this.entity.zoneapplication,
    intitule: this.entity.intitule,
    datedocument: this.entity.datedocument,
    reference: this.entity.reference,
    });
 this.path = this.entity.path;
this.safeSrc =  this.domSanitizer.bypassSecurityTrustResourceUrl(this.docUrl+this.path);
this.thematique = this.entity.thematique;
this.naturedocument = this.entity.naturedocument;
this.zoneapplication = this.entity.zoneapplication;
}
 this.getAllNatureDocument();
 this.getAllZoneApplication();
 this.getAllThematique();
}

  // On submit button click
  onSubmit() {

this.submitted=true;
console.log("################################ this.addForm.value ", this.addForm.value);
    if (this.addForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    if(this.action =='add'){
        this.add();
    }else  if(this.action =='edit'){
       this.edit();
    }
}

add(){

    this.documentService.createDocument(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();
//fermer le popup
 this.uploadFiles(data.id)
this.activeModal.close('Data updated');
 this.toastr.success("Document ajoutée avec succès!", 'GED');
}else {
 this.toastr.error('La référence du document existe déjà!', 'GED');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

edit(){

    this.documentService.updateDocument(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();
//fermer le popup
 this.activeModal.close('Data updated');
 this.toastr.success("Document modifiée avec succès!", 'GED');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'GED');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

  get lf() {
    return this.addForm.controls;
  }

 compareFn(a, b) {
  if(a==b)
      return true
  else
    return a && b && a.id == b.id;
  }

getAllNatureDocument() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.naturedocumentService.getNatureDocuments().subscribe( data => {
 this.spinner.hide();
 this.naturedocuments = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

getAllThematique() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.thematiqueService.getThematiques().subscribe( data => {
 this.spinner.hide();
 this.thematiques = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

getAllZoneApplication() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.zoneapplicationService.getZoneApplications().subscribe( data => {
 this.spinner.hide();
 this.zoneapplications = data;
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

selectFiles(event): void {
  this.selectedFiles = event.target.files;
}


uploadFiles(documentId: string): void {
  //this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i],documentId);
    }
  }
}

upload(idx: number, file: File, documentId: string): void {
  //this.progressInfos[idx] = { value: 0, fileName: file.name };
  if (file) {
    this.uploadService.uploadDocument(file,documentId).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
         // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
         // this.cdr.detectChanges();
          //const msg = 'Uploaded the file successfully: ' + file.name;
          //this.message.push(msg);
         // this.fileInfos = this.uploadService.getFiles();
        }
      },
      error: (err: any) => {
        //this.progressInfos[idx].value = 0;
        //const msg = 'Could not upload the file: ' + file.name;
       // this.message.push(msg);
        //this.fileInfos = this.uploadService.getFiles();
      }
    });
  }
}


}
