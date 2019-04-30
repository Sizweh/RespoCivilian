import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';



declare var google;


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

map : any;
infoWindow : any;
marker : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
   

    ) {

   let that = this;
    setTimeout (function () {
      that.googleMap();
        
    },2000)
       
      
   
      
      
 


  }

googleMap ()

{
  
let that = this;

 this.map = new google.maps.Map(document.getElementById('map'), {   
    zoom: 18,
    center: {lat: -29.856278, lng: 31.028828}

  });

  this.marker = new google.maps.Marker({
    position: {lat: -29.856278, lng: 31.028828},
    map: this.map,
    title: '5 Walnut Road',
    draggable: true,
 
  
  });
 
  


  this.infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

     
     
      that.infoWindow.open(that.map);
      that.map.setCenter(pos);
    }, function() {
      this.handleLocationError(true, that.infoWindow, this.map.getCenter(), that.map);
    });
  } else {
    // Browser doesn't support Geolocation
    this.handleLocationError(true, that.infoWindow, that.map.getCenter(), that.map);
  }

}

handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}






  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  goConfirm(){
    this.navCtrl.push('ConfirmPage')
  }

  goHome(){
    this.navCtrl.setRoot('HomePage')
  }

}
