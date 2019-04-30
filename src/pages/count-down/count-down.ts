import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';



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
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber
    ) {

   

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
