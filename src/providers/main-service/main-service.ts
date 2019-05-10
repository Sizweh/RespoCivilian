    
import { Injectable } from '@angular/core';
// import { Http,Headers } from '@angular/http';
// import { Events } from 'ionic-angular';
// import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the MainServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()

export class MainServiceProvider {
  link: any;

  constructor(
    // public http1: Http,
    //  private events: Events,
     public http: HttpClient,
     ) {
    this.link = 'http://localhost:8100/api/';
    // this.link = 'http://46.101.169.33/api/';
  }

  // loadHomeData() {
  //     let link = this.link + "/getFakeData";
  //     return new Promise(resolve => {
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //       this.http.get(link,  {headers: headers})
  //         .map(res => res.json())
  //         .subscribe(data => {
  //             resolve(data);
  //           }
  //           ,(err)=>{
  //             this.events.publish('app:toast', "Error while trying to load data");
  //           }
  //         );
  //     });
  //   }

  login(postData) {

     // this.http.post("http://46.101.169.33/api/civilian/activateCivilian", postData)
    //  this.http.post("http://127.0.0.1:8000/api/civilian/activateCivilian", postData)

          return this.http.post(this.link+'/cicivilian/loginCivilian', postData);
  
      // return this.http.get('localhost:8000/api/v1/fetchquotes?symbol=XAUUSD');
    }

}