
// geo-chart-benin.component.ts
import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Annee} from "../../modeles/annee.modele";
import {AnneeService} from "../../services/annee.service";
import {Indicateur} from "../../modeles/indicateur.modele";
import {IndicateurService} from "../../services/indicateur.service";
import {ValeurIndicateur} from "../../modeles/valeur-indicateur.modele";
import {ValeurIndicateurService} from "../../services/valeur-indicateur.service";
declare var google: any;
import { NgForm, UntypedFormGroup, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
selector: 'app-accueil',
templateUrl: './accueil.component.html',
})
export class AccueilComponent implements AfterViewInit, OnInit {
totalPages: number = 0;
currentPage: number = 0;
pageSize = 10;
submitted=false;

indicateurs : Indicateur[];
indicateur: Indicateur;

valeurindicateurs : ValeurIndicateur[];
valeurindicateur: ValeurIndicateur;

annees : Annee[];
annee: Annee;
codePays = '';
selectedAnneeId?: number; // pour stocker l'id sélectionné
addForm = new UntypedFormGroup({
id: new UntypedFormControl(''),
    annee: new UntypedFormControl(''),
    indicateur: new UntypedFormControl('')
  });
constructor(
    private valeurindicateurService: ValeurIndicateurService,
    private indicateurService: IndicateurService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private anneeService: AnneeService) {
    }

  ngOnInit(): void {
     this.codePays = localStorage.getItem('codePays');//
     //this.annee = null;
     //this.indicateur = null;
     this.loadItems();
     //this.getAllIndicateurSysteme();
     //this.getValeurIndicateurSearch('indicateurId', 'periode', 'campagneagricoleId', 'paysId');
 // définir la première valeur automatiquement
  //this.addForm.get('annee')?.setValue(this.annees[0]);
     //this.getValeurIndicateurPeriodeSearch(this.indicateur.id, this.annee.id);

  }

  ngAfterViewInit() {
    /*google.charts.load('current', { packages: ['geochart'] });
    google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));*/
  }
/*
    const data = google.visualization.arrayToDataTable([
      ['Department', 'Value'],
      ['ALIBORI', 30],
      ['Atakora', 50],
      ['Atlantique', 70],
      ['Borgou', 45],
      ['Collines', 55],
      ['Donga', 40],
      ['Kouffo', 65],
      ['Littoral', 90],
      ['Mono', 60],
      ['OUÉMÉ', 80],
      ['Plateau', 35],
      ['Zou', 75],
    ]);
*/
  drawBeninByRegion() {

    const data = google.visualization.arrayToDataTable([
      ['Department', 'Value'],
 ...this.valeurindicateurs.map(r => [r.region.libelle, r.valeur])
    /*  ['ALIBORI', 30],
      ['Atakora', 50],
      ['Atlantique', 70],
      ['Borgou', 45],
      ['Collines', 55],
      ['Donga', 40],
      ['Kouffo', 65],
      ['Littoral', 90],
      ['Mono', 60],
      ['OUÉMÉ', 80],
      ['Plateau', 35],
      ['Zou', 75],*/
    ]);

    const options = {
      region: localStorage.getItem('codePays'),            // ISO Alpha-2 du Bénin BJ
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
    /*this.anneeService.getAnneePages(this.currentPage, this.pageSize).subscribe(data => {
    this.annees = data.content;
    this.totalPages = data.totalPages;
    this.annee = data.content[0];*/

    this.anneeService.getAnnees().subscribe(data => {
    this.annees = data;
    this.annee = data[0];

//
this.indicateurService.getIndicateursSysteme().subscribe( dataIndicateur => {
 this.indicateurs = dataIndicateur;
 this.indicateur = dataIndicateur[0];

//
 this.valeurindicateurService.getValeurIndicateurPeriodeSearch(this.indicateur.id, this.annee.libelle+"").subscribe( data => {
 this.valeurindicateurs = data;
 console.log("################ this.valeurindicateurs 2", this.valeurindicateurs);
 this.cdr.detectChanges(); // Forcer la détection des changements

 google.charts.load('current', { packages: ['geochart'] });
 google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));
 });

 this.cdr.detectChanges(); // Forcer la détection des changements
 });

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

  get lf() {
    return this.addForm.controls;
  }

 compareFn(a, b) {
  if(a==b)
     return true
  else
     return a && b && a.id == b.id;
  }

getAllIndicateur() {
 console.log("################1");
 this.indicateurService.getIndicateurs().subscribe( data => {
 this.indicateurs = data;
//this.cdr.detectChanges(); // Forcer la détection des changements
 });
}

getAllIndicateurSysteme() {
 console.log("################1");
 this.indicateurService.getIndicateursSysteme().subscribe( data => {
 this.indicateurs = data;
 this.indicateur = data[0];
 this.cdr.detectChanges(); // Forcer la détection des changements
 });
}


 getValeurIndicateurSearch(indicateurId: string, periode: string, campagneagricoleId: string, paysId: string) {
 console.log("################1");
 this.valeurindicateurService.getValeurIndicateurSearch(indicateurId, periode, campagneagricoleId, paysId).subscribe( data => {
 this.valeurindicateurs = data;
 console.log("################ this.valeurindicateurs 2", this.valeurindicateurs);
 this.cdr.detectChanges(); // Forcer la détection des changements

 google.charts.load('current', { packages: ['geochart'] });
 google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));
 });
}

getValeurIndicateurPeriodeSearch(indicateurId: string, periode: string) {
 console.log("################1");
 this.valeurindicateurService.getValeurIndicateurPeriodeSearch(indicateurId, periode).subscribe( data => {
 this.valeurindicateurs = data;
 console.log("################ this.valeurindicateurs 2", this.valeurindicateurs);
 this.cdr.detectChanges(); // Forcer la détection des changements

 google.charts.load('current', { packages: ['geochart'] });
 google.charts.setOnLoadCallback(this.drawBeninByRegion.bind(this));
 });
}

onChangeAnnee(annee: Annee) {
if(annee && this.indicateur) {
console.log("################ annee", annee.libelle);
this.getValeurIndicateurPeriodeSearch(this.indicateur.id, annee.libelle+"");
}
}

onChangeIndicateur(indicateur: Indicateur) {
if(this.annee && indicateur) {
console.log("################ indicateur", indicateur.id);
this.getValeurIndicateurPeriodeSearch(indicateur.id, this.annee.libelle+"");
}
}

}

