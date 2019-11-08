import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  org_Id: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
  }


  goMedicalHistory(){
    this.storage.get('user_id').then((result) => {
        this.navCtrl.push("MedicalHistoryPage", {
          user_id:result,
        });
    })
  }
    
  goNextOfSkin(){
    this.storage.get('user_id').then((result) => {
        this.navCtrl.push("NextOfSkinPage", {
          user_id:result,
        });
    });
  }


    
}
