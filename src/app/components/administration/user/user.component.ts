import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from "@angular/core";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { usersListData } from "./data/users-list.data";
import {User} from 'app/components/modeles/user.modele';
import {UserService} from 'app/components/services/user.service';
import { AddUserComponent } from './add/add-user.component';

import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import {UniteFdsService} from 'app/components/services/unite-fds.service';
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import {TypeUniteFdsService} from 'app/components/services/type-unite-fds.service';
import {Profil} from 'app/components/modeles/profil.modele';
import {ProfilService} from 'app/components/services/profil.service';

import { NgxSpinnerService } from "ngx-spinner";

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: [
    "./user.component.scss",
    "../../../../assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

unitefdss: UniteFds[];
unitefds: UniteFds;

profils: Profil[];
profile: Profil;

typeunitefdss: TypeUniteFds[];
typeunitefds: TypeUniteFds;
nom_unitte = '';
  // row data
  //public rows = usersListData;
public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;
   users : User[];
  // column header
  public columns = [
    { name: "Username", prop: "username" },
    { name: "Prénom", prop: "prenom" },
    { name: "Nom", prop: "nom" },
    { name: "Téléphone", prop: "telephone" },
    { name: "E-mail", prop: "email" },
    { name: "Role", prop: "Role" },
    { name: "Actions", prop: "Actions" },
  ];

  // private
  private tempData = [];

  constructor(
    public toastr: ToastrService,
    private profilService: ProfilService,
    private unitefdsService: UniteFdsService,
    private typeunitefdsService: TypeUniteFdsService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private userService: UserService) {
   // this.tempData = usersListData;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {
  this.getAllUser();
  this.getAllProfil();
  }



getAllUser() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.userService.getUsers().subscribe( data => {
 this.spinner.hide();
 this.users = data;
 this.rows = data;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
 console.log("################2");
}

    openContent() {
        //const modalRef = this.modalService.open(AddUserComponent, { windowClass: 'custom-modal' });
        const modalRef = this.modalService.open(AddUserComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUser();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'add';
    }

getAllProfil() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 this.profilService.getProfils().subscribe( data => {
 this.spinner.hide();
 this.profile = data;
// this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################",data); });
}

 compareFn(a, b) {
  if(a==b)
return true
else
    return a && b && a.id == b.id;
  }

    formEdit(user: User) {
        const modalRef = this.modalService.open(AddUserComponent);
 modalRef.result.then((result) => {
      if (result === 'Data updated') {
        this.getAllUser();
      }
    }, (reason) => {
      // Handle dismiss reason if needed
    });
        modalRef.componentInstance.action = 'edit';
        modalRef.componentInstance.entity = user;
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

    this.userService.deleteUser(id).subscribe( data => {
    console.log("############### ID",id);
    this.spinner.hide();
    this.getAllUser();
    this.toastr.success('Profil supprimé avec succès!', 'STOCK-PRIX');
      },
      error => {
    this.spinner.hide();
    console.log("error avant !!!");
      });
}
}
