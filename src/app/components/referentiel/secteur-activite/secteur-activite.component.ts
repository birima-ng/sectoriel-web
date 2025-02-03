import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddSecteurActiviteComponent } from './add/add-secteur-activite.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {SecteurActivite} from "app/components/modeles/secteur-activite.modele";
import {SecteurActiviteService} from "app/components/services/secteur-activite.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-secteur-activite',
    templateUrl: './secteur-activite.component.html',
    styleUrls: ['./secteur-activite.component.scss'],
})

export class SecteurActiviteComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
secteuractivites : SecteurActivite[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private secteurService: SecteurActiviteService) {
    }

  ngOnInit(): void {
   this.getAllSecteurActivite();
  }
    ngAfterViewChecked() {
    }


getAllSecteurActivite() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.secteurService.getSecteurActivites().subscribe( data => {
 this.spinner.hide();
 this.secteuractivites = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddSecteurActiviteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllSecteurActivite();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(etatFeux: SecteurActivite) {
        const modalRef = this.modalService.open(AddSecteurActiviteComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllSecteurActivite();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = etatFeux;
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

    this.secteurService.deleteSecteurActivite(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'BAAC');
    this.spinner.hide();
    this.getAllSecteurActivite();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

