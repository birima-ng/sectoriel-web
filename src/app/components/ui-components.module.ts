import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UIComponentsRoutingModule } from "./ui-components-routing.module";
import { NouisliderModule } from 'ng2-nouislider';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

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
import { ModalsComponent, NgbdModalContent } from "./bootstrap/modals/modals.component";
import { CollapseComponent } from "./bootstrap/collapse/collapse.component";
import { AccordionComponent } from './bootstrap/accordion/accordion.component';
import { CarouselComponent } from './bootstrap/carousel/carousel.component';
import { PopoverComponent } from './bootstrap/popover/popover.component';
import { RatingComponent } from './bootstrap/rating/rating.component';
import { NavsComponent } from './bootstrap/navs/navs.component';
import { TooltipComponent } from './bootstrap/tooltip/tooltip.component';
import { TypeaheadComponent } from './bootstrap/typeahead/typeahead.component';
import { NgButtonsComponent } from './bootstrap/ng-buttons/ng-buttons.component';
import { UploadComponent } from './extra/upload/upload.component';
import { DragDropComponent } from './extra/drag-drop/drag-drop.component';
import { TourComponent } from './extra/tour/tour.component';
import { CropperComponent } from './extra/cropper/cropper.component';
import { AvatarComponent } from './extra/avatar/avatar.component';
import { JourSemaineComponent } from 'app/components/referentiel/jour-semaine/jour-semaine.component';
import { AddJourSemaineComponent } from 'app/components/referentiel/jour-semaine/add/add-jour-semaine.component';

import { BaacComponent } from 'app/components/referentiel/baac/baac.component';
import { AddBaacComponent } from 'app/components/referentiel/baac/add/add-baac.component';

import { TraceComponent } from 'app/components/referentiel/trace/trace.component';
import { AddTraceComponent } from 'app/components/referentiel/trace/add/add-trace.component';

import { TypeUniteFdsComponent } from 'app/components/referentiel/type-unite-fds/type-unite-fds.component';
import { AddTypeUniteFdsComponent } from 'app/components/referentiel/type-unite-fds/add/add-type-unite-fds.component';

import { UniteFdsComponent } from 'app/components/referentiel/unite-fds/unite-fds.component';
import { AddUniteFdsComponent } from 'app/components/referentiel/unite-fds/add/add-unite-fds.component';

import { PaysComponent } from 'app/components/referentiel/pays/pays.component';
import { AddPaysComponent } from 'app/components/referentiel/pays/add/add-pays.component';

import { RegionComponent } from 'app/components/referentiel/region/region.component';
import { AddRegionComponent } from 'app/components/referentiel/region/add/add-region.component';

import { DepartementComponent } from 'app/components/referentiel/departement/departement.component';
import { AddDepartementComponent } from 'app/components/referentiel/departement/add/add-departement.component';

import { CommuneComponent } from 'app/components/referentiel/commune/commune.component';
import { AddCommuneComponent } from 'app/components/referentiel/commune/add/add-commune.component';

import { VillageComponent } from 'app/components/referentiel/village/village.component';
import { AddVillageComponent } from 'app/components/referentiel/village/add/add-village.component';

import { ZoneComponent } from 'app/components/referentiel/zone/zone.component';
import { AddZoneComponent } from 'app/components/referentiel/zone/add/add-zone.component';

import { TypeChargementComponent } from 'app/components/referentiel/type-chargement/type-chargement.component';
import { AddTypeChargementComponent } from 'app/components/referentiel/type-chargement/add/add-type-chargement.component';

import { VolumeChargementComponent } from 'app/components/referentiel/volume-chargement/volume-chargement.component';
import { AddVolumeChargementComponent } from 'app/components/referentiel/volume-chargement/add/add-volume-chargement.component';

import { ProfilComponent } from 'app/components/administration/profil/profil.component';
import { AddProfilComponent } from 'app/components/administration/profil/add/add-profil.component';
import { ProfilConfigComponent } from 'app/components/administration/profil/profil-config/profil-config.component';

import { ModuleComponent } from 'app/components/administration/module/module.component';
import { AddModuleComponent } from 'app/components/administration/module/add/add-module.component';

import { FeatureComponent } from 'app/components/administration/feature/feature.component';
import { AddFeatureComponent } from 'app/components/administration/feature/add/add-feature.component';

import { ActionComponent } from 'app/components/administration/action/action.component';
import { AddActionComponent } from 'app/components/administration/action/add/add-action.component';

import { UniteOrganisationnelleComponent } from 'app/components/referentiel/unite-organisationnelle/unite-organisationnelle.component';
import { AddUniteOrganisationnelleComponent } from 'app/components/referentiel/unite-organisationnelle/add/add-unite-organisationnelle.component';

