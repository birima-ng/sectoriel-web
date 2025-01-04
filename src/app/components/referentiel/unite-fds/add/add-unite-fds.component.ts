import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import {UniteFdsService} from 'app/components/services/unite-fds.service';
import {Commune} from 'app/components/modeles/commune.modele';
import {CommuneService} from 'app/components/services/commune.service';
import {Village} from 'app/components/modeles/village.modele';
import {VillageService} from 'app/components/services/village.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import {TypeUniteFdsService} from 'app/components/services/type-unite-fds.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-unite-fds',
  templateUrl: './add-unite-fds.component.html',
  styleUrls: ['./add-unite-fds.component.scss']
})

export class AddUniteFdsComponent {
invalidLogin = false;
submitted=false;
lng="en";
unitefds: UniteFds;
typeunitefdss : TypeUniteFds[];
typeunitefds : TypeUniteFds;
communes : Commune[];
commune : Commune;
villages : Village[];
village : Village;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    telephone: new UntypedFormControl('', [Validators.required]),
    adresse: new UntypedFormControl('', [Validators.required]),
    typeunitefds: new UntypedFormControl(null, [Validators.required]),
    village: new UntypedFormControl(null, [Validators.required]),
    commune: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private cdr: ChangeDetectorRef,
    private typeunitefdsService: TypeUniteFdsService,
    private communeService: CommuneService,
    private villageService: VillageService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private unitefdsService: UniteFdsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.typeunitefds = null;
this.village = null;
this.commune = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      telephone: this.entity.telephone,
      adresse: this.entity.adresse,
      typeunitefds: this.entity.typeunitefds,
      village: this.entity.village
    });
this.typeunitefds = this.entity.typeunitefds;
this.village = this.entity.village;
this.commune = this.entity.village.commune;
}
this.getAllTypeUniteFds();
this.getAllVillage();
this.getAllCommune();
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

    this.unitefdsService.createUniteFds(this.addForm.value).subscribe(
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

edit(){

    this.unitefdsService.updateUniteFds(this.addForm.value).subscribe(
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

getAllTypeUniteFds() {
 this.typeunitefdsService.getTypeUniteFdss().subscribe( data => {
 this.typeunitefdss = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
});
}

getAllVillage() {
 this.villageService.getVillages().subscribe( data => {
 this.villages = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
});
}

getAllCommune() {
 this.communeService.getCommunes().subscribe( data => {
 this.communes = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
});
}

onChangeCommune(commune: Commune) {
if(commune){
console.log("################", commune.nom);
this.getVillagesByCommune(commune.id);
}
}

getVillagesByCommune(id: string) {
 console.log("################1");
 this.villageService.getVillagesByCommune(id).subscribe( data => {
 this.villages = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

}
