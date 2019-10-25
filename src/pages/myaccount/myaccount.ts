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


  goNextOfKin(){
    this.navCtrl.push('NextOfKinPage')
  }
  // goBankingDetails(){
  //   this.navCtrl.push('BankingDetailsPage')
  // }


  goBankingDetails(){
    
    this.storage.get('user_id').then((result) => {
  this.storage.get('org_id').then((result) => {
    
       this.navCtrl.push("BankingDetailsPage", {
          user_id:result,
          org_id:result,

          // id:result,
        });

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

  goMedicalHistory(user_id){
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
