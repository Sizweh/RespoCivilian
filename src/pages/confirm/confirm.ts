import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {take} from 'rxjs/operators';  
import { interval } from 'rxjs/observable/interval';


/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  civilianLat : any;
  civilianId  : string;
  civilianLng : any;
  driverLat   : any;
  driverLng   : any;
  driverETA   : any;
  driversCompany: any;
  driversDistance: any;//distance between driver and civilian should be
  //calculated on backend;

  userDetails: any;
  category: any;
  selectedResponder: any; 
  responderName: any;
  
  responderId: any;
  responderPlate: any;
  responderDistance: any;
  reqId: any;

  subscription: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public alert: AlertsProvider,
    private storage: Storage,
    ) 
    
    {
  
      // const source = interval(3000);
      // //output: 0,1,2,3,4,5....
      // const subscribe = source.subscribe(this.checkAccept);
      this.storage.get('user_id').then((val) => {
        console.log('user db stuff');
        console.log(val);
        this.civilianId = val;
        // alert(val);
        
      });
      this.storage.get('request_id').then((val) => {
        console.log('request db stuff');
        console.log(val);
        this.reqId = val;
        // alert(val);
        
      });
      this.storage.get('selected_responder').then((val) => {
        console.log('respo db stuff');
        console.log(val);
        this.selectedResponder = val;
        this.responderId = val.id;
        this.responderName = val.driver_name;
        // alert(this.responderName);
        var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
        this.responderDistance = randomnumber;

        
        this.timeInt();
      });
      
  }
  timeInt (){
      const source = interval(3000);
      //output: 0,1,2,3,4,5....
      this.subscription = source.subscribe(val => this.checkAccept());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  goCountDown(){
    this.navCtrl.push('CountDownPage')
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }

  checkAccept() {

    // this.storage.get('user_id').then((val) => {
    //   console.log('user db stuff');
    //   console.log(val);
    //   this.civilianId = val;
    //   // alert(val);
      
    // });
    // this.http.post("http://46.101.169.33/api/civilian/activateCivilian", postData)
    this.userDetails={
      'user_id': this.civilianId,
      'driver_id': this.responderId,
      'request_id': this.reqId,
     
    }
    

    // return console.log(this.userDetails);
    this.http.post("http://127.0.0.1:8000/api/civilian/checkRespoAccept", this.userDetails)
    
      .subscribe(data => {
         console.log(this.userDetails);

      //  return console.log(data);
        var msg = data['msg'];
        var status = data['status'];
        if (status == "OK") {
          this.alert.presentAlert("Notification", msg);
            //save user details
            // this.storage.set('user_name', data['user_name']);
            //  this.storage.set('user_id', data['user_id']);
            // alert("driver accepted");
            this.subscription.unsubscribe();
          this.navCtrl.push("CountDownPage");
        } else {
          // alert("driver has not accepted yet.");

        }

       }, error => {
        console.log(error);
      });
  }
}
