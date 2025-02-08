import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TypeChargementService} from 'app/components/services/type-chargement.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddGenreVehiculeComponent } from './add/add-genre-vehicule.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {GenreVehicule} from "../../modeles/genre-vehicule.modele";
import {GenreVehiculeService} from "../../services/genre-vehicule.service";
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
    selector: 'app-genre-vehicule',
    templateUrl: './genre-vehicule.component.html',
    styleUrls: ['./genre-vehicule.component.scss'],
})

export class GenreVehiculeComponent implements OnInit {

addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
genrevehicules : GenreVehicule[];
p=1;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private genrevehiculeService: GenreVehiculeService) {
    }

  ngOnInit(): void {
   this.getAllGenreVehicule();
  }
    ngAfterViewChecked() {
    }


getAllGenreVehicule() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.genrevehiculeService.getGenreVehicules().subscribe( data => {
 this.spinner.hide();
 this.genrevehicules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        const modalRef = this.modalService.open(AddGenreVehiculeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllGenreVehicule();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


    formEdit(genrevehiculeService: GenreVehicule) {
        const modalRef = this.modalService.open(AddGenreVehiculeComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllGenreVehicule();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = genrevehiculeService;
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

    this.genrevehiculeService.deleteGenreVehicule(id).subscribe( data => {
    this.toastr.success("Genre véhicule supprimé avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllGenreVehicule();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

}

