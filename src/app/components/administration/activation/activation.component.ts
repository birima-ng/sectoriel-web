import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.scss']
})

export class ActivationComponent {
    @ViewChild('f') lockScreenForm: NgForm;

    onSubmit() {
        this.lockScreenForm.reset();
    }
}
