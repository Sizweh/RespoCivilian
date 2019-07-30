import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-for-someone',
  templateUrl: 'for-someone.html',
})
export class ForSomeonePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForSomeonePage');
  }

  goHome(){

    const loading= this.loadingCtrl.create({
      content: "Checking code...",
      duration: 3000
    });
    loading.present();

    let alert = this.alertCtrl.create({
      title: 'Self Admission',
      message: 'Admission details sent successfully, your medical aid will reply with confirmation',
      buttons: [
        {
          text: 'OK',
          handler: () => {
        
          }
        }
      ]
    });
    alert.present();

    
    this.navCtrl.setRoot("HomePage");
    }




  goSelfAdmission(){    
  this.navCtrl.setRoot("SelfAdmissionPage");
  }
}
