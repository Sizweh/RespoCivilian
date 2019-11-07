import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Alert} from 'ionic-angular';
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
    private network: Network,


   
    ) {

    this.menuCtrl.enable(true);
    

 
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
    console.log('ionViewDidLoad HomePage');

    this.storage.get('user_id').then((val) => {

     this.user_id = val;

     if(this.user_id === null)
     {
       this.navCtrl.setRoot('LoginPage');  
     }
     else{
     }

     
  
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
  
        message: 'please check your network connection',
        position: 'middle',
        duration: 2000,
  
      }).present();
      });
      






    });





  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

 window["plugins"].OneSignal
 .startInit("c92bb615-7c1e-4a91-8e4d-e4d3d771c165", "384977991016")
   .handleNotificationOpened(notificationOpenedCallback)
   .endInit();
   


this.storage.get('user_id').then((val) => {
window["plugins"].OneSignal.sendTag("user_id", this.user_id);

  this.user_id = String(val);  
});


this.storage.get('user_id').then((_user_id) => {
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
 
this.navCtrl.push('EmergencyNoPage')
}


}








