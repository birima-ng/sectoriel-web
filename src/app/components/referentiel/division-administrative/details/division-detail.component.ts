import { Component, Input } from '@angular/core';
import {DivisionAdministrative} from 'app/components/modeles/division-administrative.modele';
import {DivisionAdministrativeService} from 'app/components/services/division-administrative.service';

@Component({
selector: 'app-division-detail',
templateUrl: './division-detail.component.html',
styleUrls: ['./division-detail.component.scss'],
})
export class DivisionDetailComponent {
@Input() division: DivisionAdministrative;
}
