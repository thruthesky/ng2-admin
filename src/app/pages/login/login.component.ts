import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

import {User, _USER_LOGIN_RESPONSE, _USER_LOGIN} from 'angular-backend';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(
    fb: FormBuilder,
    private user: User,
    private router: Router
  ) {
    this.form = fb.group({
      'id': ['aaaa', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['aaaa', Validators.compose([Validators.required, Validators.minLength(4)])]
    });


    this.email = this.form.controls['id'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {

      this.user.login( <_USER_LOGIN>this.form.value ).subscribe((res: _USER_LOGIN_RESPONSE) => {
        console.log(res);
        this.router.navigateByUrl('/page/dashboard');
      }, err => {
        const errstr = this.user.getErrorString(err);
        console.log( errstr );
        if (err) {
          this.user.alert(err);
        }
      });

    }
  }
}
