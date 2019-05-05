import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';




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



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    
   
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
  {
    faultID: 9,
    category: "Other",
    imageUrl: "http://46.101.169.33/icons/other.png",//
    icon: "alarm"
  },


 
];



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  goLocation(fault){
    this.storage.set('category', fault);
    this.navCtrl.push('SelectResponderPage')
  }
  goSpecifyEmergency(){
    this.navCtrl.push('SpecifyEmergencyPage')
  }




 



}







