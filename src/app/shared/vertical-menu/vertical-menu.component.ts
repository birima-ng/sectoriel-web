import {
  Component, OnInit, ViewChild, OnDestroy,
  ElementRef, AfterViewInit, ChangeDetectorRef, HostListener
} from "@angular/core";
import { RouteInfo } from './vertical-menu.metadata';

import { ROUTES } from './vertical-menu-routes.config';
import { HROUTES } from '../horizontal-menu/navigation-routes.config';

import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../services/layout.service';

import {ModuleDTO} from 'app/components/modeles/module-dto.modele';
import {ModuleService, MenuItem} from 'app/components/services/module.service';
import { NgxSpinnerService } from "ngx-spinner";
//export const ROUTES: MenuItem[] = [];
@Component({
  selector: "app-sidebar",
  templateUrl: "./vertical-menu.component.html",
  animations: customAnimations
})
export class VerticalMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  level: number = 0;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout;
modules : ModuleDTO[];

  constructor(
    private spinner: NgxSpinnerService,
    private moduleService: ModuleService,
    private router: Router,
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }


  ngOnInit() {
   // this.getModuleFeatureMenus();
   // this.getModuleFeatures();
    this.getModuleActives(localStorage.getItem("profil"));
/*
this.moduleService.getMenuItems().subscribe((menuItems: MenuItem[]) => {
            for (let menuItem of menuItems) {
                ROUTES.push(menuItem);
            }
        });*/

 //for (let menuItem of HROUTES) {
               // ROUTES.push(menuItem);
//this.menuItems.push(menuItem);
//console.log("menuItem menuItem menuItem", menuItem);
  //          }
      //  this.menuItems = HROUTES;
console.log("####################################### this.menuItems ",this.menuItems);
  }

  ngAfterViewInit() {

    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    });

    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      collapse => {
        if (this.config.layout.menuPosition === "Side") {
          this.collapseSidebar = collapse;
        }
      });

  }


  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
      if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout((() => {
        this.innerWidth = event.target.innerWidth;
          this.loadLayout();
      }).bind(this), 500);
  }

  loadLayout() {

    if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
      if (this.innerWidth < 1200) { // Screen size < 1200
        this.menuItems = HROUTES;
      }
    }
    else if (this.config.layout.menuPosition === "Side") { // Vertical Menu{
      this.menuItems = ROUTES;
    }




    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if(this.config.layout.sidebar.collapsed) {
      this.collapseSidebar = true;
    }
    else {
      this.collapseSidebar = false;
    }
  }

  toggleSidebar() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {

    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    }
    else {
      this.perfectScrollbarEnable = true;
    }

  }


  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }

  }

getModuleFeatures(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModuleFeatures().subscribe( data => {
 this.spinner.hide();
 this.modules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ data data modules ",data); });
 console.log("################2");
}

getModuleFeatureMenus(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModuleFeatureMenus().subscribe( data => {
 this.spinner.hide();

this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ data data",ROUTES); });
 console.log("################2");
}

getModuleMenus(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModuleMenus().subscribe( data => {
 this.spinner.hide();
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ data data",ROUTES); });
 console.log("################2");
}

getModuleActives(id: string){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.moduleService.getModuleActives(id).subscribe( data => {
 this.spinner.hide();
 this.modules = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ data data",ROUTES);
console.log("################ data data dynamic ",data);
  });
 console.log("################2");
}


getValue(): boolean{
console.log("######################################## getValue");
return true;
}
}
