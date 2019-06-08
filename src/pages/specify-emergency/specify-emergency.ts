import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

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
  username :any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
    ) {
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
  goSelectResponder(){
    this.storage.set('Specify_emergency',"aaaaaaaaaaaaa");

  
    this.navCtrl.push('SelectResponderPage')
  }


}
