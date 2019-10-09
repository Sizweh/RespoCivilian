import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';


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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber,
    private storage: Storage,

    ) {

      this.storage.get('selected_responder').then((val) => {
        console.log('respo db stuff');
        console.log(val);
        this.selectedResponder = [val];


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

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      console.log('phone_no')
  }
  
}
