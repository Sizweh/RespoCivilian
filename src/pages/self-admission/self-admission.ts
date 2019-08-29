import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';



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
    public storage: Storage,
    ) {
  }

  // openModal() {
  //   const myModalOptions: ModalOptions = {
  //     enableBackdropDismiss: false
  //   }
  //   const myModalData = {
  //     name: 'Paul Halliday',
  //     occupation: 'Developer'
  //   };
  //   const myModal: Modal = this.modal.create('ModalPage', { data: myModalData }, myModalOptions);
  //   myModal.present();
  //   myModal.onDidDismiss((data) => {
  //     console.log("I have dismissed");
  //     console.log(data);
  //   })
  //   myModal.onDidDismiss((data) => {
  //     console.log("I'm about to dismiss");
  //     console.log(data);
  //   })
  // }

  // goHome() {
  //   const loading = this.loadingCtrl.create({
  //     content: "Checking code...",
  //     duration: 3000
  //   });
  //   loading.present();
  //   let alert = this.alertCtrl.create({
  //     title: 'Self Admission',
  //     message: 'Admission details sent successfully, your medical aid will reply with confirmation',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  //   this.navCtrl.setRoot("HomePage");
  // }



goForSelf(){    
this.navCtrl.push("ForSelfPage");
}

goForSomeone(data){

this.storage.set('ForSomeone', 'Yes');
console.log(+ "ForSomeone");
    console.log(data);

 // this.navCtrl.push("ForSomeonePage");
}


goSelectResponder(){
  this.storage.set('forSomeone', 'Yes');
  console.log('for someone clicked');    
this.navCtrl.push("SelectResponderPage");
}

}
