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
import {Unite} from "app/components/modeles/unite.modele";
import {UniteService} from "app/components/services/unite.service";
import {TypeProduit} from "../../modeles/type-produit.modele";
import {TypeProduitService} from "../../services/type-produit.service";
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {CollecteDTO} from "app/components/modeles/collecte-dto.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";
declare var window: any;

@Component({
    selector: 'app-config-prix',
    templateUrl: './config-prix.component.html',
    styleUrls: ['./config-prix.component.scss'],
})

export class ConfigPrixComponent implements OnInit {

configprixsForm: UntypedFormGroup;
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
unites : Unite[];
unite : Unite;
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
    private uniteService: UniteService,
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

   this.actRoute.queryParams.subscribe(params => {
        this.idEntete = params['vwp'];
         // this.getConfigPrixProduitId(this.idEntete);
this.datecollecte = this.addForm.value.datecollecte;
this.addForm.value.entreprise = this.idEntete;
          this.getConfigPrixByEntreprise(this.addForm.value);
        });

   this.getAllUnite();
   this.getAllTypeProduits();
  }
    ngAfterViewChecked() {
    }


getConfigPrixProduitId(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.configprixService.getConfigPrixByEntete(id).subscribe( data => {
 this.spinner.hide();
 this.configprixsForm = this.fb.group({
        configprixarrys: this.fb.array(data.configprixs.map(configprix1 => this.createConfigPrixGroup(configprix1)))
      });
 this.configprixs = data.configprixs;
 this.enteteconfigprix = data.enteteconfigprix;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ --- birima -- birima",data); });
 console.log("################2");
}

  get configprixarrys(): UntypedFormArray {
    return this.configprixsForm.get('configprixarrys') as UntypedFormArray;
  }

  onEditValue(index: number): void {
    const configprixGroup = this.configprixarrys.at(index);
    const configprix = configprixGroup.value;
console.log("##############################################", configprix);
    this.configprixService.updateConfigPrix(configprix).subscribe(updatedProduct => {

    });
  }

createConfigPrixGroup(configprix: ConfigPrix): UntypedFormGroup {
console.log("#######################biribiri ", configprix);
    return this.fb.group({
      id: [configprix.id],
      produit: [configprix.produit],
      unite: [configprix.unite],
      prix: [configprix.prix],
      stock: [configprix.stock],
      prixachat: [configprix.prixachat],
    });
  }


getConfigPrixTypeProduitId(id: string,idtypefiche) {

 this.configprixService.getConfigPrixTypeProduitId(id, idtypefiche).subscribe( data => {
 this.spinner.hide();
  this.configprixsForm = this.fb.group({
        configprixarrys: this.fb.array(data.configprixs.map(configprix1 => this.createConfigPrixGroup(configprix1)))
      });
 this.configprixs = data.configprixs;
 this.cdr.detectChanges(); // Forcer la détection des changements
 console.log("################",data); });
 console.log("################2");
}

getAllUnite() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.uniteService.getUnites().subscribe( data => {
 this.spinner.hide();
 this.unites = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }
getConfigPrixByEntreprise(collectedto: CollecteDTO){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.configprixService.getConfigPrixByEntreprise(collectedto).subscribe( data => {
console.log("####################################### --- data",data);
 this.spinner.hide();
 this.configprixsForm = this.fb.group({
        configprixarrys: this.fb.array(data.configprixs.map(configprix1 => this.createConfigPrixGroup(configprix1)))
      });
 this.configprixs = data.configprixs;
 this.entreprise = data.entreprise;
 this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

getAllTypeProduits() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.typeproduitService.getTypeProduits().subscribe( data => {
 this.spinner.hide();
 this.typeproduits = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

chargerProduit(typeproduit){
//this.getConfigPrixTypeProduitId(this.idEntete,typeproduit.id);
  this.datecollecte = this.addForm.value.datecollecte;
  this.addForm.value.entreprise = this.idEntete;
  this.addForm.value.idtypeproduit = typeproduit.id;
  this.getConfigPrixByEntreprise(this.addForm.value);
  this.title = 'Configuration produit: '+typeproduit.libelle;
}

  get lf() {
    return this.addForm.controls;
  }

onDateChange(event: any) {
  console.log("Date sélectionnée :", event.target.value);
  this.datecollecte = this.addForm.value.datecollecte;
  this.addForm.value.entreprise = this.idEntete;
  this.getConfigPrixByEntreprise(this.addForm.value);
}

}

