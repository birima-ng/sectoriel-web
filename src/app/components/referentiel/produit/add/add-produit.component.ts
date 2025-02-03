import { Component, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Produit} from "app/components/modeles/produit.modele";
import {ProduitService} from "app/components/services/produit.service";
import {TypeProduit} from "app/components/modeles/type-produit.modele";
import {TypeProduitService} from "app/components/services/type-produit.service";
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})

export class AddProduitComponent {
invalidLogin = false;
submitted=false;
lng="en";
  produit: Produit;
typeproduits : TypeProduit[];
typeproduit : TypeProduit;
  isLoginFailed = false;

  addForm = new UntypedFormGroup({
     id: new UntypedFormControl(''),
    code: new UntypedFormControl('', [Validators.required]),
    libelle: new UntypedFormControl('', [Validators.required]),
    typeproduit: new UntypedFormControl(null, [Validators.required]),
  });

@Input() action: any;  // Peut être de n'importe quel type
@Input() entity: any;  // Peut être de n'importe quel type
  constructor(
    private cdr: ChangeDetectorRef,
    private typeproduitService: TypeProduitService,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private router: Router, private authService: AuthService,
    private produitService: ProduitService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

ngOnInit(): void {
this.typeproduit = null;
if(this.action == 'edit'){
      this.addForm.patchValue({
      id: this.entity.id,
      code: this.entity.code,
      libelle: this.entity.libelle,
      typeproduit: this.entity.typeproduit
    });

this.typeproduit =  this.entity.typeproduit;
}
this.getAllTypeProduit();
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

    this.produitService.createProduit(this.addForm.value).subscribe(
      data => {

if(data){
 this.spinner.hide();
//fermer le popup
this.activeModal.close('Data updated');
 this.toastr.success("Produit ajoutée avec succès!", 'STOCK-PRIX');
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

    this.produitService.updateProduit(this.addForm.value).subscribe(
      data => {
if(data){
 this.spinner.hide();
//fermer le popup
 this.activeModal.close('Data updated');
 this.toastr.success("Produit modifiée avec succès!", 'STOCK-PRIX');
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

getAllTypeProduit() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.typeproduitService.getTypeProduits().subscribe( data => {
 this.spinner.hide();
 this.typeproduits = data;
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
