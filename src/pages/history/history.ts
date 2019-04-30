import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  goHistory1(){
    this.navCtrl.push('History1Page')
  }
  goHistory2(){
    this.navCtrl.push('History2Page')
  }
  goHistory3(){
    this.navCtrl.push('History3Page')
  }
  goHistory4(){
    this.navCtrl.push('History4Page')
  }
  goHistory5(){
    this.navCtrl.push('History5Page')
  }
  goHistory6(){
    this.navCtrl.push('History6Page')
  }

 
}
