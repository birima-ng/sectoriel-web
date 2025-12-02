import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input, ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {Indicateur} from "app/components/modeles/indicateur.modele";
import {IndicateurService} from "app/components/services/indicateur.service";
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
declare var window: any;

@Component({
    selector: 'app-production-agricole',
    templateUrl: './production-agricole.component.html',
styleUrls: [
"./production-agricole.component.scss",
"../../../../../assets/sass/libs/datatables.scss",
],
encapsulation: ViewEncapsulation.None,
})

export class ProductionAgricoleComponent implements OnInit {
@ViewChild('tableRowDetails') tableRowDetails: any;
addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
indicateurs : Indicateur[];
totalPages: number = 0;
currentPage: number = 0;
pageSize = 10;
p=1;
public ColumnMode = ColumnMode;
    highlighted: boolean = false;
    constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private indicateurService: IndicateurService) {
    }

  ngOnInit(): void {
  // this.getAllIndicateur();
this.loadItems();
  }
    ngAfterViewChecked() {
    }


getAllIndicateur() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.indicateurService.getIndicateurs().subscribe( data => {
 this.spinner.hide();
 this.indicateurs = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {

    }


    formEdit(indicateur: Indicateur) {

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

    this.indicateurService.deleteIndicateur(id).subscribe( data => {
    this.toastr.success("Etat feux supprimé avec succès!", 'STOCK-PRIX');
    this.spinner.hide();
    this.getAllIndicateur();
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}

loadItems(): void {
  this.indicateurService.getIndicateurPages(this.currentPage, this.pageSize).subscribe(data => {
    this.indicateurs = data.content;
    this.totalPages = data.totalPages;

    //this.currentPage = data.number;
this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

goToPage(page: number): void {
if (page >= 0 && page < this.totalPages) {
  this.loadItems();
}
}

onPageChange(page: number) {
  this.currentPage = page;
  this.loadItems();
}

onPageSizeChange(size: number) {
  this.pageSize = size;
  this.currentPage = 0;
  this.loadItems();
}

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


}

