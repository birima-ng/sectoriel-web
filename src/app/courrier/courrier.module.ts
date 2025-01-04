import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';

import { CourrierRoutingModule } from "./courrier-routing.module";
import { PipeModule } from 'app/shared/pipes/pipe.module';

import { CourrierComponent } from "./courrier.component";


@NgModule({
    imports: [
        CommonModule,
        CourrierRoutingModule,
        NgbModule,
        QuillModule.forRoot(),
        FormsModule,
        PerfectScrollbarModule,
        PipeModule
    ],
    declarations: [
        CourrierComponent
    ]
})
export class CourrierModule { }
