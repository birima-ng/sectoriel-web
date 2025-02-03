import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TypeProduit} from "app/components/modeles/type-produit.modele";
import {TypeProduitService} from "app/components/services/type-produit.service";
import {Categorie} from "app/components/modeles/categorie.modele";
import {CategorieService} from "app/components/services/categorie.service";
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-type-produit',
  templateUrl: './add-type-produit.component.html',
  styleUrls: ['./add-type-produit.component.scss']
})

export class AddTypeProduitComponent {
invalidLogin = false;
submitted=false;
lng="en";
typeproduit: TypeProduit;
categories : Categorie[];
categorie : Categorie;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    libelle: new UntypedFormControl('', [Validators.required]),
    categorie: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private categorieService: CategorieService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private typeproduitService: TypeProduitService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.categorie = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      libelle: this.entity.libelle,
      categorie: this.entity.categorie,
    });
this.categorie = this.entity.categorie;
}
   this.getAllCategorie();
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

    this.typeproduitService.createTypeProduit(this.addForm.value).subscribe(
      data => {
 if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux ajouté avec succès!", 'BAAC');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'BAAC');
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

    this.typeproduitService.updateTypeProduit(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();

//fermer le popup
this.activeModal.close('Data updated');
this.toastr.success("Etat feux modifié avec succès!", 'BAAC');
}else {
 this.toastr.error('Le code ou le libellé  existe déjà!', 'BAAC');
}
      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}

getAllCategorie() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.categorieService.getCategories().subscribe( data => {
 this.spinner.hide();
 this.categories = data;
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