import { UserComponent } from 'app/components/administration/user/user.component';
import { AddUserComponent } from 'app/components/administration/user/add/add-user.component';

import { DivisionComponent } from 'app/components/referentiel/division/division.component';
import { AddDivisionComponent } from 'app/components/referentiel/division/add/add-division.component';

import { DivisionAdministrativeComponent } from 'app/components/referentiel/division-administrative/division-administrative.component';
import { AddDivisionAdministrativeComponent } from 'app/components/referentiel/division-administrative/add/add-division-administrative.component';
import { DivisionDetailComponent } from 'app/components/referentiel/division-administrative/details/division-detail.component';

import { UserLogComponent } from 'app/components/administration/user-log/user-log.component';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { SwiperComponent } from './extra/swiper/swiper.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartistModule } from "ng-chartist";
import { NgSelectModule } from "@ng-select/ng-select";
import { PipeModule } from "app/shared/pipes/pipe.module";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TestComponent } from 'app/components/referentiel/test/test.component';
import { OrganisationnelleComponent } from 'app/components/referentiel/organisationnelle/organisationnelle.component';
import { AddOrganisationnelleComponent } from 'app/components/referentiel/organisationnelle/add/add-organisationnelle.component';

import { CategoriePermisComponent } from 'app/components/referentiel/categorie-permis/categorie-permis.component';
import { AddCategoriePermisComponent } from 'app/components/referentiel/categorie-permis/add/add-categorie-permis.component';

import {AddTrancheAgeComponent} from "./referentiel/tranche-age/add/add-tranche-age.component";
import {TrancheAgeComponent} from "./referentiel/tranche-age/tranche-age.component";


import {IntersectionComponent} from "./referentiel/intersection/intersection.component";
import {AddIntersectionComponent} from "./referentiel/intersection/add/add-intersection.component";
import {LumiereComponent} from "./referentiel/lumiere/lumiere.component";
import {AddLumiereComponent} from "./referentiel/lumiere/add/add-lumiere.component";
import {ProfessionComponent} from "./referentiel/profession/profession.component";
import {AddProfessionComponent} from "./referentiel/profession/add/add-profession.component";
import {AppartenanceVehiculeComponent} from "./referentiel/appartenance-vehicule/appartenance-vehicule.component";
import {
  AddAppartenanceVehiculeComponent
} from "./referentiel/appartenance-vehicule/add/add-appartenance-vehicule.component";
import {ClassificationRoute} from "./modeles/classification-route.modele";
import {ClassificationRouteComponent} from "./referentiel/classification-route/classification-route.component";
import {
  AddClassificationRouteComponent
} from "./referentiel/classification-route/add/add-classification-route.component";
import {GraviteBlessureComponent} from "./referentiel/gravite-blessure/gravite-blessure.component";
import {AddGraviteBlessureComponent} from "./referentiel/gravite-blessure/add/add-gravite-blessure.component";
import {GenreVehiculeComponent} from "./referentiel/genre-vehicule/genre-vehicule.component";
import {AddGenreVehiculeComponent} from "./referentiel/genre-vehicule/add/add-genre-vehicule.component";
import {EtatFeuxComponent} from "./referentiel/etat-feux/etat-feux.component";
import {AddEtatFeuxComponent} from "./referentiel/etat-feux/add/add-etat-feux.component";
import {EtatChausseeComponent} from "./referentiel/etat-chaussee/etat-chaussee.component";
import {AddEtatChausseeComponent} from "./referentiel/etat-chaussee/add/add-etat-chaussee.component";
import {EtatGeneralComponent} from "./referentiel/etat-general/etat-general.component";
import {AddEtatGeneralComponent} from "./referentiel/etat-general/add/add-etat-general.component";
import {EtatPneusComponent} from "./referentiel/etat-pneus/etat-pneus.component";
import {AddEtatPneusComponent} from "./referentiel/etat-pneus/add/add-etat-pneus.component";
import {
  AddConditionAtmospheriqueComponent
} from "./referentiel/condition-atmospherique/add/add-condition-atmospherique.component";
import {ConditionAtmospheriqueComponent} from "./referentiel/condition-atmospherique/condition-atmospherique.component";
import { BaacDocumentComponent } from 'app/components/referentiel/baac/baac-files/baac-files.component';
import { ThematiqueComponent } from 'app/components/ged/thematique/thematique.component';
import { AddThematiqueComponent } from 'app/components/ged/thematique/add/add-thematique.component';

import { ZoneApplicationComponent } from 'app/components/ged/zone-application/zone-application.component';
import { AddZoneApplicationComponent } from 'app/components/ged/zone-application/add/add-zone-application.component';
import { BaacDetailsComponent } from 'app/components/referentiel/baac/baac-details/baac-details.component';
import { ListActionsComponent } from 'app/components/referentiel/list-actions/list-actions.component';

