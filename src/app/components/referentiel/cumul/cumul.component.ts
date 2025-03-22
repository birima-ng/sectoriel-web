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
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';

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
departements : Departement[];
departement: Departement;
regions : Region[];
region: Region;
idEntete = '';
title = 'Configuration produit pour tous les types de produits'
p=1;
datecollecte;
today: string = new Date().toISOString().split('T')[0];
    highlighted: boolean = false;
  addForm = new UntypedFormGroup({
   datecollecte: new UntypedFormControl(new Date().toISOString().split('T')[0]),
   startDate: new UntypedFormControl(null),
   endDate: new UntypedFormControl(null),
   region: new UntypedFormControl(null),
   departement: new UntypedFormControl(null),
  });
    constructor(
    private departementService: DepartementService,
    private regionService: RegionService,
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
    this.region = null;
    this.departement = null;
    this.getConfigPrixCumul();
    this.getAllRegion();
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


onChangeRegion(region: Region) {
if(region){
console.log("################", region.nom);
this.getDepartementsByRegion(region.id);
}
this.departement = null;
}


getDepartementsByRegion(id: string) {
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
startDate = null;
endDate = null;
onDateChange(): void {
     this.startDate  = this.addForm.value.startDate;
     this.endDate  = this.addForm.value.endDate;
console.log("Date debut", this.startDate);
console.log("Date fin", this.endDate);

    if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
     this.addForm.patchValue({endDate: null});
     this.toastr.error('La date de début doit être avant la date de fin.', 'PRIX-STOCK');
     this.addForm.value.endDate = null;
      return;
    }
   // this.dateRangeSelected.emit({ startDate, endDate });
  }

onSearch(){
console.log("################################################## this.addForm.value ",this.addForm.value);
this.getConfigPrixCumulDTO(this.addForm.value);
}

getConfigPrixCumulDTO(search: any) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.configprixService.getConfigPrixCumulDTO(search).subscribe( data => {
 this.spinner.hide();
 this.cumuls = data;
console.log("############################# ----- @@@@@@@@@@", data);
 this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

}

