import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { MenuController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  playerId :any; 
  user_ids :any;
  user_id: any;
  userId: any;
  
  responderId: any;
  responderPlate: any;
  responderDistance: any;
  reqId: any;
  subscription: any;
  alert: any;
  civilianId: any;
  userDetails: any;
  OneSignal: any;
  isConnected:boolean;

  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public menuCtrl: MenuController,
    private oneSignal: OneSignal,
    private network: Network
   
    ) {
    this.menuCtrl.enable(true);



    
    this.network.onConnect().subscribe(()=>{
      this.isConnected=true;
      this.toastCtrl.create({
  
        message: '',
        position: 'middle',
        duration: 2000,
      }).present();
      });
  
      
      this.network.onDisconnect().subscribe(()=>{
        this.isConnected=false;
      this.toastCtrl.create({
  
        message: 'Ooops, please check your network connection',
        position: 'middle',
        duration: 2000,
  
      }).present();
      });
  
      
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.



      // setTimeout(() => {
      //   if (this.network.type === 'wifi') {
      //     alert('we got a wifi connection, woohoo!');
      //     console.log('we got a wifi connection, woohoo!');
      //   }
      // }, 3000);

    
  





}
faultCategories = [
  {
    faultID: 1,
    category: "Vehicle Accident",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/vehicleaccident.png", 
    icon: "alarm"
   
  },
  {
    faultID: 2,
    category: "Heart Attack/Chest Pains",
    // imageUrl: "../../assets/icons/R1.png",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R1.png", 
    icon: "alarm"
  },

  {
    faultID: 3,
    category: "Severe Bleeding",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/severebleeding.png",
    icon: "alarm"
  },
  {
    faultID: 4,
    category: "Burns",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/burns.png",
    icon: "alarm"
  },
  {
    faultID: 5,
    category: "Difficulty Breathing",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R12.jpg",
    icon: "alarm"
  },
  {
    faultID: 6,
    category: "Fainting",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/fainting.png",
    icon: "alarm"
  },
  {
    faultID: 7,
    category: "Snake Bite",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/snakebite.png",
    icon: "alarm"
  },
  {
    faultID: 8,
    category: "Labour",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/labour.png",
    icon: "alarm"
  },
  {
    faultID: 9,
    category: "Falling/Collapse",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R10.jpg",
    icon: "alarm"
  },
  {
    faultID: 10,
    category: "Seizure/Fitting",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R11.jpg",
    icon: "alarm"
  },
];

 
otherCategories = [
  {
    faultID: 11,
    category: "Other",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R8.png",
    icon: "alarm"
   
  },

];





