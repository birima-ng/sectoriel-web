import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {ConfigUnite} from "../../modeles/config-unite.modele";
import {ConfigUniteService} from "../../services/config-unite.service";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {Unite} from "app/components/modeles/unite.modele";
import {UniteService} from "app/components/services/unite.service";
import {TypeProduit} from "../../modeles/type-produit.modele";
import {TypeProduitService} from "../../services/type-produit.service";
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {CollecteDTO} from "app/components/modeles/collecte-dto.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";

import {StadeCommerce} from 'app/components/modeles/stade-commerce.modele';
import {StadeCommerceService} from 'app/components/services/stade-commerce.service';

declare var window: any;

@Component({
    selector: 'app-config-unite',
    templateUrl: './config-unite.component.html',
    styleUrls: ['./config-unite.component.scss'],
})

export class ConfigUniteComponent implements OnInit {

configunitesForm: UntypedFormGroup;
displayedColumns: string[] = ['produit', 'unite', 'unite'];
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
typeproduits : TypeProduit[];
typeproduit : TypeProduit;
entreprise : Entreprise;
unites : Unite[];
unite : Unite;
stadecommerces : StadeCommerce[];
stadecommerce: StadeCommerce;
configunites : ConfigUnite[];
configunite : ConfigUnite;
idEntete = '';
title = 'Configuration unité pour tous les types de produits'
p=1;
datecollecte;
today: string = new Date().toISOString().split('T')[0];
    highlighted: boolean = false;
   addForm = new UntypedFormGroup({
    stadecommerce: new UntypedFormControl(null),
  });
    constructor(
    private stadecommerceService: StadeCommerceService,
    private uniteService: UniteService,
    private typeproduitService: TypeProduitService,
    private fb: UntypedFormBuilder,
    private actRoute: ActivatedRoute,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private configuniteService: ConfigUniteService) {
    }

  ngOnInit(): void {

   this.actRoute.queryParams.subscribe(params => {
        this.idEntete = params['vwp'];
this.datecollecte = this.addForm.value.datecollecte;
this.addForm.value.entreprise = this.idEntete;
        });
   this.getAllStadeCommerce();
   this.getAllUnite();
   this.getAllTypeProduits();
  }
    ngAfterViewChecked() {
    }

  get configunitearrys(): UntypedFormArray {
    return this.configunitesForm.get('configunitearrys') as UntypedFormArray;
  }

  onEditValue(index: number): void {
    const configuniteGroup = this.configunitearrys.at(index);
    const configunite = configuniteGroup.value;
console.log("##############################################", configunite);
    this.configuniteService.updateConfigUnite(configunite).subscribe(updatedProduct => {

    });
  }

createConfigUniteGroup(configunite: ConfigUnite): UntypedFormGroup {
console.log("#######################biribiri ", configunite);
    return this.fb.group({
      id: [configunite.id],
      produit: [configunite.produit],
      unite: [configunite.unite],
      stadecommerce: [configunite.stadecommerce],
    });
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
  this.datecollecte = this.addForm.value.datecollecte;
  this.addForm.value.entreprise = this.idEntete;
  this.addForm.value.idtypeproduit = typeproduit.id;
this.getConfigUniteStadecommerceIdAndTypeProduit(this.addForm.value.stadecommerce.id, typeproduit.id);
  this.title = 'Configuration unité: '+typeproduit.libelle;
}

  get lf() {
    return this.addForm.controls;
  }

onDateChange(event: any) {
  console.log("Date sélectionnée :", event.target.value);
  this.datecollecte = this.addForm.value.datecollecte;
  this.addForm.value.entreprise = this.idEntete;
}

getAllStadeCommerce() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.stadecommerceService.getStadeCommerces().subscribe( data => {
 this.spinner.hide();
 this.stadecommerces = data;
if(data){
     this.addForm.patchValue({
      stadecommerce: this.stadecommerces[0],
});
}
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

onChangeStadeCommerce(stadecommerce: StadeCommerce) {
if(stadecommerce){
this.getConfigUniteStadecommerceId(stadecommerce.id);
}

}


getConfigUniteStadecommerceId(id: string) {
 this.configuniteService.getConfigUniteStadecommerceId(id).subscribe( data => {
 this.configunites = data;
 this.configunitesForm = this.fb.group({
        configunitearrys: this.fb.array(this.configunites.map(configunite1 => this.createConfigUniteGroup(configunite1)))
      });
 this.cdr.detectChanges(); // Forcer la détection des changements
 console.log("################",data);
  });
 console.log("################2");
}


getConfigUniteStadecommerceIdAndTypeProduit(id: string,idtypeproduit) {
 this.configuniteService.getConfigUniteStadecommerceIdAndTypeProduit(id,idtypeproduit).subscribe( data => {
 this.configunites = data;
 this.configunitesForm = this.fb.group({
        configunitearrys: this.fb.array(this.configunites.map(configunite1 => this.createConfigUniteGroup(configunite1)))
      });
 this.cdr.detectChanges(); // Forcer la détection des changements
 console.log("################",data);
  });
 console.log("################2");
}


}

