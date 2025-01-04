import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "app/shared/auth/auth-guard.service";
import { ButtonsComponent } from "./bootstrap/buttons/buttons.component";
import { ListsComponent } from "./bootstrap/lists/lists.component";
import { AlertsComponent } from "./bootstrap/alerts/alerts.component";
import { SweetAlertsComponent } from "./extra/sweet-alerts/sweet-alerts.component";
import { ToastrComponent } from "./extra/toastr/toastr.component";
import { NouiSliderComponent } from "./extra/nouislider/nouislider.component";
import { BadgesComponent } from "./bootstrap/badges/badges.component";
import { DropdownsComponent } from "./bootstrap/dropdowns/dropdowns.component";
import { MediaObjectsComponent } from "./bootstrap/media-objects/media-objects.component";
import { PaginationComponent } from "./bootstrap/pagination/pagination.component";
import { ProgressBarsComponent } from "./bootstrap/progress/progress.component";
import { ModalsComponent } from "./bootstrap/modals/modals.component";
import { CollapseComponent } from "./bootstrap/collapse/collapse.component";
import { AccordionComponent } from './bootstrap/accordion/accordion.component';
import { CarouselComponent } from './bootstrap/carousel/carousel.component';
import { PopoverComponent } from './bootstrap/popover/popover.component';
import { RatingComponent } from './bootstrap/rating/rating.component';
import { NavsComponent } from './bootstrap/navs/navs.component';
import { TooltipComponent } from './bootstrap/tooltip/tooltip.component';
import { TypeaheadComponent } from './bootstrap/typeahead/typeahead.component';
import { NgButtonsComponent } from "./bootstrap/ng-buttons/ng-buttons.component";
import { UploadComponent } from './extra/upload/upload.component';
import { DragDropComponent } from './extra/drag-drop/drag-drop.component';
import { TourComponent } from './extra/tour/tour.component';
import { CropperComponent } from './extra/cropper/cropper.component';
import { AvatarComponent } from './extra/avatar/avatar.component';
import { SwiperComponent } from './extra/swiper/swiper.component';
import { JourSemaineComponent } from './referentiel/jour-semaine/jour-semaine.component';
import { BaacComponent } from 'app/components/referentiel/baac/baac.component';
import { AddBaacComponent } from 'app/components/referentiel/baac/add/add-baac.component';
import { TraceComponent } from 'app/components/referentiel/trace/trace.component';
import { TypeUniteFdsComponent } from 'app/components/referentiel/type-unite-fds/type-unite-fds.component';
import { UniteFdsComponent } from 'app/components/referentiel/unite-fds/unite-fds.component';
import { PaysComponent } from 'app/components/referentiel/pays/pays.component';
import { RegionComponent } from 'app/components/referentiel/region/region.component';
import { DepartementComponent } from 'app/components/referentiel/departement/departement.component';
import { CommuneComponent } from 'app/components/referentiel/commune/commune.component';
import { VillageComponent } from 'app/components/referentiel/village/village.component';
import { ZoneComponent } from 'app/components/referentiel/zone/zone.component';
import { TypeChargementComponent } from 'app/components/referentiel/type-chargement/type-chargement.component';
import { VolumeChargementComponent } from 'app/components/referentiel/volume-chargement/volume-chargement.component';
import { UserComponent } from 'app/components/administration/user/user.component';
import { ProfilComponent } from 'app/components/administration/profil/profil.component';
import { UniteOrganisationnelleComponent } from 'app/components/referentiel/unite-organisationnelle/unite-organisationnelle.component';
import { UserLogComponent } from 'app/components/administration/user-log/user-log.component';
import { DivisionAdministrativeComponent } from 'app/components/referentiel/division-administrative/division-administrative.component';

import { DivisionComponent } from 'app/components/referentiel/division/division.component';
import { TestComponent } from 'app/components/referentiel/test/test.component';
import { OrganisationnelleComponent } from 'app/components/referentiel/organisationnelle/organisationnelle.component';

