import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { MenuController } from 'ionic-angular';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  playerId :any; 
  user_ids :any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
    private urlService: UrlbaseProvider,
    public menuCtrl: MenuController,

   
    ) {
      this.menuCtrl.enable(true);

}
faultCategories = [
  {
    faultID: 1,
    category: "Vehicle Accident",
    imageUrl: "http://46.101.169.33/icons/vehicleaccident.png",
    icon: "alarm"
   
  },
  {
    faultID: 2,
    category: "Heart Attack",
    imageUrl: "http://46.101.169.33/icons/heartattack.png",
    icon: "alarm"
  },
  {
    faultID: 3,
    category: "Severe Bleeding",
    imageUrl: "http://46.101.169.33/icons/severebleeding.png",
    icon: "alarm"
  },
  {
    faultID: 4,
    category: "Burns",
    imageUrl: "http://46.101.169.33/icons/burns.png",
    icon: "alarm"
  },
  {
    faultID: 5,
    category: "Diffcult Breathing",
    imageUrl: "http://46.101.169.33/icons/difficultbreathing.png",
    icon: "alarm"
  },
  {
    faultID: 6,
    category: "Fainting",
    imageUrl: "http://46.101.169.33/icons/fainting.png",
    icon: "alarm"
  },
  {
    faultID: 7,
    category: "Snake Bite",
    imageUrl: "http://46.101.169.33/icons/snakebite.png",
    icon: "alarm"
  },
  {
    faultID: 8,
    category: "Labour",
    imageUrl: "http://46.101.169.33/icons/labour.png",
    icon: "alarm"
    
    
  },



 
];

 
otherCategories = [
  {
    faultID: 9,
    category: "B8A",
    imageUrl: "http://46.101.169.33/icons/B8A.png",
    icon: "alarm"
   
  },

];





ionViewDidLoad() {
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
   this.user_ids = user_id ; 
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
  goSpecifyEmergency(){
    this.navCtrl.push('SpecifyEmergencyPage')
  }

  goLanding(){
    this.navCtrl.push('LandingPage')
  }
  goSelfAdmission(){
    this.navCtrl.push('SelfAdmissionPage')
  }




 



}







