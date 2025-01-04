import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {Region} from 'app/components/modeles/region.modele';
import {RegionService} from 'app/components/services/region.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Pays} from 'app/components/modeles/pays.modele';
import {PaysService} from 'app/components/services/pays.service';
@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})

export class AddRegionComponent {
invalidLogin = false;
submitted=false;
lng="en";
region: Region;
payss : Pays[]; //payss pour respecter le principe
pays: Pays;

  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    pays: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private paysService: PaysService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private regionService: RegionService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.pays = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      pays: this.entity.pays
    });
this.pays = this.entity.pays;
console.log("########################## - this.entity.pays",this.entity.pays);
}else {
//pays = this.entity.pays;
this.pays = null;
}
   this.getAllPays();
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

    this.regionService.createRegion(this.addForm.value).subscribe(
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

    this.regionService.updateRegion(this.addForm.value).subscribe(
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

getAllPays() {
 console.log("################1");
 this.paysService.getPayss().subscribe( data => {
 this.payss = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}
 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }
}
