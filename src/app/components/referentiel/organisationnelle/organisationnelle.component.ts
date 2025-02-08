import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Organisationnelle} from 'app/components/modeles/organisationnelle.modele';
import {OrganisationnelleService} from 'app/components/services/organisationnelle.service';
import {DecimalPipe} from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { AddOrganisationnelleComponent } from './add/add-organisationnelle.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var window: any;
// organisationnelle-tree.component.ts
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';

@Component({
selector: 'app-organisationnelle',
templateUrl: './organisationnelle.component.html',
styleUrls: ['./organisationnelle.component.scss'],
})
export class OrganisationnelleComponent implements OnInit {
selectedOrganisationnelle: Organisationnelle | null = null;
treeControl = new NestedTreeControl<Organisationnelle>(node => node.children);
dataSource = new MatTreeNestedDataSource<Organisationnelle>();
organisationnelles: Organisationnelle[] = [];
organisationnelles1: Organisationnelle[] = [];

constructor(
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private organisationnelleService: OrganisationnelleService) { }

  ngOnInit(): void {
    this.getAllOrganisationnelle();
    this.loadTree();

  }

  loadTree(): void {
    this.organisationnelleService.getRootOrganisationnelles().subscribe(organisationnelles => {
      this.dataSource.data = organisationnelles;
this.organisationnelles = organisationnelles;
    });
  }

  hasChild(_: number, node: Organisationnelle): boolean {
    return !!node.children && node.children.length > 0;
  }

 selectOrganisationnelle(organisationnelle: Organisationnelle): void {
    this.selectedOrganisationnelle = organisationnelle;
  }

  openContent() {
        const modalRef = this.modalService.open(AddOrganisationnelleComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
       // this.getAllTrace();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }


getAllOrganisationnelle() {
 console.log("################1");
 this.organisationnelleService.getOrganisationnellesNomap().subscribe( data => {
 this.organisationnelles1 = data;
 console.log("################-data ",data);
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

    formEdit(organisationnelle: Organisationnelle) {
        const modalRef = this.modalService.open(AddOrganisationnelleComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllOrganisationnelle();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = organisationnelle;
    }

    formDelete(id: string) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.message = 'Voulez-vous supprimer cet élément ?';

    modalRef.result.then((result) => {
      if (result === 'Yes') { // suppression de l'element
         console.log("YES");
         this.onDelete(id);
      } else if (result === 'No') {
        console.log("NO");
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
    }

   onDelete(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.organisationnelleService.deleteOrganisationnelle(id).subscribe( data => {
console.log("############### ID",id);
    this.spinner.hide();
    this.getAllOrganisationnelle();
    this.toastr.success('Unité organisationnelle supprimée avec succès!', 'STOCK-PRIX');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}
}

