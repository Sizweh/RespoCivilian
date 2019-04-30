import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';

/**
 * Generated class for the History1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history1',
  templateUrl: 'history1.html',
})
export class History1Page {



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber,
    public contacts: Contacts
    ) {
      

     
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad History1Page');
  }

  goChat1(){
    this.navCtrl.push('Chat1Page')
  }


}
