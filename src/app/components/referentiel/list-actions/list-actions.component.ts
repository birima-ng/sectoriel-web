import { Component, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from 'app/shared/auth/auth.service';
@Component({
selector: 'app-list-actions',
templateUrl: './list-actions.component.html',
styleUrls: ['./list-actions.component.scss']
})
export class ListActionsComponent {
@Input() item: any;
@Input() addActionCode: string;
@Input() editActionCode: string;
@Input() deleteActionCode: string;
@Output() edit = new EventEmitter<any>();
@Output() delete = new EventEmitter<any>();
@Output() add = new EventEmitter<any>();

constructor(
    public authService: AuthService) {
    }
isActionAllowed(actionCode: string): boolean {
    // Appeler la méthode fournie qui vérifie l'autorisation
    return this.authService.hasPermission(actionCode);
  }

  editItem() {
    if (this.isActionAllowed(this.editActionCode)) {
      this.edit.emit(this.item);
    }
  }

  deleteItem() {
    if (this.isActionAllowed(this.deleteActionCode)) {
      this.delete.emit(this.item);
    }
  }

  formEdit() {
    if (this.isActionAllowed(this.editActionCode)) {
      this.edit.emit(this.item);
    }
  }

  formDelete() {
    if (this.isActionAllowed(this.deleteActionCode)) {
      this.delete.emit(this.item);
    }
  }

openContent(){
   if (this.isActionAllowed(this.addActionCode)) {
      this.add.emit(this.item);
    }
}
  checkPermission(actionCode: string, item: any): boolean {
    // Implémentez votre logique ici pour vérifier si l'action est autorisée
    return true; // Placeholder pour l'exemple
  }
}
