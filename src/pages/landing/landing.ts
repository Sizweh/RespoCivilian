import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  playerId :any; 
  user_ids :any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
    ) {
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
      category: "Difficulty Breathing",
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
    console.log('ionViewDidLoad LandingPage');
  
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
  
   // window["plugins"].OneSignal
   //   .startInit("422a9798-6102-4c4b-8d59-bd1bebcd6810", "316673984537")
  //    .handleNotificationOpened(notificationOpenedCallback)
  //    .endInit();
     
    window["plugins"].OneSignal.getIds(function(ids) {
        this.playerId =  ids.userId
        alert(this.playerId)
  });
  this.storage.get('user_id').then((user_id) => {
   // console.log(user_id);
     this.user_ids = user_id ; 
  });
  
    var postData ={user_id:this.user_ids , playerId:this.playerId };
    
    this.http.post("http://46.101.169.33/api/civilian/updatePlayerId", postData)
      .subscribe(data => {
  
        var msg = data['msg'];
        var status = data['status'];
        if (status == "OK") {
          console.log("playeId updated.");
        } else {
          console.log("Please try again.");
        }
  
       }, error => {
        console.log(error);
      });
     
  }


  goLocation(fault){
    this.storage.set('category', fault);
    
    this.navCtrl.push('SelectResponderPage')
  }

  goSpecifyEmergency(other){
    this.storage.set('category',other);

    this.navCtrl.push('SpecifyEmergencyPage')
  }












}
