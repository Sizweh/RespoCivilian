import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  imageResponse: any;
  options: any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,  
    ) {
  }

  

 

  goHome(){
  this.navCtrl.setRoot('HomePage')

  }
  goLogin(){

    const loading= this.loadingCtrl.create({
      content: "loging out...",
      duration: 3000
    });
    loading.present();










  this.navCtrl.setRoot('LoginPage')

  }

  


  goPersonalDetails(){
    this.navCtrl.push('PersonalDetailsPage')
  
    }

    goMedicalHistory(){
    this.navCtrl.push('MedicalHistoryPage')
  
    }

    goNextOfSkin(){
    this.navCtrl.push('NextOfSkinPage')
  
    }

    goBankDetails(){
    this.navCtrl.push('BankDetailsPage')
  
    }


}



