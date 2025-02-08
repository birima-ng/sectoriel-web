import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {User} from 'app/components/modeles/user.modele';
import {UserService} from 'app/components/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.scss']
})

export class ActivationComponent  implements OnInit {

token = '';
submitted=false;
addForm = new UntypedFormGroup({
     codeactivation: new UntypedFormControl('', [Validators.required]),
     token: new UntypedFormControl(''),
  });


constructor(
  public toastr: ToastrService,
  private spinner: NgxSpinnerService,
  private router: Router,
  private userService: UserService,
  private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.actRoute.queryParams.subscribe(params => {
        this.token = params['token'];});
        console.log("#########################################", this.token);
    }

    onSubmit() {
    this.submitted=true;
  this.addForm.patchValue({
      token: this.token});
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


    this.userService.getUserByCodeactivationAndToken(this.addForm.value.codeactivation,this.token).subscribe(
      data => {
console.log("################################ Data ", data);
if(data){
 this.spinner.hide();

 //this.toastr.success('Utilisateur ajouté avec succès!', 'STOCK-PRIX');
   this.router.navigate(['/pages/change-password'],{ queryParams: { pwal: data.id } });
}else {
 this.spinner.hide();
 this.toastr.error("Le code d'activation est incorrect!", 'STOCK-PRIX');
}

      },
      error => {
        this.spinner.hide();
        console.log('error: '+error)

      }

);

     }

  get lf() {
    return this.addForm.controls;
  }

}
