import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
  }


  goNextOfKin(){
    this.navCtrl.push('NextOfKinPage')
  }
  // goBankingDetails(){
  //   this.navCtrl.push('BankingDetailsPage')
  // }


  goBankingDetails(){
    
    this.storage.get('user_id').then((result) => {
    
       this.navCtrl.push("BankingDetailsPage", {
          user_id:result,
          // id:result,
        });

      });

        }
    

  goForSelf(){
    
    this.storage.get('user_id').then((result) => {
    
       this.navCtrl.push("ForSelfPage", {
          user_id:result,
          // id:result,
        });

      });

        }
    
}
