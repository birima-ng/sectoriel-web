import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Division} from 'app/components/modeles/division.modele';
import {DivisionService} from 'app/components/services/division.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddDivisionComponent } from './add/add-division.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';

declare var window: any;
// division-tree.component.ts
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';

@Component({
selector: 'app-division',
templateUrl: './division.component.html',
styleUrls: ['./division.component.scss'],
})
export class DivisionComponent implements OnInit {
selectedDivision: Division | null = null;
treeControl = new NestedTreeControl<Division>(node => node.children);
dataSource = new MatTreeNestedDataSource<Division>();
divisions: Division[] = [];
divisions1: Division[] = [];

constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private divisionService: DivisionService) { }

  ngOnInit(): void {
    this.getAllDivision();
    this.loadTree();

  }

  loadTree(): void {
    this.divisionService.getRootDivisions().subscribe(divisions => {
      this.dataSource.data = divisions;
this.divisions = divisions;
    });
  }

  hasChild(_: number, node: Division): boolean {
    return !!node.children && node.children.length > 0;
  }

 selectDivision(division: Division): void {
    this.selectedDivision = division;
  }

  openContent() {
        const modalRef = this.modalService.open(AddDivisionComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
       // this.getAllTrace();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


getAllDivision() {
 console.log("################1");
 this.divisionService.getDivisionsNomap().subscribe( data => {
 this.divisions1 = data;
 console.log("################-data ",data);
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

}

