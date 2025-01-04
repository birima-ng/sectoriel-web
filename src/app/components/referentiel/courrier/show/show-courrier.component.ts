import { Component, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
import {Thematique} from "app/components/modeles/thematique.modele";
import {ThematiqueService} from "app/components/services/thematique.service";
import { ChangeDetectorRef } from '@angular/core';
import { FileUploadService} from 'app/components/services/file-upload.service';
import {FichierJoint} from 'app/components/modeles/fichier-joint.modele';
@Component({
  selector: 'app-show-courrier',
  templateUrl: './show-courrier.component.html',
  styleUrls: ['./show-courrier.component.scss']
})

export class ShowCourrierComponent {
fileUrl: SafeResourceUrl | null = null;
selectedFiles?: FileList;
invalidLogin = false;
submitted=false;
lng="en";
courrier: Courrier;
fonctions : Fonction[]; //regions pour respecter le principe
fonction: Fonction;
servicedepartements : ServiceDepartement[]; //regions pour respecter le principe
servicedepartement: ServiceDepartement;
thematiques : Thematique[];
thematique : Thematique;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    objetcourrier: new UntypedFormControl('', [Validators.required]),
    message: new UntypedFormControl('', [Validators.required]),
    thematique: new UntypedFormControl(null, [Validators.required]),
    destinataire: new UntypedFormControl('', [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: FileUploadService,
    private cdr: ChangeDetectorRef,
    private thematiqueService: ThematiqueService,
    private fonctionService: FonctionService,
    private servicedepartementService: ServiceDepartementService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private courrierService: CourrierService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
if(this.action == 'download'){
 this.fetchFile(this.entity.id);
}else {
}
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
/*
fetchFile(fileName: string) {
    this.uploadService.getFile(fileName).subscribe((file) => {
      const objectUrl = URL.createObjectURL(file);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    });
  }
*/
 fetchFile(fileName: string) {
    this.uploadService.getFile(fileName).subscribe((file) => {
      // Créer une URL temporaire et la rendre sûre pour Angular
      const objectUrl = URL.createObjectURL(file);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    });
  }
}
