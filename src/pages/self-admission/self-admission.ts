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
  ben_collection: any[];
  user_Id: string;
  id: any;
  name: any;
  Beneficiary_id: any;
  user_id: string;

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
      this.id = navParams.get('data') ;
      this.user_Id = navParams.get('user_id') ;

      this.beneficiaryForm = formBuilder.group({

      'user_id': [this.user_Id,],
    
        'Beneficiary_id': ['',],
      })

  }



  ionViewDidLoad() {

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
      
    console.log('ionViewDidLoad SelfAdmissionPage');
  }

goMaps2(){
this.storage.set('forWho', 'FM');
console.log('for me clicked');  
this.navCtrl.push("MapsPage");
}


goMaps(){
  this.storage.set('forWho', 'FS');
  console.log('for someone clicked'); 
this.navCtrl.push("MapsPage");
}

goChat2(){
  
  
  //  const value = this.beneficiaryForm.value;
  //  this.storage.set('Beneficiary_id', value.Beneficiary_id);

     this.storage.set('forWho', 'FB');
    

  let opt =[];

  this.ben_collection.forEach((ben,index)=>{

    let inp ={
      name: 'radio1',
      type: 'radio',
      label: ben.name,
      value: ben.id,
    
    };

    opt[index] =inp;

    
    
  });
  console.log(opt);

  

    const alert = this.alertCtrl.create({
  
    inputs:
     opt
    ,
    buttons: 
    


    [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (e) => {     

          console.log(e);
          
          // const value = this.beneficiaryForm.value;
         
          // this.storage.set('ben.id', value.ben.id);
         this.navCtrl.push("MapsPage");
        
         
            
        }
        
   
      }
    ]
  });
 

 alert.present();


//  this.storage.set('Beneficiary_id', this.Beneficiary_id)





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
