import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import {TypeUniteFdsService} from 'app/components/services/type-unite-fds.service';
import {UniteOrganisationnelle} from 'app/components/modeles/unite-organisationnelle.modele';
import {UniteOrganisationnelleService} from 'app/components/services/unite-organisationnelle.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-type-unite-fds',
  templateUrl: './add-type-unite-fds.component.html',
  styleUrls: ['./add-type-unite-fds.component.scss']
})

export class AddTypeUniteFdsComponent {
invalidLogin = false;
submitted=false;
lng="en";
typeunitefds: TypeUniteFds;
uniteorganisationnelles : UniteOrganisationnelle[];
uniteorganisationnelle : UniteOrganisationnelle;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    nom: new UntypedFormControl('', [Validators.required]),
    uniteorganisationnelle: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
  private organisationnelleService: UniteOrganisationnelleService,
  public activeModal: NgbActiveModal,
  private router: Router, private authService: AuthService,
  private typeunitefdsService: TypeUniteFdsService,
  private spinner: NgxSpinnerService,
  private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.uniteorganisationnelle = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      nom: this.entity.nom,
      uniteorganisationnelle: this.entity.uniteorganisationnelle
    });
   this.uniteorganisationnelle = this.entity.uniteorganisationnelle;
}
 this.getAllUniteOrganisationnelle();
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

    this.typeunitefdsService.createTypeUniteFds(this.addForm.value).subscribe(
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

    this.typeunitefdsService.updateTypeUniteFds(this.addForm.value).subscribe(
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

getAllUniteOrganisationnelle() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.organisationnelleService.getUniteOrganisationnelles().subscribe( data => {
 this.spinner.hide();
 this.uniteorganisationnelles = data;
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

}
