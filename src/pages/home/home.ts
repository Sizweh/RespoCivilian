import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { MenuController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { Geolocation, } from '@ionic-native/geolocation';
// import { Diagnostic } from '@ionic-native/diagnostic';



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

enableHighAccuracy:any;
geoLatitude: number;
geoLongitude: number;


  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public menuCtrl: MenuController,
    private oneSignal: OneSignal,
    private network: Network,
    private geolocation: Geolocation,
    // private diagnostic: Diagnostic,


   
    ) {

    this.menuCtrl.enable(true);


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





ionViewDidEnter() {
  console.log('ionViewDidLoad HomePage');

  let option = {
    enableHighAccuracy:true,
    maximumAge: 100,
    timeout:8000
   };
 
     this.geolocation.getCurrentPosition(option).then((data)=>{
     this.geoLatitude = data.coords.latitude;
     this.geoLongitude = data.coords.longitude;
     this.enableHighAccuracy =  data.coords.accuracy ;
 
        //  let RoundedLat = this.geoLatitude.toFixed(6);
        //  let RoundedLng = this.geoLongitude.toFixed(6);
        //  var x = document.getElementById('getaccuracy');
        //  var GPS = (`<b>Your GPS coordinates:</b>`);
        //  x.innerHTML = GPS;
       
           
        //  let L = document.getElementById('getLat');
        //  let Ln = document.getElementById('getLong');
        //  L.innerHTML = RoundedLat;
        //  Ln.innerHTML = RoundedLng;
        
     }); 

//      let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
//      let errorCallback = (e) => console.error(e);
     
//      this.diagnostic.isLocationAvailable().then(successCallback, errorCallback);
//      this.diagnostic.getLocationMode()

//      .then((state) => {
//        if (state == this.diagnostic.locationMode.LOCATION_OFF){
//          // do something
//          this.alertCtrl.create({
//           title: "Notification.",
//           subTitle:"Switch On your Location and Restart the Request Process.",
//           buttons:[
            
//             {text: 'Ok',
//             role: 'ok',
//             handler:()=>{
//               this.diagnostic.switchToLocationSettings();
//               this.navCtrl.setRoot("HomePage");
//             }
//           }
//         ]
//         }).present();
      
//        } else {
// ////////////////////////////////////////////////////////////////////////

//        }
       
//      }).catch(e => console.error(e));



  this.storage.get('user_id').then((val) => {

    this.user_id = val;

    if (this.user_id === null) {
      this.navCtrl.setRoot('LoginPage');
    }
    else {
    }
  });

  var notificationOpenedCallback = function (jsonData) {
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
    this.user_ids = 'user_id';
  });

  var postData = { user_id: this.user_ids, playerId: this.playerId };

  this.urlService.updatePlayerId(postData)
    .subscribe(res => {
      console.log(res);
      if (res.status == 'OK') {
        console.log("playeId updated.");
      } else {
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
      this.navCtrl.push("SpecifyEmergencyPage", {
        user_id:result,
      });
  });
}



checkAccept() {

  this.userDetails={
    'user_id': this.civilianId,
    'driver_id': this.responderId,
    'request_id': this.reqId,
   
  }
  
  this.urlService.checkRespoAccept(this.userDetails)
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








