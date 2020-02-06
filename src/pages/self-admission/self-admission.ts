import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { Network } from '@ionic-native/network';




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
  isConnected:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    private network: Network,
    ) {

      setTimeout(() => {
        if(this.network.type==="wifi"){
          this.isConnected=true;
        }
        if(this.network.type==="cellular"){
          this.isConnected=true;
        }
        if(this.network.type==="4g"){
          this.isConnected=true;
        }
      else{
      
      }
      
      }, 0);
      
      
        
      this.network.onConnect().subscribe(()=>{
      this.isConnected=true;
      
      });
      
      
      this.network.onDisconnect().subscribe(()=>{
        this.isConnected=false;
      
      });

      // this.storage.get('user_id').then((val) => {
      //   this.user_Id = String(val);

      // });
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

// goMaps2(){
// this.storage.set('forWho', 'FM');

// this.navCtrl.push("MapsPage");

// const loading= this.loadingCtrl.create({
//   content: "Getting your location...",
//   duration: 4500
// });
// loading.present();
// }

goMaps2(id,user_id){    
  this.storage.set('forWho', 'FM');
  this.navCtrl.push("MapsPage", {
    data: id,
    user_id:user_id
  });

const loading= this.loadingCtrl.create({
  content: "Getting your location...",
  duration: 4500
});
loading.present();

  }

goMaps(id,user_id){    
  this.storage.set('forWho', 'FS');
  this.navCtrl.push("MapsPage", {
    data: id,
    user_id:user_id
  });

const loading= this.loadingCtrl.create({
  content: "Getting your location...",
  duration: 4500
});
loading.present();

  }



goChat2(id,user_id){
     this.storage.set('forWho', 'FB');
     const loading= this.loadingCtrl.create({
      content: "Getting your location...",
      duration: 4500
    });
    loading.present();


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
          this.storage.set('Beneficiary_id', (e));
         this.navCtrl.push("MapsPage", {

          data: id,
          user_id:user_id
         });  

        }
        
   
      }
    ]
  });


 alert.present();


}








}

// goMaps(){
//   this.storage.set('forWho', 'FS');

// this.navCtrl.push("MapsPage");
// const loading= this.loadingCtrl.create({
//   content: "Getting your location...",
//   duration: 4500
// });
// loading.present();
// }
