import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Modal, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the SelfAdmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-self-admission',
  templateUrl: 'self-admission.html',
})
export class SelfAdmissionPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    private modal: ModalController
    ) {
  }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }

     const myModalData = {
       name: 'Paul Halliday',
       occupation: 'Developer'
     };




    const myModal: Modal = this.modal.create('ModalPage', { data: myModalData}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss ((data) => {
      console.log("I have dismissed");
      console.log(data);
    })
    
    myModal.onDidDismiss((data) => {
       console.log("I'm about to dismiss");
       console.log(data);

    })




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

         goForSelf(){    
          this.navCtrl.push("ForSelfPage");
          }
         goForSomeone(){    
          this.navCtrl.push("ForSomeonePage");
          }

}
