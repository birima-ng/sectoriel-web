import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {ConfigPrix} from "../../modeles/config-prix.modele";
import {ConfigPrixService} from "../../services/config-prix.service";
import {EnteteConfigPrix} from "../../modeles/entete-config-prix.modele";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {TypeProduit} from "../../modeles/type-produit.modele";
import {TypeProduitService} from "../../services/type-produit.service";
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {CollecteDTO} from "app/components/modeles/collecte-dto.modele";
import {CumulResultDTO} from "app/components/modeles/cumul-result-dto.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";
declare var window: any;

@Component({
    selector: 'app-cumul',
    templateUrl: './cumul.component.html',
    styleUrls: ['./cumul.component.scss'],
})

export class CumulComponent implements OnInit {

displayedColumns: string[] = ['produit', 'prix', 'unite'];
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
configprixs : ConfigPrix[];
typeproduits : TypeProduit[];
typeproduit : TypeProduit;
enteteconfigprix : EnteteConfigPrix;
entreprise : Entreprise;
cumuls : CumulResultDTO[];
idEntete = '';
title = 'Configuration produit pour tous les types de produits'
p=1;
datecollecte;
today: string = new Date().toISOString().split('T')[0];
    highlighted: boolean = false;
  addForm = new UntypedFormGroup({
   datecollecte: new UntypedFormControl(new Date().toISOString().split('T')[0]),
   entreprise: new UntypedFormControl(null),
   idtypeproduit: new UntypedFormControl(null),
  });
    constructor(
    private typeproduitService: TypeProduitService,
    private fb: UntypedFormBuilder,
    private actRoute: ActivatedRoute,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private configprixService: ConfigPrixService) {
    }

  ngOnInit(): void {
    this.getConfigPrixCumul();
  }

  ngAfterViewChecked() {
  }

  compareFn(a, b) {
     if(a==b)
         return true
     else
         return a && b && a.id == b.id;
  }

getConfigPrixCumul() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.configprixService.getConfigPrixCumul().subscribe( data => {
 this.spinner.hide();
 this.cumuls = data;
console.log("############################# ----- @@@@@@@@@@", data);
 this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

  get lf() {
    return this.addForm.controls;
  }

}

