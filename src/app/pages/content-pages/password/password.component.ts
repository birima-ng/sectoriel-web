import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {User} from 'app/components/modeles/user.modele';
import {UserService} from 'app/components/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})

export class PasswordComponent  implements OnInit {

id = '';
submitted=false;
hidePassword = true;
hideConfirmPassword = true;
success = false;
addForm :UntypedFormGroup;


constructor(
  private cdr: ChangeDetectorRef,
  private fb: UntypedFormBuilder,
  public toastr: ToastrService,
  private spinner: NgxSpinnerService,
  private router: Router,
  private userService: UserService,
  private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    this.actRoute.queryParams.subscribe(params => {
        this.id = params['pwal'];});
        console.log("#########################################", this.id);
      this.addForm = this.fb.group({
      id: new UntypedFormControl(''),
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });

    }

    onSubmit() {
    this.submitted=true;
  this.addForm.patchValue({
      id: this.id});
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


    this.userService.changePasswordUser(this.addForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
if(data.result){
 this.spinner.hide();

 this.toastr.success('Modification du mot de passe effectuée avec succès!', 'STOCK-PRIX');
this.success = true;
this.cdr.detectChanges();
}else {
 this.spinner.hide();
 this.toastr.error("Erreur de la modificcation du mot de passe!", 'STOCK-PRIX');
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

  checkPasswords(group: UntypedFormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

}