ionViewDidLoad() {

    this.storage.get('user_id').then((val) => {
    //   console.log('cater db stuff');
    //  console.log(val);
     this.user_id = val;
    // console.log("note  login" + this.user_id)
     if(this.user_id === null)
     {
      // console.log("Note  login")
       this.navCtrl.setRoot('LoginPage');  
     }
     else{
     }

     this.network.onConnect().subscribe(()=>{
      this.isConnected=true;
      this.toastCtrl.create({
  
        message: '',
        position: 'middle',
        duration: 1500,
      }).present();
      });
  
      
      this.network.onDisconnect().subscribe(()=>{
        this.isConnected=false;
      this.toastCtrl.create({
  
        message: 'Ooops, please check your network connection',
        position: 'middle',
        duration: 1500,
  
      }).present();
      });






    });



  //console.log('ionViewDidLoad HomePage');

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

 window["plugins"].OneSignal
 .startInit("c92bb615-7c1e-4a91-8e4d-e4d3d771c165", "384977991016")
   .handleNotificationOpened(notificationOpenedCallback)
   .endInit();
   
//   window["plugins"].OneSignal.getIds(function(ids) {
//       this.playerId =  ids.userId
//      // alert(this.playerId)
// });
// //  alert(this.playerId)

this.storage.get('user_id').then((val) => {
window["plugins"].OneSignal.sendTag("user_id", this.user_id);
 // console.log("tags sent");
  this.user_id = String(val);  
});


this.storage.get('user_id').then((user_id) => {
   this.user_ids = 'user_id' ; 
});

 var postData ={user_id:this.user_ids , playerId:this.playerId };

  this.urlService.updatePlayerId(postData)
  .subscribe(res => {
  console.log(res);
  if (res.status=='OK') {
    console.log("playeId updated.");
  }  else {
    console.log("Please try again.");
  }
}, (err) => {
  console.log(err);
});
  
   
}

  goSelfAdmission(fault){

  this.storage.get('user_id').then((result) => {
    this.storage.set('category', fault);
    this.navCtrl.push("SelfAdmissionPage", {
      user_id:result,
    });
});
    
    }

  // goSelfAdmission(fault){
  //   this.storage.set('category', fault);
  //   this.navCtrl.push('SelfAdmissionPage')
  // }

  goSpecifyEmergency(other){
    this.storage.set('category', other);
    this.storage.get('user_id').then((result) => {
    this.storage.get('id').then((_result_) => {
      this.navCtrl.push("SpecifyEmergencyPage", {
        user_id:result,
        id:result,
      });
  });
});


let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');

  let toast = this.toastCtrl.create({
    message: 'Network disconnected',
    duration: 3000,
  });
    toast.present();
});
// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  let toast = this.toastCtrl.create({
    message: 'Network connected',
    duration: 3000,
  });
    toast.present();


  alert('network connected!');

  });

    // stop connect watch
   connectSubscription.unsubscribe();




}
checkAccept() {

  this.userDetails={
    'user_id': this.civilianId,
    'driver_id': this.responderId,
    'request_id': this.reqId,
   
  }
  
  this.urlService.checkRespoAccept( this.userDetails)
  .subscribe(res => {
      // this.presentToast(res.msg, res.status);
      console.log(res);
      if (res.status=='accepted') {
        this.alert.presentAlert("Notification", res.msg);
        this.subscription.unsubscribe();
        this.navCtrl.push('CountDownPage');
      }
      if (res.status=='canceled') {
        this.alert.presentAlert("Notification", res.msg);
        this.subscription.unsubscribe();
        this.navCtrl.push('CountDownPage');
      }
  }, (err) => {
      console.log(err);
  });


}
 

goEmergencyNo(){
  // this.network.onConnect().subscribe(()=>{
  //   this.toastCtrl.create({

  //     message: 'hooray, we`re back on track',
  //     position: 'Bottom',
  //     closeButtonText: 'OK',
  //   }).present();
  //   });

    
  //   this.network.onDisconnect().subscribe(()=>{
  //   this.toastCtrl.create({

  //     message: 'Ooops, please check your network connection',
  //     position: 'Bottom',
  //     closeButtonText: 'OK', 

  //   }).present();
  //   });
this.navCtrl.push('EmergencyNoPage')
}


}








// faultCategories = [
//   {
//     faultID: 1,
//     category: "Vehicle Accident",
//     imageUrl: "../../assets/icons/R7.png", 
//     icon: "alarm"
   
//   },
//   {
//     faultID: 2,
//     category: "Heart Attack",
//     imageUrl: "../../assets/icons/R3.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 3,
//     category: "Severe Bleeding",
//     imageUrl: "../../assets/icons/R5.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 4,
//     category: "Burns",
//     imageUrl: "../../assets/icons/R9.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 5,
//     category: "Difficulty Breathing",
//     imageUrl: "../../assets/icons/R12.jpg",
//     icon: "alarm"
//   },
//   {
//     faultID: 6,
//     category: "Fainting",
//     imageUrl: "../../assets/icons/R2.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 7,
//     category: "Snake Bite",
//     imageUrl: "../../assets/icons/R6.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 8,
//     category: "Labour",
//     imageUrl: "../../assets/icons/R4.png",
//     icon: "alarm"
//   },
//   {
//     faultID: 9,
//     category: "Falling",
//     imageUrl: "../../assets/icons/R10.jpg",
//     icon: "alarm"
//   },
//   {
//     faultID: 10,
//     category: "Seizure",
//     imageUrl: "../../assets/icons/R11.jpg",
//     icon: "alarm"
//   },
// ];

 
// otherCategories = [
//   {
//     faultID: 11,
//     category: "Other",
//     imageUrl: "../../assets/icons/R8.png",
//     icon: "alarm"
   
//   },

// ];