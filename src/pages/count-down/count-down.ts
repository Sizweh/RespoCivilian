import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { interval } from 'rxjs/observable/interval';


/**
 * Generated class for the CountDownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-count-down',
  templateUrl: 'count-down.html',
})
export class CountDownPage {
  selectedResponder: any; 
  subscription: any;
  civilianId  : string;
  reqId: any;
  userDetails: any;
  responderId: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
    private storage: Storage,
    
    ) {

      this.storage.get('selected_responder').then((val) => {
        console.log('respo db stuff');
        console.log(val);
        this.selectedResponder = [val];


      }); 

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
    this.timeInt();
      
  }
  timeInt (){//THIS SHOULD BECOME A PUSHER NOTIFICATION TO CHECK IF REPONDER ACCEPTED
      const source = interval(5000);
      //output: 0,1,2,3,4,5....
      this.subscription = source.subscribe(val => this.checkArrived());
      // this.checkAccept();

  }

    checkArrived() {

      this.userDetails={
        'user_id': this.civilianId,
        'driver_id': this.responderId,
        'request_id': this.reqId,
       
      }
      
      this.urlService.checkRespoAccept( this.userDetails)
      .subscribe(res => {
          // this.presentToast(res.msg, res.status);
          console.log(res);
          
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountDownPage');
  }


  goArrival(){
    this.navCtrl.push('ArrivalPage')
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }
  goChat1(){
    this.navCtrl.push('Chat1Page')
  }
}
