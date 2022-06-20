import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  fname = '';
  lname = '';
  email = '';
  dob = '';

  browserLanguage: string = '';
  isOnline: boolean = false;
  processorCores: number | undefined;
  userAgent: string = '';
  latitude: number | undefined;
  longitude: number | undefined;

  currentUrl: string = '';

  constructor(private cookieService: CookieService, private location: Location) { }

  ngOnInit(): void {
    this.fname = this.cookieService.get('fname')
    this.lname = this.cookieService.get('lname')
    this.email = this.cookieService.get('email')
    this.dob = this.cookieService.get('dob')

    //language of the browser UI
    this.browserLanguage = navigator.language;

    // Returns a boolean value indicating whether the browser is working online.
    this.isOnline = navigator.onLine;

    //Returns the number of logical processor cores available.
    this.processorCores = navigator.hardwareConcurrency;

    // returns the user-agent header sent by the browser to the server.
    this.userAgent = navigator.userAgent;

    // geolocation gives co-ordinate of browser

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      })
    }
    else {
      alert("Geolocation is not supported by browser");
    }
  }

  goBack() {
    this.location.back();
  }

  // 

  async shareUrl() {
    this.currentUrl = window.location.href;
    const shareData = {
      title: 'Demo-Page',
      text: 'Testing web navigator api methods',
      url : `${this.currentUrl}`,
    }
    await navigator.share(shareData);
  }

  async shareFile(){
    const file = new File([], "assets/task_image.png", { type: "image/png" });
      await navigator.share({
        title: "Example File",
        files: [file]
      });
  }

}
