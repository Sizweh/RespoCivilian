import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EmergencyNoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency-no',
  templateUrl: 'emergency-no.html',
})
export class EmergencyNoPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyNoPage');
  }





  goHome(){
  // this.storage.set('forWho', 'FS');
  // console.log('for someone clicked'); 
this.navCtrl.setRoot("HomePage");
}

}
