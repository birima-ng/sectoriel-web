import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import {AddDocumentComponent} from "./add/add-document.component";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {Document} from "../../modeles/document.modele";
import {DocumentService} from "../../services/document.service";
import {NatureDocument} from "app/components/modeles/nature-document.modele";
import {NatureDocumentService} from "app/components/services/nature-document.service";

import {ZoneApplication} from "app/components/modeles/zone-application.modele";
import {ZoneApplicationService} from "app/components/services/zone-application.service";

import {Thematique} from "app/components/modeles/thematique.modele";
import {ThematiqueService} from "app/components/services/thematique.service";

import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss'],
encapsulation: ViewEncapsulation.None,
})

export class DocumentComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
 documents : Document[];
naturedocuments: NatureDocument[];
naturedocument: NatureDocument;

thematiques: Thematique[];
thematique: Thematique;

zoneapplications: ZoneApplication[];
zoneapplication: ZoneApplication;

searchForm = new UntypedFormGroup({
    contenusupplementaire: new UntypedFormControl('', [Validators.required]),
    naturedocument: new UntypedFormControl(null, [Validators.required]),
    thematique: new UntypedFormControl(null, [Validators.required]),
    zoneapplication: new UntypedFormControl(null, [Validators.required]),
    intitule: new UntypedFormControl('', [Validators.required]),
    datedocument: new UntypedFormControl('', [Validators.required]),
    reference: new UntypedFormControl('', [Validators.required]),
  });
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private naturedocumentService: NatureDocumentService,
    private zoneapplicationService: ZoneApplicationService,
    private thematiqueService: ThematiqueService,
    private documentService: DocumentService) {
    }

  ngOnInit(): void {
   this.getAllDocument();
 this.getAllNatureDocument();
 this.getAllZoneApplication();
 this.getAllThematique();
 this.zoneapplication = null;
 this.thematique = null;
 this.naturedocument = null;
  }
    ngAfterViewChecked() {
    }


  getAllDocument() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.documentService.getDocuments().subscribe( data => {
 this.spinner.hide();
 this.documents = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddDocumentComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDocument();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(document: Document) {
        const modalRef = this.modalService.open(AddDocumentComponent, { windowClass: 'custom-modal' });
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllDocument();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = document;
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

    this.documentService.deleteDocument(id).subscribe( data => {
    this.toastr.success("Document supprimée avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllDocument();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
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

}