import { ModuleComponent } from 'app/components/administration/module/module.component';
import { FeatureComponent } from 'app/components/administration/feature/feature.component';
import { ActionComponent } from 'app/components/administration/action/action.component';
import { ProfilConfigComponent } from 'app/components/administration/profil/profil-config/profil-config.component';
import { CategoriePermisComponent } from 'app/components/referentiel/categorie-permis/categorie-permis.component';
import {TrancheAgeComponent} from 'app/components/referentiel/tranche-age/tranche-age.component';
import {IntersectionComponent} from 'app/components/referentiel/intersection/intersection.component';
import {LumiereComponent} from "./referentiel/lumiere/lumiere.component";
import {ProfessionComponent} from "./referentiel/profession/profession.component";
import {AppartenanceVehiculeComponent} from "./referentiel/appartenance-vehicule/appartenance-vehicule.component";
import {ClassificationRouteComponent} from "./referentiel/classification-route/classification-route.component";
import {GraviteBlessureComponent} from "./referentiel/gravite-blessure/gravite-blessure.component";
import {GenreVehiculeComponent} from "./referentiel/genre-vehicule/genre-vehicule.component";
import {EtatFeuxComponent} from "./referentiel/etat-feux/etat-feux.component";
import {EtatChausseeComponent} from "./referentiel/etat-chaussee/etat-chaussee.component";
import {EtatGeneralComponent} from "./referentiel/etat-general/etat-general.component";
import {EtatPneusComponent} from "./referentiel/etat-pneus/etat-pneus.component";
import {ConditionAtmospheriqueComponent} from "./referentiel/condition-atmospherique/condition-atmospherique.component";
import { BaacDocumentComponent } from 'app/components/referentiel/baac/baac-files/baac-files.component';

import { ThematiqueComponent } from 'app/components/ged/thematique/thematique.component';
import { ZoneApplicationComponent } from 'app/components/ged/zone-application/zone-application.component';
import { BaacDetailsComponent } from 'app/components/referentiel/baac/baac-details/baac-details.component';
import { BaacACompleterComponent } from 'app/components/referentiel/baac/acompleter/baac-acompleter.component';
import { BaacAValiderComponent } from 'app/components/referentiel/baac/avalider/baac-avalider.component';
import { FonctionComponent } from "./referentiel/fonction/fonction.component";
import {ServiceDepartementComponent} from "./referentiel/service-departement/service-departement.component";
import {AccueilComponent} from "./referentiel/accueil/accueil.component";
import {NatureDocumentComponent} from "./referentiel/nature-document/nature-document.component";
import {EtatCourrierComponent} from "./referentiel/etat-courrier/etat-courrier.component";
import {DocumentComponent} from "./referentiel/document/document.component";
import {ContactComponent} from "./referentiel/contact/contact.component";
import {CourrierComponent} from "./referentiel/courrier/courrier.component";
import {ProduitComponent} from "./referentiel/produit/produit.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Buttons'
        }
      },

      {
        path: 'jour-semaine',
        component: JourSemaineComponent, canActivate: [AuthGuard],
        data: {
          title: 'Jour de la Semaine'
        }
      },

        {
        path: 'baac-document',
        component: BaacDocumentComponent, canActivate: [AuthGuard],
        data: {
        title: 'Baac document'
        }
        },

{
path: 'contact',
component: ContactComponent, canActivate: [AuthGuard],
data: {
title: 'Baac document'
}
},

{
path: 'produit',
component: ProduitComponent, canActivate: [AuthGuard],
data: {
title: 'Produit'
}
},
        {
        path: 'etat-courrier',
component: EtatCourrierComponent, canActivate: [AuthGuard],
data: {
title: 'Fonction'
}
},

{
path: 'nature-document',
component: NatureDocumentComponent, canActivate: [AuthGuard],
data: {
title: 'Fonction'
}
},

{
path: 'document',
component: DocumentComponent, canActivate: [AuthGuard],
data: {
title: 'Fonction'
}
},

{
path: 'fonction',
component: FonctionComponent, canActivate: [AuthGuard],
data: {
title: 'Fonction'
}
},

{
path: 'courrier',
component: CourrierComponent, canActivate: [AuthGuard],
data: {
title: 'Courrier'
}
},

{
path: 'accueil',
component: AccueilComponent, canActivate: [AuthGuard],
data: {
title: 'Accueil'
}
},

{
path: 'service-departement',
component: ServiceDepartementComponent, canActivate: [AuthGuard],
data: {
title: 'service-departement'
}
},

