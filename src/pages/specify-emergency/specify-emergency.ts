import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SpecifyEmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specify-emergency',
  templateUrl: 'specify-emergency.html',
})
export class SpecifyEmergencyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecifyEmergencyPage');
  }

  goLocation(){
    this.navCtrl.push('LocationPage')
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }


}
