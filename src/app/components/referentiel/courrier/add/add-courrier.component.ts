import { Component, Input, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Courrier} from 'app/components/modeles/courrier.modele';
import {CourrierService} from 'app/components/services/courrier.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Fonction} from 'app/components/modeles/fonction.modele';
import {FonctionService} from 'app/components/services/fonction.service';
import {ServiceDepartement} from 'app/components/modeles/service-departement.modele';
import {ServiceDepartementService} from 'app/components/services/service-departement.service';

import { ChangeDetectorRef } from '@angular/core';
import { FileUploadService} from 'app/components/services/file-upload.service';
@Component({
  selector: 'app-add-courrier',
  templateUrl: './add-courrier.component.html',
  styleUrls: ['./add-courrier.component.scss']
})

export class AddCourrierComponent {
selectedFiles?: FileList;
invalidLogin = false;
submitted=false;
lng="en";
courrier: Courrier;
fonctions : Fonction[]; //regions pour respecter le principe
fonction: Fonction;
servicedepartements : ServiceDepartement[]; //regions pour respecter le principe
servicedepartement: ServiceDepartement;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    objetcourrier: new UntypedFormControl('', [Validators.required]),
    message: new UntypedFormControl('', [Validators.required]),
    reeference: new UntypedFormControl(''),
    destinataire: new UntypedFormControl('', [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private uploadService: FileUploadService,
    private cdr: ChangeDetectorRef,
    private fonctionService: FonctionService,
    private servicedepartementService: ServiceDepartementService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private courrierService: CourrierService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.fonction = null;
this.servicedepartement = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      telephone: this.entity.telephone,
      email: this.entity.email,
      nom: this.entity.nom,
      prenom: this.entity.prenom,
      fonction: this.entity.fonction,
      destinataire: this.entity.destinataire,
    });
this.fonction = this.entity.fonction;
this.servicedepartement = this.entity.servicedepartement;
console.log("########################## - this.entity.fonction",this.entity.fonction);
console.log("########################## - this.entity.servicedepartement",this.entity.servicedepartement);
}else {
this.fonction = null;
this.servicedepartement = null;
}
   this.getAllFonction();
   this.getAllServiceDepartement();
}

  get lf() {
    return this.addForm.controls;
  }

  // On submit button click
  onSubmit() {

this.submitted=true;
console.log("################################ this.addForm.value ", this.addForm.value);
//return;
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

    this.courrierService.createCourrier(this.addForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
 this.spinner.hide();
this.uploadFiles(data.id);
//fermer le popup
this.activeModal.close('Data updated');
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

edit(){

    this.courrierService.updateCourrier(this.addForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

getAllFonction() {
 console.log("################1");
 this.fonctionService.getFonctions().subscribe( data => {
 this.fonctions = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getAllServiceDepartement() {
 console.log("################1");
 this.servicedepartementService.getServiceDepartements().subscribe( data => {
 this.servicedepartements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

updateContent(event: any): void {
  const htmlContent = event.html; // Récupère le contenu HTML
console.log("############################# message", htmlContent);
 // this.addForm.get('message')?.setValue(htmlContent, { emitEvent: false });
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
    this.uploadService.uploadFileCourrier(file,documentId).subscribe({
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
