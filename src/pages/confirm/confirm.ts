import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { CallNumber } from '@ionic-native/call-number';
import { interval } from 'rxjs/observable/interval';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertController } from 'ionic-angular';



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
  driversDistance: any;
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
     public alertCtrl: AlertController
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
      });  
  }
  timeInt (){
      const source = interval(5000);
      this.subscription = source.subscribe(val => this.checkAccept());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


  goHome(){
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
          this.navCtrl.push('HomePage');
        }
    }, (err) => {
     
    });


  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      console.log('phone_no')
  }



}
