import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import {_USER_PASSWORD_CHANGE_RESPONSE, User} from 'angular-backend';

@Component({
  selector: 'change-password-modal',
  templateUrl: './changePasswordModal.html'
})
export class ChangePasswordModal implements OnInit {

  modalHeader: string;
  modalContent: string;
  user_idx: string;
  newPassword: string = null;

  constructor(
    private activeModal: NgbActiveModal,
    private user: User
  ) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  onClickSaveNewPassword() {
    let updatePass = {
      user_idx: this.user_idx,
      new_password: this.newPassword
    };

    this.user.adminChangeUserPassword( updatePass ).subscribe( (res: _USER_PASSWORD_CHANGE_RESPONSE ) => {
      //console.log('updatePassword: ', res );
      alert('Change Password Success..');
      this.closeModal();
    }, err => this.user.alert( err ));
  }


}