import { BaacACompleterComponent } from 'app/components/referentiel/baac/acompleter/baac-acompleter.component';
import { BaacAValiderComponent } from 'app/components/referentiel/baac/avalider/baac-avalider.component';

import { FieldsetModule } from "primeng/fieldset";

import { AgmCoreModule } from '@agm/core';

import {FonctionComponent} from "./referentiel/fonction/fonction.component";
import {AddFonctionComponent} from "./referentiel/fonction/add/add-fonction.component";

import {ServiceDepartementComponent} from "./referentiel/service-departement/service-departement.component";
import {AddServiceDepartementComponent} from "./referentiel/service-departement/add/add-service-departement.component";

import {NatureDocumentComponent} from "./referentiel/nature-document/nature-document.component";
import {AddNatureDocumentComponent} from "./referentiel/nature-document/add/add-nature-document.component";

import {AccueilComponent} from "./referentiel/accueil/accueil.component";

import {EtatCourrierComponent} from "./referentiel/etat-courrier/etat-courrier.component";
import {AddEtatCourrierComponent} from "./referentiel/etat-courrier/add/add-etat-courrier.component";
import {DocumentComponent} from "./referentiel/document/document.component";
import {AddDocumentComponent} from "./referentiel/document/add/add-document.component";

import {ContactComponent} from "./referentiel/contact/contact.component";
import {AddContactComponent} from "./referentiel/contact/add/add-contact.component";

import {CourrierComponent} from "./referentiel/courrier/courrier.component";
import {AddCourrierComponent} from "./referentiel/courrier/add/add-courrier.component";
import {ShowCourrierComponent} from "./referentiel/courrier/show/show-courrier.component";
import { QuillModule } from 'ngx-quill'

import {ProduitComponent} from "./referentiel/produit/produit.component";
import {AddProduitComponent} from "./referentiel/produit/add/add-produit.component";
import { EmailEditorModule } from 'angular-email-editor';

import {SecteurComponent} from "./referentiel/secteur/secteur.component";
import {AddSecteurComponent} from "./referentiel/secteur/add/add-secteur.component";


import {SecteurActiviteComponent} from "./referentiel/secteur-activite/secteur-activite.component";
import {AddSecteurActiviteComponent} from "./referentiel/secteur-activite/add/add-secteur-activite.component";


import {StadeCommerceComponent} from "./referentiel/stade-commerce/stade-commerce.component";
import {AddStadeCommerceComponent} from "./referentiel/stade-commerce/add/add-stade-commerce.component";

import {EntrepriseComponent} from "./referentiel/entreprise/entreprise.component";
import {AddEntrepriseComponent} from "./referentiel/entreprise/add/add-entreprise.component";

import {ConfigSecteurActiviteComponent} from "./referentiel/config-secteur-activite/config-secteur-activite.component";
import {DragDropConfigComponent} from "./referentiel/config-secteur-activite/drag-drop/drag-drop.component";

import {CategorieComponent} from "./referentiel/categorie/categorie.component";
import {AddCategorieComponent} from "./referentiel/categorie/add/add-categorie.component";

import {TypeProduitComponent} from "./referentiel/type-produit/type-produit.component";
import {AddTypeProduitComponent} from "./referentiel/type-produit/add/add-type-produit.component";

import {UniteComponent} from "./referentiel/unite/unite.component";
import {AddUniteComponent} from "./referentiel/unite/add/add-unite.component";

import {EnteteConfigPrixComponent} from "./referentiel/entete-config-prix/entete-config-prix.component";
import {AddEnteteConfigPrixComponent} from "./referentiel/entete-config-prix/add/add-entete-config-prix.component";
import {AddEntrepriseNewComponent} from "./referentiel/entete-config-prix/add-entreprise/add-entreprise.component";

