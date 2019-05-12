import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logined = false;
  flag = false;
  form;
  message = '';
  constructor(private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  // send() {
  //   this.dataService.login({
  //     email: this.form.value.email,
  //     password: this.form.value.password
  //   }).subscribe((data: any) => {
  //       if (data.logined === true) {
  //         this.dataService.logined = true;
  //         this.dataService.storeUserData(data.token);
  //         this.router.navigate(['contents', 'content'])
  //       } else {
  //         this.dataService.logined = false;
  //       }
  //     },
  //     err => {
  //       this.logined = true;
  //       this.message = err.error.message;
  //     });
  // }
  send() {
    this.dataService.getAllData();
    this.dataService.logined = true;
    this.router.navigate(['content', 'getCategory']);
  }
}
