import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,  } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-self-admission',
  templateUrl: 'self-admission.html',
})
export class SelfAdmissionPage {


  beneficiaryForm: FormGroup;
  ben_collection: any;
  user_Id: string;
  id: any;
  name: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    ) {

      this.storage.get('user_id').then((val) => {
        this.user_Id = String(val);  
      });

      // this.storage.get('id').then((val) => {
      //   this.id = String(val);  
      // });
      // this.storage.get('phone').then((val) => {
      //   this.phone = String(val);  
      // });


      this.id = navParams.get('data') ;
      this.user_Id = navParams.get('user_id') ;
      // this.id = navParams.get('id') ;
  
      this.beneficiaryForm = formBuilder.group({

      //  'user_id': [this.user_Id,],
        'user_id': ['16'],
        //'id': ['1'],
        
        // 'name': ['',],
        'name': ['',],
      })



  }



  ionViewDidLoad() {

    // this.storage.get('user_id').then((val) => {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.beneficiaryForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.viewbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
      });
      
   
      // this.user_Id = String(val);  
//  });


    console.log('ionViewDidLoad SelfAdmissionPage');
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

goHome(){

  this.navCtrl.setRoot ("HomePage");
}




goMaps2(){

 
this.storage.set('forWho', 'FM');
console.log('for me clicked');  

this.navCtrl.push("MapsPage");
}




goLocation(){

  this.storage.set('forWho', 'FS');
  console.log('for someone clicked'); 

this.navCtrl.push("MapsPage");
}

goMaps(){
  
  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );

  var postData = this.beneficiaryForm.value;

 //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.viewbeneficiary(postData)
  .subscribe(res => {
   this.ben_collection = res;
      if (res.status=='OK') {
      }
  }, (err) => {
      console.log(err);
    });
 
      
  this.storage.set('forWho', 'FB');
  //console.log('for someone clicked'); 
 // var user2: string;
  //this.urlService.viewbeneficiary(this.name).then(res => {
          console.log(name);
      //})
     // .catch((error) => {
        
     // });
  let alert = this.alertCtrl.create({
   //header: 'Radio',
 
    inputs: [
      {
        name: 'radio1',
        type: 'radio',
        label: 'Akhona Mbhele',
        value: 'Akhona Mbhele',
        // checked: true
       
      },
      
      {
        name: 'radio2',
        type: 'radio',
        label: 'Radio 2',
        value: 'value2'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.navCtrl.push('MapsPage'); 
        }
      }
    ]
  });
  console.log(name);
 alert.present();


  // let alert = this.alertCtrl.create({
  //       title: 'Self Admission',
  //       message: 'Admission details sent successfully, your medical aid will reply with confirmation',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: () => {
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();



  
//this.navCtrl.push("MapsPage");
}

}



//   const alert = this.alertController.create({
//     header: 'Radio',
//     inputs: [
//       {
//         name: 'radio1',
//         type: 'radio',
//         label: 'Radio 1',
//         value: 'value1',
//         checked: true
//       },
//       {
//         name: 'radio2',
//         type: 'radio',
//         label: 'Radio 2',
//         value: 'value2'
//       },
//       {
//         name: 'radio3',
//         type: 'radio',
//         label: 'Radio 3',
//         value: 'value3'
//       },
//       {
//         name: 'radio4',
//         type: 'radio',
//         label: 'Radio 4',
//         value: 'value4'
//       },
//       {
//         name: 'radio5',
//         type: 'radio',
//         label: 'Radio 5',
//         value: 'value5'
//       },
//       {
//         name: 'radio6',
//         type: 'radio',
//         label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
//         value: 'value6'
//       }
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: () => {
//           console.log('Confirm Cancel');
//         }
//       }, {
//         text: 'Ok',
//         handler: () => {
//           console.log('Confirm Ok');
//         }
//       }
//     ]
//   });

//  alert.present();