import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';

import { interval } from 'rxjs/observable/interval';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';



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
  timeInt (){
      const source = interval(5000);
      //output: 0,1,2,3,4,5....
      this.subscription = source.subscribe(val => this.checkAccept());
      // this.checkAccept();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  goCountDown(){
    this.subscription.unsubscribe();
    this.navCtrl.push('CountDownPage')
  }
  goHome(){
    this.subscription.unsubscribe();
    this.navCtrl.setRoot('HomePage')
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
          this.alert.presentAlert("Notification", res.msg);
          this.subscription.unsubscribe();
          this.navCtrl.push('CountDownPage');
        }
    }, (err) => {
        console.log(err);
    });


  }
}