{
path: 'baac-valides',
component: BaacComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'baac-details',
component: BaacDetailsComponent, canActivate: [AuthGuard],
data: {
title: 'Baac détails'
}
},

{
path: 'baac-avalider',
component: BaacACompleterComponent, canActivate: [AuthGuard],
data: {
title: 'Baac détails'
}
},

{
path: 'baac-acompleter',
component: BaacACompleterComponent, canActivate: [AuthGuard],
data: {
title: 'Baac détails'
}
},

{
path: 'thematique',
component: ThematiqueComponent, canActivate: [AuthGuard],
data: {
title: 'Thematique'
}
},

{
path: 'zone-application',
component: ZoneApplicationComponent, canActivate: [AuthGuard],
data: {
title: 'Thematique'
}
},

{
path: 'profil-config',
component: ProfilConfigComponent, canActivate: [AuthGuard],
data: {
title: 'Module'
}
},

{
path: 'module',
component: ModuleComponent, canActivate: [AuthGuard],
data: {
title: 'Module'
}
},

{
path: 'feature',
component: FeatureComponent, canActivate: [AuthGuard],
data: {
title: 'Feature'
}
},

{
path: 'action',
component: ActionComponent, canActivate: [AuthGuard],
data: {
title: 'Action'
}
},

{
path: 'departement',
component: DepartementComponent, canActivate: [AuthGuard],
data: {
title: 'Département'
}
},

{
path: 'region',
component: RegionComponent, canActivate: [AuthGuard],
data: {
title: 'Region'
}
},

{
path: 'commune',
component: CommuneComponent, canActivate: [AuthGuard],
data: {
title: 'Region'
}
},

{
path: 'localite',
component: VillageComponent, canActivate: [AuthGuard],
data: {
title: 'Localité'
}
},

{
path: 'type-unite-fds',
component: TypeUniteFdsComponent, canActivate: [AuthGuard],
data: {
title: 'Type unité fds'
}
},

{
path: 'unite-fds',
component: UniteFdsComponent, canActivate: [AuthGuard],
data: {
title: 'Type unité fds'
}
},

{
path: 'categorie-permis',
component: CategoriePermisComponent, canActivate: [AuthGuard],
data: {
title: 'Type unité fds'
}
},


{
path: 'test',
component: TestComponent, canActivate: [AuthGuard],
data: {
title: 'Type unité fds'
}
},

{
path: 'organisationnelle',
component: OrganisationnelleComponent, canActivate: [AuthGuard],
data: {
title: 'Type unité fds'
}
},

{
path: 'baac/add',
component: AddBaacComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},
{
path: 'trace',
component: TraceComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'zone',
component: ZoneComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'type-chargement',
component: TypeChargementComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'profil',
component: ProfilComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'division',
component: DivisionComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'volume-chargement',
component: VolumeChargementComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'unite-organisationnelle',
component: UniteOrganisationnelleComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'division-administrative',
component: DivisionAdministrativeComponent, canActivate: [AuthGuard],
data: {
title: 'Baac'
}
},

{
path: 'pays',
component: PaysComponent, canActivate: [AuthGuard],
data: {
title: 'Pays'
}
},

{
path: 'user',
component: UserComponent, canActivate: [AuthGuard],
data: {
title: 'Pays'
}
},

