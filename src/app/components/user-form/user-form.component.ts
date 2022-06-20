import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isCookieEnabled: boolean = false;
  browserLanguage :string = '';
  isOnline:boolean = false;
  processorCores:number | undefined;
  userAgent:string = '';
  latitude:number | undefined ;
  longitude:number | undefined;
  maxDate: any;

  constructor(private cookieService: CookieService,private router:Router) {
  }
  ngOnInit(): void {
    // Returns false if setting a cookie will be ignored and true otherwise.
    this.isCookieEnabled = navigator.cookieEnabled;

    //restricts user to choose future date
    let today = new Date()
    let d = today.toISOString().split('T')[0];
    this.maxDate = d;
  }

  login = new FormGroup({
    fname: new FormControl('',[Validators.required]),
    lname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    dob : new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  setCookie() {
    let firstName = this.login.value.fname;
    let lastName = this.login.value.lname;
    let email = this.login.value.email;
    let dob = this.login.value.dob;
    let password = this.login.value.password;
    this.cookieService.set('fname',`${firstName}`);
    this.cookieService.set('lname',`${lastName}`);
    this.cookieService.set('email', `${email}`);
    this.cookieService.set('dob',`${dob}`);
    this.cookieService.set('password', `${password}`);
    this.router.navigate(['/users-data']);
  }
  ngOnDestroy(){
  }
}
