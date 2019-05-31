import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController,NavController,  AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {


  constructor(private navParams: NavParams, 
    private view: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    public navCtrl:  NavController,
    ) {
  }

  ionViewWillLoad() {
  const data = this.navParams.get('data');
  console.log(data);
  }

  closeModal() {
    const data = {
     name: 'john doe',
     occupation: 'Milkman'
    }
     this.view.dismiss(data);
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
      this.navCtrl.push("SelfAdmissionPage");
      }

}
