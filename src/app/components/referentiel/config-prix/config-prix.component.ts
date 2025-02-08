import { Component, OnInit, ChangeDetectionStrategy,  ViewEncapsulation, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, NgForm, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { ModalConfirmComponent } from 'app/components/modal-confirm/modal-confirm.component';
import { ChangeDetectorRef } from '@angular/core';
import {ConfigPrix} from "../../modeles/config-prix.modele";
import {ConfigPrixService} from "../../services/config-prix.service";
import {EnteteConfigPrix} from "../../modeles/entete-config-prix.modele";
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
declare var window: any;

@Component({
    selector: 'app-config-prix',
    templateUrl: './config-prix.component.html',
    styleUrls: ['./config-prix.component.scss'],
})

export class ConfigPrixComponent implements OnInit {
configprixsForm: UntypedFormGroup;
displayedColumns: string[] = ['produit', 'prix', 'unite'];
addForm: FormGroup;
supForm: FormGroup;
submitted = false;
edited=true;
formModal: any;
formModalSup: any;
configprixs : ConfigPrix[];
enteteconfigprix : EnteteConfigPrix;
idEntete = '';
p=1;
    highlighted: boolean = false;
    constructor(
    private fb: UntypedFormBuilder,
    private actRoute: ActivatedRoute,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private configprixService: ConfigPrixService) {
    }

  ngOnInit(): void {

   this.actRoute.queryParams.subscribe(params => {
        this.idEntete = params['vwp'];
          this.getConfigPrixProduitId(this.idEntete);
        });
  }
    ngAfterViewChecked() {
    }


getConfigPrixProduitId(id: string) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
 console.log("################1");
 this.configprixService.getConfigPrixByEntete(id).subscribe( data => {
 this.spinner.hide();
 this.configprixsForm = this.fb.group({
        configprixarrys: this.fb.array(data.configprixs.map(configprix1 => this.createConfigPrixGroup(configprix1)))
      });
 this.configprixs = data.configprixs;
 this.enteteconfigprix = data.enteteconfigprix;
this.cdr.detectChanges(); // Forcer la détection des changements
  console.log("################ --- birima -- birima",data); });
 console.log("################2");
}

  get configprixarrys(): UntypedFormArray {
    return this.configprixsForm.get('configprixarrys') as UntypedFormArray;
  }

  onEditValue(index: number): void {
    const configprixGroup = this.configprixarrys.at(index);
    const configprix = configprixGroup.value;

    this.configprixService.updateConfigPrix(configprix).subscribe(updatedProduct => {

    });
  }

createConfigPrixGroup(configprix: ConfigPrix): UntypedFormGroup {
console.log("#######################biribiri ", configprix);
    return this.fb.group({
      id: [configprix.id],
      produit: [configprix.produit],
      prix: [configprix.prix],
      unite: [configprix.enteteconfigprix.unite],
      stock: [configprix.stock],
      prixachat: [configprix.prixachat],
    });
  }

}

