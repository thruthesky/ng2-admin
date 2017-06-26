import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { ChangePasswordModal } from "../changePasswordModal/changePasswordModal";

@Component({
  selector: 'change-password-button',
  template: `
    <i class="fa fa-key" (click)="onClick()"></i>
  `,
  styles: [` i.fa-key { 
    cursor: pointer;
    font-family: FontAwesome}`]
})
export class ChangePasswordButton implements OnInit {
  //renderValue: string;

  @Input() value: string | number;

  //@Output() onClickKey: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {

  }

  ngOnInit() {

  }

  onClick() {
    //console.log('this.value', this.value);
    this.staticModalShow();

    //this.onClickKey.emit('change password');
  }

  staticModalShow() {
    const activeModal = this.modalService.open( ChangePasswordModal, {size: 'lg', backdrop: 'static'});
    activeModal.componentInstance.modalHeader = this.value;
    activeModal.componentInstance.user_idx = this.value;
    activeModal.componentInstance.modalContent = `Change Password for ID: ${this.value}`;
  }
}


