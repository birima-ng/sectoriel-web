import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Commune} from 'app/components/modeles/commune.modele';
import {CommuneService} from 'app/components/services/commune.service';
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Departement} from 'app/components/modeles/departement.modele';
import {DepartementService} from 'app/components/services/departement.service';
@Component({
  selector: 'app-add-commune',
  templateUrl: './add-commune.component.html',
  styleUrls: ['./add-commune.component.scss']
})

export class AddCommuneComponent {
invalidLogin = false;
submitted=false;
lng="en";
commune: Commune;
departements : Departement[];
departement: Departement;

regions : Region[];
region: Region;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    departement: new UntypedFormControl(null, [Validators.required]),
    region: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private departementService: DepartementService,
    private regionService: RegionService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private communeService: CommuneService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.departement = null;
this.region = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      departement: this.entity.departement
    });
this.departement = this.entity.departement;
this.region = this.entity.departement.region;
console.log("########################## - this.entity.departement",this.entity.departement);
}else {
//departement = this.entity.departement;
this.departement = null;
this.region = null;
}
   this.getAllRegion();
  // this.getAllDepartement();
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

    this.communeService.createCommune(this.addForm.value).subscribe(
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

    this.communeService.updateCommune(this.addForm.value).subscribe(
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
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

onChangeRegion(region: Region) {
console.log("################", region.nom);
this.getDepartementsByRegion(region.id);
}

getDepartementsByRegion(id: string) {
 console.log("################1");
 this.departementService.getDepartementsByRegion(id).subscribe( data => {
 this.departements = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

}