import {ConfigPrixComponent} from "./referentiel/config-prix/config-prix.component";
import { GoogleMapPopupComponent } from 'app/components/referentiel/map/google-map-popup/google-map-popup.component';
import {ConfigUniteComponent} from "./referentiel/config-unite/config-unite.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
    imports: [
    EmailEditorModule,
QuillModule.forRoot(),
MatSidenavModule,
MatToolbarModule,
AgmCoreModule,
FieldsetModule,
TreeViewModule,
MatIconModule,
MatButtonModule,
        MatTreeModule,
        NgxDatatableModule,
        ArchwizardModule,
        CommonModule,
        UIComponentsRoutingModule,
        NouisliderModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DragulaModule.forRoot(),
        MatchHeightModule,
        ImageCropperModule,
        HttpClientModule,
        SwiperModule,
        NgxSpinnerModule,
        ChartistModule,
        NgSelectModule,
        PipeModule
    ],
    declarations: [
ConfigUniteComponent,
AddEntrepriseNewComponent,
GoogleMapPopupComponent,
ConfigPrixComponent,
EnteteConfigPrixComponent,
AddEnteteConfigPrixComponent,
AddUniteComponent,
UniteComponent,
TypeProduitComponent,
AddTypeProduitComponent,
CategorieComponent,
AddCategorieComponent,
DragDropConfigComponent,
ConfigSecteurActiviteComponent,
EntrepriseComponent,
AddEntrepriseComponent,
StadeCommerceComponent,
AddStadeCommerceComponent,
AddSecteurActiviteComponent,
SecteurActiviteComponent,
AddProduitComponent,
ProduitComponent,
ShowCourrierComponent,
AddCourrierComponent,
CourrierComponent,
AddContactComponent,
ContactComponent,
AddDocumentComponent,
DocumentComponent,
EtatCourrierComponent,
AddEtatCourrierComponent,
NatureDocumentComponent,
AddNatureDocumentComponent,
AccueilComponent,
ServiceDepartementComponent,
AddServiceDepartementComponent,
FonctionComponent,
AddFonctionComponent,
BaacACompleterComponent,
BaacAValiderComponent,
ListActionsComponent,
BaacDetailsComponent,
AddZoneApplicationComponent,
ZoneApplicationComponent,
AddThematiqueComponent,
ThematiqueComponent,
BaacDocumentComponent,
AddCategoriePermisComponent,
CategoriePermisComponent,
ProfilConfigComponent,
AddActionComponent,
ActionComponent,
AddFeatureComponent,
FeatureComponent,
AddModuleComponent,
ModuleComponent,
OrganisationnelleComponent,
AddOrganisationnelleComponent,
TestComponent,
AddDivisionComponent,
DivisionComponent,
DivisionDetailComponent,
AddDivisionAdministrativeComponent,
DivisionAdministrativeComponent,
UserLogComponent,
UniteOrganisationnelleComponent,
AddUniteOrganisationnelleComponent,
        ProfilComponent,
        AddProfilComponent,
        UserComponent,
        AddUserComponent,
        TypeChargementComponent,
        AddTypeChargementComponent,
        VolumeChargementComponent,
        AddVolumeChargementComponent,
        ZoneComponent,
        AddZoneComponent,
        VillageComponent,
        AddVillageComponent,
        CommuneComponent,
        AddCommuneComponent,
        DepartementComponent,
        AddDepartementComponent,
        RegionComponent,
        AddRegionComponent,
        PaysComponent,
        AddPaysComponent,
        UniteFdsComponent,
        AddUniteFdsComponent,
        TypeUniteFdsComponent,
        AddTypeUniteFdsComponent,
        TraceComponent,
        AddTraceComponent,
        ModalConfirmComponent,
        JourSemaineComponent,
        AddJourSemaineComponent,
        BaacComponent,
        AddBaacComponent,
        ButtonsComponent,
        ListsComponent,
        AlertsComponent,
        SweetAlertsComponent,
        ToastrComponent,
        NouiSliderComponent,
        BadgesComponent,
        DropdownsComponent,
        MediaObjectsComponent,
        PaginationComponent,
        ProgressBarsComponent,
        ModalsComponent,
        CollapseComponent,
        AccordionComponent,
        CarouselComponent,
        PopoverComponent,
        RatingComponent,
        NavsComponent,
        TooltipComponent,
        TypeaheadComponent,
        NgbdModalContent,
        NgButtonsComponent,
        UploadComponent,
        DragDropComponent,
        TourComponent,
        CropperComponent,
        AvatarComponent,
        SwiperComponent,
        AddTrancheAgeComponent,
        TrancheAgeComponent,
        IntersectionComponent,
        AddIntersectionComponent,
        LumiereComponent,
        AddLumiereComponent,
        ProfessionComponent,
        AddProfessionComponent,
        AppartenanceVehiculeComponent,
        AddAppartenanceVehiculeComponent,
        ClassificationRouteComponent,
        AddClassificationRouteComponent,
        GraviteBlessureComponent,
        AddGraviteBlessureComponent,
        GenreVehiculeComponent,
        AddGenreVehiculeComponent,
        EtatFeuxComponent,
        AddEtatFeuxComponent,
        SecteurComponent,
        AddSecteurComponent,
        EtatChausseeComponent,
        AddEtatChausseeComponent,
        EtatGeneralComponent,
        AddEtatGeneralComponent,
        EtatPneusComponent,
        AddEtatPneusComponent,
      ConditionAtmospheriqueComponent,
      AddConditionAtmospheriqueComponent,

    ]
})
export class UIComponentsModule { }
