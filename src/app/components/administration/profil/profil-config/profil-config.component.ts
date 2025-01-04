import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgZone } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Module} from 'app/components/modeles/module.modele';
import {ModuleService} from 'app/components/services/module.service';
import {ProfilService} from 'app/components/services/profil.service';
import { Feature } from 'app/components/modeles/feature.modele';
import {FeatureService} from 'app/components/services/feature.service';
import { Action } from 'app/components/modeles/action.modele';
import {ActionService} from 'app/components/services/action.service';
import {ProfilActionService} from 'app/components/services/profil-action.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl, UntypedFormGroup, UntypedFormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FeatureDTO} from 'app/components/modeles/feature-dto.modele';
import {FeatureProfilActionDTO} from 'app/components/modeles/feature-profil-dto.modele';
import {ProfilActionDTO} from 'app/components/modeles/profil-action-dto.modele';
import { Router,ActivatedRoute } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-profil-config',
  templateUrl: './profil-config.component.html',
  styleUrls: ['./profil-config.component.scss', '../../../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilConfigComponent implements OnInit {
profil = "Profil";
idprofil = '';
  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;
  modules : Module[];
  features : Feature[];
featuresdto : FeatureDTO[];
featureprofildtos : FeatureProfilActionDTO[];
  actions : Action[];
actions1 :[];
  countries = [
      { value: "USA", name: 'USA' },
      { value: "UK", name: 'UK'},
      { value: "Canada", name: 'Canada' },
  ];

  selectedLanguages = ["English", "Spanish"];
  languages = [
      { value: "English", name: 'English' },
      { value: "Spanish", name: 'Spanish'},
      { value: "French", name: 'French' },
      { value: "Russian", name: 'Russian' },
      { value: "German", name: 'German'},
      { value: "Hindi", name: 'Hindi' },
      { value: "Arabic", name: 'Arabic' },
      { value: "Sanskrit", name: 'Sanskrit'},
  ];

  selectedMusic = ["Jazz", "Hip Hop"];
  music = [
      { value: "Rock", name: 'Rock' },
      { value: "Jazz", name: 'Jazz'},
      { value: "Disco", name: 'Disco' },
      { value: "Pop", name: 'Pop' },
      { value: "Techno", name: 'Techno'},
      { value: "Folk", name: 'Folk' },
      { value: "Hip Hop", name: 'Hip Hop' },
  ];

  selectedMovies = ["The Dark Knight", "Perl Harbour"];
  movies = [
      { value: "Avatar", name: 'Avatar' },
      { value: "The Dark Knight", name: 'The Dark Knight'},
      { value: "Harry Potter", name: 'Harry Potter' },
      { value: "Iron Man", name: 'Iron Man' },
      { value: "Spider Man", name: 'Spider Man'},
      { value: "Perl Harbour", name: 'Perl Harbour' },
      { value: "Airplane!", name: 'Airplane!' },
  ];

  generalForm = new UntypedFormGroup({
    username: new UntypedFormControl('hermione007', [Validators.required]),
    name: new UntypedFormControl('Hermione Granger', [Validators.required]),
    email: new UntypedFormControl('granger007@hogward.com', [Validators.required]),
    company: new UntypedFormControl('', [Validators.required])
  });

  changePasswordForm = new UntypedFormGroup({
    oldPassword: new UntypedFormControl('', [Validators.required]),
    newPassword: new UntypedFormControl('', [Validators.required]),
    retypeNewPassword: new UntypedFormControl('', [Validators.required])
  });

  infoForm = new UntypedFormGroup({
    bdate: new UntypedFormControl('', [Validators.required]),
    bio: new UntypedFormControl(''),
    phone: new UntypedFormControl('', [Validators.required]),
    website: new UntypedFormControl('')
  });

  socialForm = new UntypedFormGroup({
    twitter: new UntypedFormControl(''),
    facebook: new UntypedFormControl(''),
    googlePlus: new UntypedFormControl(''),
    linkedin: new UntypedFormControl(''),
    instagram: new UntypedFormControl(''),
    quora: new UntypedFormControl('')
  });

  constructor(
   private actRoute: ActivatedRoute,
   private profilactionService: ProfilActionService,
   private zone: NgZone,
   private spinner: NgxSpinnerService,
   private moduleService: ModuleService,
   private actionService: ActionService,
   private profilService: ProfilService,
   private featureService: FeatureService,
   public toastr: ToastrService,
   private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
        this.idprofil = params['vwp'];
            this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.profilService.getProfilById(this.idprofil).subscribe( data => {
 this.spinner.hide();
 this.profil = data.nom;
 this.cdr.detectChanges(); // Forcer la détection des changements
   });

        });
        console.log("#########################################", this.idprofil);


     this.getAllModule();
//this.getAction();
//this.getFeatureDto();
  }

  setActiveTab(tab) {
console.log("###################################################### tab",tab);
    this.activeTab = tab;
    //this.getFeatureByModuleId(tab+"");
    //this.getFeaturesDtoModuleId(tab+"");

    this.getFeatureProfilActionsDtoModuleId(tab+"",this.idprofil);
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;
    if (this.infoForm.invalid) {
      return;
    }
  }

  onSocialFormSubmit() {
    if (this.socialForm.invalid) {
      return;
    }
  }

getAllModule() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModules().subscribe( data => {
 this.spinner.hide();
 this.modules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}


getFeatureByModuleId(moduleId: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.featureService.getFeatureByModuleId(moduleId).subscribe( data => {
 this.spinner.hide();
 this.features = data;
  this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ feature ",data); });
 console.log("################2");
}

getActionByFeatureId(actionId: string) {
this.zone.run(() => {


    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.actionService.getActionByFeatureId(actionId).subscribe( data => {
 this.spinner.hide();
 //return data;
 // this.actions = data;
 //this.cdr.markForCheck();
 this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ feature ",data); });

 console.log("################2");
  return this.actions;
});
}


getAction() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.actionService.getActions1().subscribe( data => {
 this.spinner.hide();
 this.actions1 = data;
  this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ feature111 ",data); });
 console.log("################2");
}

getFeatureDto() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.featureService.getFeaturesDto().subscribe( data => {
 this.spinner.hide();
 this.featuresdto = data;
  //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ feature111 ",data); });
 console.log("################2");
}

getFeaturesDtoModuleId(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.featureService.getFeaturesDtoModuleId(id).subscribe( data => {
 this.spinner.hide();
 this.featuresdto = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ feature111 ",data); });
 console.log("################2");
}

getFeatureProfilActionsDtoModuleId(id: string, profil: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.featureService.getFeatureProfilActionsDtoModuleId(id,profil).subscribe( data => {
 this.spinner.hide();
 this.featureprofildtos = data;
 this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getFeatureProfilActionsDtoModuleId ",data); });
 console.log("################2");
}

changeValue(featuredto: ProfilActionDTO){
console.log("########################## featuredto "+featuredto.allowed);
console.log("########################## featuredto "+featuredto);
this.updateProfilActionAllowed(featuredto.id);

}


updateProfilActionAllowed(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.profilactionService.updateProfilActionAllowed(id).subscribe( data => {
 this.spinner.hide();
 //this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ updateProfilActionAllowed ",data); });
 console.log("################2");
}

}
