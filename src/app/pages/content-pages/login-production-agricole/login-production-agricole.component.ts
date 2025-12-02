import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../../components/services/login.service';
import { ProfilActionService } from '../../../components/services/profil-action.service';
import { UserService } from '../../../components/services/user.service';
import { User } from '../../../components/modeles/user.modele';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-production-agricole',
  templateUrl: './login-production-agricole.component.html',
  styleUrls: ['./login-production-agricole.component.scss']
})

export class LoginProductionAgricoleComponent {
invalidLogin = false;
submitted=false;
lng="en";
user:User;

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });


  constructor(
    public profilactionService: ProfilActionService,
    public toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
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

  }

  checkLogin() {
localStorage.removeItem('access_token');
this.submitted=true;
 this.loginFormSubmitted = true;
    this.loginService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
if(data){
console.log("############################################### data.token", data.token);
      localStorage.setItem('access_token', data.token);
    this.userService.getUserByUsername(this.loginForm.value.username).subscribe(
      data => {
        this.spinner.hide();
       console.log("############################################ data getUserByUsername", data);
       localStorage.setItem('lnom', data.prenom+" " +data.nom);
       //localStorage.setItem('lorganisation', data.organisationnelle.nom);
       localStorage.setItem('lorganisation', "Service");
//localStorage.setItem('systeme', "Service");
       localStorage.setItem('systeme', data.systeme.libelle);
       localStorage.setItem('url', data.systeme.url);
localStorage.setItem('pays', "Service");
localStorage.setItem('codePays', data.pays.code);
console.log("############################################ data  data.pays.code",  data.pays.code);
       localStorage.setItem('profil', data.profile.id);
    this.profilactionService.getProfilActionRole(data.profile.id).subscribe( data => {
    const actionsJson = JSON.stringify(data);
    localStorage.setItem('roles', actionsJson);
console.log("############################################ roles ",data);

   this.router.navigate(['/components/accueil']);
      },
      error => {
    console.log("error avant !!!");
      });

      },
      error => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);
}else {
 this.toastr.error('Identifiant ou mot de passe incorrect!!!', 'STOCK-PRIX');
}
      },
      error => {
        this.toastr.error('Erreur serveur!', 'STOCK-PRIX');
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}


}
