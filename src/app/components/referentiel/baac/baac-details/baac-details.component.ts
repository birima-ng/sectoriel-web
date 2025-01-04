import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Baac} from 'app/components/modeles/baac.modele';
import {BaacService} from 'app/components/services/baac.service';
import {Pieton} from 'app/components/modeles/pieton.modele';
import {PietonService} from 'app/components/services/pieton.service';
import {VehiculeImplique} from 'app/components/modeles/vehicule-implique.modele';
import {VehiculeImpliqueService} from 'app/components/services/vehicule-implique.service';
import {PassagerConducteurDTO} from 'app/components/modeles/passager-conducteur-dto.modele';
import {Document} from 'app/components/modeles/document.modele';
import {DocumentService} from 'app/components/services/document.service';
import {Historique} from 'app/components/modeles/historique.modele';
import {HistoriqueService} from 'app/components/services/historique.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-baac-details',
  templateUrl: './baac-details.component.html',
  styleUrls: ['./baac-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaacDetailsComponent implements OnInit {
baac: Baac;
vehiculeimpliques: VehiculeImplique[];
baacvehicules: PassagerConducteurDTO[];
pietons: Pieton[];
documents: Document[];
numerobaac = '';
joursemaine = '';
region = '';
departement = '';
commune = '';
reference = '';
localite = '';
historiques: Historique[];
historique: Historique;
  selectedLanguages = ["English"];
  languages = [
    { value: "English", name: 'English' },
    { value: "Spanish", name: 'Spanish' },
    { value: "French", name: 'French' },
    { value: "Russian", name: 'Russian' },
    { value: "German", name: 'German' },
    { value: "Hindi", name: 'Hindi' },
    { value: "Arabic", name: 'Arabic' },
    { value: "Sanskrit", name: 'Sanskrit' },
  ];

  selectedMusic = ["Jazz", "Hip Hop"];
  music = [
    { value: "Rock", name: 'Rock' },
    { value: "Jazz", name: 'Jazz' },
    { value: "Disco", name: 'Disco' },
    { value: "Pop", name: 'Pop' },
    { value: "Techno", name: 'Techno' },
    { value: "Folk", name: 'Folk' },
    { value: "Hip Hop", name: 'Hip Hop' },
  ];

  selectedMovies = ["The Dark Knight", "Perl Harbour"];
  movies = [
    { value: "Avatar", name: 'Avatar' },
    { value: "The Dark Knight", name: 'The Dark Knight' },
    { value: "Harry Potter", name: 'Harry Potter' },
    { value: "Iron Man", name: 'Iron Man' },
    { value: "Spider Man", name: 'Spider Man' },
    { value: "Perl Harbour", name: 'Perl Harbour' },
    { value: "Airplane!", name: 'Airplane!' },
  ];
baacId = '';
lat: number = 51.678418;
lng: number = 7.809007;
  constructor(
    private historiqueService: HistoriqueService,
    private pietonService: PietonService,
    private vehiculeimpliqueService: VehiculeImpliqueService,
    private cdr: ChangeDetectorRef,
    private baacService: BaacService,
    private documentService: DocumentService,
    private actRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.actRoute.queryParams.subscribe(params => {
        this.baacId = params['vwp'];

        this.baacService.getBaacById(this.baacId ).subscribe( data => {
        console.log("############### data BAAC ",data);
        this.baac = data;
        this.numerobaac = data.numerobaac;
        this.joursemaine = data.joursemaine.libelle;
        this.region = data.village.commune.departement.region.nom;
        this.departement = data.village.commune.departement.nom;
        this.commune = data.village.commune.nom;
        this.localite = data.village.nom;
        this.lat = data.latitude;
        this.lng = data.longitude;
        if(data.reference){
            this.reference = data.reference;
        }
        this.getBaacVehiculeImpliqueDtos(this.baacId);
        this.cdr.detectChanges(); // Forcer la détection des changements
        this.getVehiculeImpliqueBaacs(this.baacId);
        this.getPietonBaacs(this.baacId);
        this.getDocumentByBaacId(this.baacId);
       this.getHistoriqueBaacs(this.baacId);
      },
      error => {
    console.log("error avant !!!");
      });
    });
  }


getVehiculeImpliqueBaacs(idbaac: string) {
 console.log("################1birima");
 this.vehiculeimpliqueService.getVehiculeImpliqueBaacs(idbaac).subscribe( data => {

 this.vehiculeimpliques = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getVehiculeImpliqueBaacs ",data); });
 console.log("################2");
}

getBaacVehiculeImpliqueDtos(idbaac: string) {
 console.log("################1");
 this.baacService.getBaacVehiculeImpliqueDtos(idbaac).subscribe( data => {

 this.baacvehicules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getBaacVehiculeImpliqueDtos ",data); });
 console.log("################2");
}

getPietonBaacs(idbaac: string) {
 console.log("################1");
 this.pietonService.getPietonBaacs(idbaac).subscribe( data => {

 this.pietons = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getPietonBaacs ",data); });
 console.log("################2");
}

getDocumentByBaacId(idbaac: string) {
 console.log("################1");
 this.documentService.getDocumentByBaacId(idbaac).subscribe( data => {

 this.documents = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getDocumentByBaacId ",data); });
 console.log("################2");
}

getHistoriqueBaacs(idbaac: string) {
 console.log("################1");
 this.historiqueService.getHistoriqueBaacs(idbaac).subscribe( data => {

 this.historiques = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ getDocumentByBaacId ",data); });
 console.log("################2");
}

}
