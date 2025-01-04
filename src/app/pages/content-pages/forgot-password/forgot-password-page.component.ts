import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {

submitted=false;
addForm = new UntypedFormGroup({
   email: new UntypedFormControl('', [Validators.required]),
  });


    @ViewChild('f') forogtPasswordForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    // On submit click, reset form fields
    onSubmit() {
       // this.forogtPasswordForm.reset();
     this.submitted=true;
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

  get lf() {
    return this.addForm.controls;
  }

}
