
// geo-chart-benin.component.ts
import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Annee} from "../../modeles/annee.modele";
import {AnneeService} from "../../services/annee.service";
declare var google: any;

@Component({
selector: 'app-accueil',
templateUrl: './accueil.component.html',
})
export class AccueilComponent implements AfterViewInit, OnInit {
annees: Annee[] = [];
totalPages: number = 0;
currentPage: number = 0;
pageSize = 10;

selectedAnneeId?: number; // pour stocker l'id sélectionné

constructor(
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private anneeService: AnneeService) {
    }

  ngOnInit(): void {
this.loadItems();
  }

ngAfterViewInit() {
    google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));
  }

  drawBeninByRegion() {
    const data = google.visualization.arrayToDataTable([
      ['Department', 'Value'],
      ['Alibori', 30],
      ['Atakora', 50],
      ['Atlantique', 70],
      ['Borgou', 45],
      ['Collines', 55],
      ['Donga', 40],
      ['Kouffo', 65],
      ['Littoral', 90],
      ['Mono', 60],
      ['Ouémé', 80],
      ['Plateau', 35],
      ['Zou', 75],
    ]);

    const options = {
      region: 'BJ',            // ISO Alpha-2 du Bénin
      resolution: 'provinces', // Provinces (départements)
      backgroundColor: '#f9f9f9',
      datalessRegionColor: '#f0f0f0',
      legend: { textStyle: { color: '#333', fontSize: 14 } },

      // 🎨 Dégradé de couleurs selon les valeurs
      colorAxis: {
        colors: ['#e0f7fa', '#80deea', '#26c6da', '#00838f']
        // clair -> foncé en fonction des valeurs min -> max
      }
    };

    const chart = new google.visualization.GeoChart(
      document.getElementById('geochart_benin')
    );

    chart.draw(data, options);
  }

loadItems(): void {
  this.anneeService.getAnneePages(this.currentPage, this.pageSize).subscribe(data => {
    this.annees = data.content;
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

onAnneeChange() {
    console.log("Année sélectionnée ID:", this.selectedAnneeId);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadItems();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadItems();
    }
  }

}

