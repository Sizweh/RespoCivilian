import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';

import { interval } from 'rxjs/observable/interval';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


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
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
    private storage: Storage,
    ) 
    
    {
  
     
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
        this.selectedResponder = [val];
        this.responderId = val.id;
        this.responderName = val.driver_name;
        // alert(this.responderName);
        var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
        this.responderDistance = randomnumber;

        //polling, should look for alternatives
        this.timeInt();
      }); 
      
  }
  timeInt (){//THIS SHOULD BECOME A PUSHER NOTIFICATION TO CHECK IF REPONDER ACCEPTED
      const source = interval(5000);
      //output: 0,1,2,3,4,5....
      this.subscription = source.subscribe(val => this.checkAccept());
      // this.checkAccept();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
    this.subscription.unsubscribe();
  }

  goCountDown(){
    this.subscription.unsubscribe();
    this.navCtrl.push('CountDownPage')
  }
  goHome(){
    this.subscription.unsubscribe();
    this.navCtrl.setRoot('HomePage')
  }

  cancel() {
  // cancelRequest
  this.subscription.unsubscribe();

  this.userDetails={
    'user_id': this.civilianId,
    'driver_id': this.responderId,
    'request_id': this.reqId,
    'reason': 'Civilian cancled',
    'user_type': 'Civilian',
   
  }
  this.urlService.cancelRequest( this.userDetails)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        this.alert.presentAlert("Notification", res.msg);
        console.log(res);
        if (res.status=='canceled') {
          this.subscription.unsubscribe();
          this.navCtrl.push('HomePage');
        } 
        // if(res.status=='canceled') {
        //   this.navCtrl.push('SelectResponderPage');

        // }
    }, (err) => {
        console.log(err);
    });


  
  }
  checkAccept() {

    this.userDetails={
      'user_id': this.civilianId,
      'driver_id': this.responderId,
      'request_id': this.reqId,
     
    }
    
    this.urlService.checkRespoAccept( this.userDetails)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        

        if (res.status=='accepted') {
          this.navCtrl.push('CountDownPage');
          this.subscription.unsubscribe();
        this.alert.presentAlert("Notification", res.msg);
        } 
        if (res.status=='arrived') {
          this.navCtrl.push('ArrivalPage');
          this.subscription.unsubscribe();
        this.alert.presentAlert("Notification", res.msg);
        } 
        if(res.status=='canceled') {
          this.navCtrl.push('SelectResponderPage');
          this.subscription.unsubscribe();
        this.alert.presentAlert("Notification", res.msg);

        }
    }, (err) => {
        console.log(err);
    });


  }
}
