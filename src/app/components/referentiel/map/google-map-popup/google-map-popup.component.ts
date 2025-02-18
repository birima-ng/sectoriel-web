import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare const google: any;

@Component({
selector: 'app-google-map-popup',
templateUrl: './google-map-popup.component.html',
styleUrls: ['./google-map-popup.component.scss']
})
export class GoogleMapPopupComponent implements OnInit {
map: any;
marker: any;
@Output() coordinates = new EventEmitter<{ lat: number, lng: number }>();

constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const mapOptions = {
      center: new google.maps.LatLng(14.743882185495897, -17.45312612872677), // Paris par défaut
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Initialiser la carte
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Initialiser le marqueur draggable
    this.marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.map,
      draggable: true
    });

    // Initialiser la barre de recherche et SearchBox
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    // Positionner la barre de recherche sur la carte
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Ajuster les résultats de la recherche selon la carte visible
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    // Lorsque l'utilisateur sélectionne un lieu
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Déplacer le marqueur sur le premier lieu trouvé
      const place = places[0];
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      this.marker.setPosition(place.geometry.location);
      this.map.setCenter(place.geometry.location);
    });
  }

  // Fermer la popup et retourner les coordonnées
  closePopup() {
    const position = this.marker.getPosition();
    this.coordinates.emit({ lat: position.lat(), lng: position.lng() });
    this.activeModal.close();
  }
}
