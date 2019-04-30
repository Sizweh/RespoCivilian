import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditsuccessfullyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editsuccessfully',
  templateUrl: 'editsuccessfully.html',
})
export class EditsuccessfullyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsuccessfullyPage');
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }
}
