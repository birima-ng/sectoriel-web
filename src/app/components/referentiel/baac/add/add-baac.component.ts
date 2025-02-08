import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {Baac} from 'app/components/modeles/baac.modele';
import {BaacService} from 'app/components/services/baac.service';

@Component({
  selector: 'app-add-baac',
  templateUrl: './add-baac.component.html',
  styleUrls: ['./add-baac.component.scss'],
})
export class AddBaacComponent implements OnInit, AfterViewInit {
submitted=false;
personalForm = new UntypedFormGroup({
id: new UntypedFormControl(''),
    numerobaac: new UntypedFormControl('', [Validators.required]),
    reference: new UntypedFormControl('', [Validators.required]),
    dateaccident: new UntypedFormControl('', [Validators.required]),
    heureaccident: new UntypedFormControl('', [Validators.required])
  });

  constructor(private ref: ChangeDetectorRef,
   private baacService: BaacService,
    private spinner: NgxSpinnerService,) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

step1(){
this.submitted=true;
this.submitted=true;
console.log("################################ this.personalForm.value ", this.personalForm.value);
    if (this.personalForm.invalid) {
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

        this.add(); //add Baac

}

  get lf() {
    return this.personalForm.controls;
  }

add(){ //ADD STOCK-PRIX

    this.baacService.createBaac(this.personalForm.value).subscribe(
      data => {
console.log("################################ Data ", data);
 this.spinner.hide();

      },
      error => {
        this.spinner.hide();
        console.log('error: '+error)

      }

);

}
}
