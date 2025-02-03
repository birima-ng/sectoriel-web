import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EnteteConfigPrix} from "app/components/modeles/entete-config-prix.modele";
import {EnteteConfigPrixService} from "app/components/services/entete-config-prix.service";
import {Unite} from "app/components/modeles/unite.modele";
import {UniteService} from "app/components/services/unite.service";
import {Entreprise} from "app/components/modeles/entreprise.modele";
import {EntrepriseService} from "app/components/services/entreprise.service";
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-entete-config-prix',
  templateUrl: './add-entete-config-prix.component.html',
  styleUrls: ['./add-entete-config-prix.component.scss']
})

export class AddEnteteConfigPrixComponent {
invalidLogin = false;
submitted=false;
lng="en";
enteteconfigprix: EnteteConfigPrix;
unites : Unite[];
unite : Unite;
entreprises : Entreprise[];
entreprise : Entreprise;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    datecollecte: new UntypedFormControl('', [Validators.required]),
    entreprise: new UntypedFormControl(null, [Validators.required]),
    unite: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private uniteService: UniteService,
    private entrepriseService: EntrepriseService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private enteteconfigprixService: EnteteConfigPrixService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.unite = null;
this.entreprise = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      datecollecte: this.entity.datecollecte,
      entreprise: this.entity.entreprise,
      unite: this.entity.unite,
    });
this.unite = this.entity.unite;
this.entreprise = this.entity.entreprise;
}
   this.getAllUnite();
   this.getAllEntreprise();
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

    this.enteteconfigprixService.createEnteteConfigPrix(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Date de collecte ajoutée avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('La date de collecte existe déjà pour cette entreprise!', 'STOCK-PRIX');
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

    this.enteteconfigprixService.updateEnteteConfigPrix(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Date de collecte modifiée avec succès!", 'STOCK-PRIX');
}else {
 this.toastr.error('La date de collecte existe déjà pour cette entreprise!', 'STOCK-PRIX');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

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
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

getAllEntreprise() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.entrepriseService.getEntreprises().subscribe( data => {
 this.spinner.hide();
 this.entreprises = data;
this.cdr.detectChanges(); // Forcer la détection des changements
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
