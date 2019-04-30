import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArrivalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arrival',
  templateUrl: 'arrival.html',
})
export class ArrivalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArrivalPage');
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }
  goRating(){
    this.navCtrl.push('RatingPage')
  }

}
