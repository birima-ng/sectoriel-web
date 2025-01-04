import { Component, OnInit, ElementRef, HostListener, AfterViewInit, Renderer2, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CourrierService } from './courrier.service';
import { Mail, Message } from './courrier.model';
import { Subscription } from 'rxjs';
import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrls: ['./courrier.component.scss'],
  providers: [CourrierService]
})
export class CourrierComponent implements OnInit, AfterViewInit, OnDestroy {

  placement = "bottom-right";
  public innerWidth: any;

  editorModel = [{
    attributes: {
      font: 'roboto'
    },
    insert: 'test'
  }]

  public config: any = {};
  layoutSub: Subscription;

  searchQuery: string = '';
  activeTypeButton: string = "Courrier";
  isContentOverlay = false;
  isEmailSidebarShow = false;
  isComposeShow = false;
  selectedMailId: number = 4;
  isEmailImportant: boolean = false;
  public isCollapsed = true;
  public isCollapsed1 = false;
  public isMessageSelected = true;
  closeResult: string;
  mail: Mail[];
  message: Message;


  constructor(private elRef: ElementRef, private renderer: Renderer2,
    private modalService: NgbModal, private courrierService: CourrierService,
    @Inject(DOCUMENT) private document: Document,
    private configService:ConfigService, private cdr: ChangeDetectorRef) {

    this.mail = this.courrierService.courrier.filter((mail: Mail) => mail.mailType === 'Courrier');
    this.message = this.courrierService.message.filter((message: Message) => message.mailId === this.selectedMailId)[0];
    this.markAsRead();
    this.checkEmailImportantStatus();
    this.config = this.configService.templateConf;
    this.renderer.addClass(this.document.body, "email-application");
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    if(this.innerWidth < 768) {
      this.isMessageSelected = false;
    }

  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    this.renderer.removeClass(this.document.body, "email-application");
  }

  markAsRead() {
    let updateItem = this.mail.find(item => item.mailId.toString() === this.selectedMailId.toString());
    let index = this.mail.indexOf(updateItem);
    this.mail[index].isRead = true;
  }

  markAsUnread() {
    let updateItem = this.mail.find(item => item.mailId.toString() === this.selectedMailId.toString());
    let index = this.mail.indexOf(updateItem);
    this.mail[index].isRead = false;
  }

  markAsImportant() {
    let updateItem = this.mail.find(item => item.mailId.toString() === this.selectedMailId.toString());
    let index = this.mail.indexOf(updateItem);
    this.mail[index].isImportant = true;
    this.isEmailImportant = true;
  }

  markAsUnimportant() {
    let updateItem = this.mail.find(item => item.mailId.toString() === this.selectedMailId.toString());
    let index = this.mail.indexOf(updateItem);
    this.mail[index].isImportant = false;
    this.isEmailImportant = false;
  }

  checkEmailImportantStatus() {
    let selectedEmail = this.mail.find(item => item.mailId.toString() === this.selectedMailId.toString());
    this.isEmailImportant = selectedEmail.isImportant;
  }



  //courrier user list click event function
  DisplayMessage(mailId: number) {
    this.selectedMailId = mailId;
    this.message = this.courrierService.message.filter((message: Message) => message.mailId.toString() === mailId.toString())[0];
    this.isMessageSelected = true;
    this.markAsRead();
    this.checkEmailImportantStatus();
  }

  //compose start
  compose(show) {
    this.isComposeShow = show;
    this.isEmailSidebarShow = false;
    if(!show) {
      this.isContentOverlay = false;
    }
    else{
      this.isContentOverlay = true;
    }
  }


  //courrier labels click event function
  GetEmailsByLabel(labelType: string) {
    this.mail = this.courrierService.courrier.filter((mail: Mail) => mail.labelType === labelType);
    this.activeTypeButton =  labelType;
  }

  //courrier type click event function
  GetEmailsByType(type: string) {
    this.mail = this.courrierService.courrier.filter((mail: Mail) => mail.mailType === type)
    this.activeTypeButton =  type;
  }

  //courrier Starred click event function
  GetStarredEmails() {
    this.mail = this.courrierService.courrier.filter((mail: Mail) => mail.isImportant === true);
    this.activeTypeButton =  'Starred';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 768) {
      this.isMessageSelected = false;
    }
    if(this.innerWidth > 768) {
      this.isMessageSelected = true;
    }
  }

  onListItemClick() {
    this.isMessageSelected = true;
  }

  OnBackToCourrier() {
    this.isMessageSelected = false;
  }

  onSidebarToggle() {
    this.isContentOverlay = true;
    this.isEmailSidebarShow = true;
  }

  onContentOverlay() {
    this.isContentOverlay = false;
    this.isEmailSidebarShow = false;
    this.isComposeShow = false;

  }


}
