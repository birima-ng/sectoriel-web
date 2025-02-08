import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Secteur} from "../../../modeles/secteur.modele";
import {SecteurService} from "../../../services/secteur.service";
import { ToastrService } from 'ngx-toastr';


import {Village} from 'app/components/modeles/village.modele';
import {VillageService} from 'app/components/services/village.service';
import {Commune} from 'app/components/modeles/commune.modele';
import {CommuneService} from 'app/components/services/commune.service';
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';

@Component({
  selector: 'app-add-secteur',
  templateUrl: './add-secteur.component.html',
  styleUrls: ['./add-secteur.component.scss']
})

export class AddSecteurComponent {
invalidLogin = false;
submitted=false;
lng="en";

villages : Village[];
village: Village;
departements : Departement[];
departement: Departement;
communes : Commune[];
commune: Commune;
regions : Region[];
region: Region;


secteur: Secteur;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    libelle: new UntypedFormControl('', [Validators.required]),
    village: new UntypedFormControl(null, [Validators.required]),
    commune: new UntypedFormControl(null, [Validators.required]),
    departement: new UntypedFormControl(null, [Validators.required]),
    region: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private departementService: DepartementService,
    private regionService: RegionService,
    private communeService: CommuneService,
    private villageService: VillageService,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private secteurService: SecteurService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.departement = null;
this.region = null;
this.commune = null;
this.village = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      libelle: this.entity.libelle
    });
}
   this.getAllRegion();
}

  get lf() {
    return this.addForm.controls;
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

    this.secteurService.createSecteur(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux ajouté avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'STOCK-PRIX');
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

    this.secteurService.updateSecteur(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux modifié avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'STOCK-PRIX');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}


getAllDepartement() {
 console.log("################1");
 this.departementService.getDepartements().subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

getAllRegion() {
 console.log("################1");
 this.regionService.getRegions().subscribe( data => {
 this.regions = data;
 console.log("################1111 regions ",this.regions);
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeRegion(region: Region) {
if(region){
console.log("################", region.nom);
this.getDepartementsByRegion(region.id);
}
this.communes = [];
this.commune = null;
this.departement = null;
}

getDepartementsByRegion(id: string) {
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeDepartement(departement: Departement) {
if(departement){
console.log("################", departement.nom);
this.getCommunesByDepartement(departement.id);
}
}

getVillagesByCommune(id: string) {
 console.log("################1");
 this.villageService.getVillagesByCommune(id).subscribe( data => {
 this.villages = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getCommunesByDepartement(id: string) {
 console.log("################1");
 this.communeService.getCommunesByDepartement(id).subscribe( data => {
 this.communes = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeCommune(commune: Commune) {
if(commune){
console.log("################", commune.nom);
this.getVillagesByCommune(commune.id);
}
}


}
