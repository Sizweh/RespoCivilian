import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { HttpClient } from '@angular/common/http';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  playerId :any; 
  user_ids :any;
  user_id: any;
  
  responderId: any;
  responderPlate: any;
  responderDistance: any;
  reqId: any;
  subscription: any;
  alert: any;
  civilianId: any;
  userDetails: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    // private http: HttpClient,
    private urlService: UrlbaseProvider,
    public menuCtrl: MenuController,

   
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
    category: "Heart Attack",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/heartattack.png",
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
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/difficultbreathing.png",
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
    category: "Falling",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R10.jpg",
    icon: "alarm"
    
    
  },
  {
    faultID: 10,
    category: "Seizure",
    imageUrl: "https://blooming-waters-81867.herokuapp.com/icons/R12.jpg",
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
      console.log('cater db stuff');
     console.log(val);
     this.user_id = val;
     console.log("note  login" + this.user_id)
     if(this.user_id === null)
     {
       console.log("Note  login")
       this.navCtrl.setRoot('LoginPage');
        
     }
     else{
 
     }
      

    });


  console.log('ionViewDidLoad HomePage');

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

 // window["plugins"].OneSignal
 //   .startInit("422a9798-6102-4c4b-8d59-bd1bebcd6810", "316673984537")
//    .handleNotificationOpened(notificationOpenedCallback)
//    .endInit();
   
  window["plugins"].OneSignal.getIds(function(ids) {
      this.playerId =  ids.userId
     // alert(this.playerId)
});
this.storage.get('user_id').then((user_id) => {
 // console.log(user_id);
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

  goLocation(fault){
    this.storage.set('category', fault);
    
    this.navCtrl.push('SelectResponderPage')
  }

  // goSpecifyEmergency(other){
  //   this.storage.set('category', other);

  //   this.navCtrl.push('SpecifyEmergencyPage')
  // }

  goLanding(){
    this.navCtrl.push('LandingPage')
  }
  
  goSelfAdmission(fault){
    this.storage.set('category', fault);
    this.navCtrl.push('SelfAdmissionPage')
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
 




}

