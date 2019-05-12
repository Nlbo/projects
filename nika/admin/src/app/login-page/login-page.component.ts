import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validateForm: FormGroup;
  flagmsg = false;
  msg = '';
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.data.login(this.validateForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        let txt = JSON.stringify(data.user);
        localStorage.setItem('user', txt);
        this.router.navigate(['post'])
      },
      (err) => {
        console.log(err);
        this.msg = err.error['msg'];
        this.flagmsg = true;
      }
    );
  }

  constructor(private fb: FormBuilder, private data: DataService,private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