{
path: 'audit',
component: UserLogComponent, canActivate: [AuthGuard],
data: {
title: 'Pays'
}
},
      {
      path: 'lists',
component: ListsComponent,
data: {
title: 'Lists'
}
},
      {
        path: 'alerts',
        component: AlertsComponent,
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'sweetalerts',
        component: SweetAlertsComponent,
        data: {
          title: 'Sweet Alerts'
        }
      },
      {
        path: 'toastr',
        component: ToastrComponent,
        data: {
          title: 'Toastr'
        }
      },
      {
        path: 'nouislider',
        component: NouiSliderComponent,
        data: {
          title: 'NoUI Slider'
        }
      },

      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload'
        }
      },
      {
        path: 'dragndrop',
        component: DragDropComponent,
        data: {
          title: 'Drag and Drop'
        }
      },
      {
        path: 'tour',
        component: TourComponent,
        data: {
          title: 'Tour'
        }
      },
      {
        path: 'cropper',
        component: CropperComponent,
        data: {
          title: 'Cropper'
        }
      },
      {
        path: 'badges',
        component: BadgesComponent,
        data: {
          title: 'Badges'
        }
      },
      {
        path: 'dropdowns',
        component: DropdownsComponent,
        data: {
          title: 'Dropdowns'
        }
      },
      {
        path: 'media',
        component: MediaObjectsComponent,
        data: {
          title: 'Media Objects'
        }
      },
      {
        path: 'pagination',
        component: PaginationComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'progress',
        component: ProgressBarsComponent,
        data: {
          title: 'Progress Bars'
        }
      },
      {
        path: 'models',
        component: ModalsComponent,
        data: {
          title: 'Models'
        }
      },
      {
        path: 'collapse',
        component: CollapseComponent,
        data: {
          title: 'Collapse'
        }
      },
      {
        path: 'accordion',
        component: AccordionComponent,
        data: {
          title: 'Accordion'
        }
      },
      {
        path: 'carousel',
        component: CarouselComponent,
        data: {
          title: 'Carousel'
        }
      },
      {
        path: 'popover',
        component: PopoverComponent,
        data: {
          title: 'Popovers'
        }
      },
      {
        path: 'rating',
        component: RatingComponent,
        data: {
          title: 'Rating'
        }
      },
      {
        path: 'navs',
        component: NavsComponent,
        data: {
          title: 'Navs'
        }
      },
      {
        path: 'tooltip',
        component: TooltipComponent,
        data: {
          title: 'Tooltips'
        }
      },
      {
        path: 'typeahead',
        component: TypeaheadComponent,
        data: {
          title: 'Typeahead'
        }
      },
      {
        path: 'ng-buttons',
        component: NgButtonsComponent,
        data: {
          title: 'Ngb-Bootstrap'
        }
      },
      {
        path: 'avatar',
        component: AvatarComponent,
        data: {
          title: 'Avatar'
        }
      },
      {
        path: 'swiper',
        component: SwiperComponent,
        data: {
          title: 'Swiper'
        }
      },
      {
        path: 'tranche-age',
        component: TrancheAgeComponent, canActivate: [AuthGuard],
        data: {
          title: 'Tranche d\'âge'
        }
      },
      {
        path: 'intersection',
        component: IntersectionComponent, canActivate: [AuthGuard],
        data: {
          title: 'Intersection'
        }
      },
      {
        path: 'lumiere',
        component: LumiereComponent, canActivate: [AuthGuard],
        data: {
          title: 'Lumière'
        }
      },
      {
        path: 'profession',
        component: ProfessionComponent, canActivate: [AuthGuard],
        data: {
          title: 'Profession'
        }
      },
      {
        path: 'appartenance-vehicule',
        component: AppartenanceVehiculeComponent, canActivate: [AuthGuard],
        data: {
          title: 'Appartenance de véhicule'
        }
      },
      {
        path: 'classification-route',
        component: ClassificationRouteComponent, canActivate: [AuthGuard],
        data: {
          title: 'Classififcation des routes'
        }
      },
      {
        path: 'gravite-blessure',
        component: GraviteBlessureComponent, canActivate: [AuthGuard],
        data: {
          title: 'Gravité des bléssures'
        }
      },
      {
        path: 'genre-vehicule',
        component: GenreVehiculeComponent, canActivate: [AuthGuard],
        data: {
          title: 'Genre de véhicules'
        }
      },
      {
        path: 'etat-feux',
        component: EtatFeuxComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat feux'
        }
      },
      {
        path: 'etat-chaussee',
        component: EtatChausseeComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat Chaussee'
        }
      },
      {
        path: 'etat-general',
        component: EtatGeneralComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat général'
        }
      },
      {
        path: 'etat-pneus',
        component: EtatPneusComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat Pneus'
        }
      },{
        path: 'etat-pneus',
        component: EtatPneusComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat Pneus'
        }
      },
      {
        path: 'condition-atmospherique',
        component: ConditionAtmospheriqueComponent, canActivate: [AuthGuard],
        data: {
          title: 'Etat Pneus'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIComponentsRoutingModule { }
