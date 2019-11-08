import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { CallNumber } from '@ionic-native/call-number';
import { interval } from 'rxjs/observable/interval';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';



@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  civilianLat : any;
  civilianId  : any;
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
    public callNumber: CallNumber,
    ) 
    
    {
  
     
      this.storage.get('user_id').then((val) => {
   
        this.civilianId = val;

        
      });
      this.storage.get('request_id').then((val) => {
    
        this.reqId = val;
  
        
      });
      this.storage.get('selected_responder').then((val) => {

        this.selectedResponder = [val];
        this.responderId = val.id;
        this.responderName = val.driver_name;
     
        var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
        this.responderDistance = randomnumber;

  
        this.timeInt();
      }); 
      
  }
  timeInt (){
      const source = interval(5000);
    
      this.subscription = source.subscribe(val => this.checkAccept());
  

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
    
    this.urlService.checkRespoAccept(this.userDetails)
    .subscribe(res => {
    
        if (res.status=='accepted') {
          this.alert.presentAlert("Notification", res.msg);
          this.subscription.unsubscribe();
          this.navCtrl.push('CountDownPage');
        }
        if (res.status=='canceled') {
          this.alert.presentAlert("Notification", res.msg);
          this.subscription.unsubscribe();
          this.navCtrl.push('CountDownPage');
        }
    }, (err) => {

    });


  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
 
  }



}
