import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, UrlSerializer} from 'ionic-angular';
import{ AuthProvider } from './../../providers/auth/auth'
import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';




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
export class LocationPage implements OnInit {

map         : any;
infoWindow  : any;
marker      : any;
event       : any;

civilianLat : any;
civilianId  : any;
civilianLng : any;
driverLat   : any;
driverLng   : any;
driverETA   : any;
driversCompany: any;
driversDistance: any;//distance between driver and civilian should be
//calculated on backend;
userDetails: any;
category: any;

selectedResponder      : any; 
responderName: any;
responderPlate: any;
responderDistance: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    private http: HttpClient,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,


    ) {



  }

  ngOnInit() {
   

    let that = this;
    setTimeout (function () {
      that.googleMap();
        
    },2000)
  
 }
 

googleMap ()

{
  


 
  this.storage.get('category').then((val) => {
    console.log('cater db stuff');
    console.log(val);
    this.category = val;
    this.event = val.category;
    
  });

  this.storage.get('user_id').then((val) => {
    console.log('user db stuff');
    console.log(val);
    this.civilianId = val;
    // alert(val);
    
  });

  this.storage.get('selected_responder').then((val) => {
    console.log('respo db stuff');
    console.log(val);
    this.selectedResponder = val;
    this.responderName = val.driver_name;
    // alert(this.responderName);
    var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    this.responderDistance = randomnumber;
    
  });
  
  let that = this;

//intial map setup, if no geolaction available
 this.map = new google.maps.Map(document.getElementById('map'), {   
    zoom: 16,
    center: {lat:-29.856278, lng:31.028828}

  });
  //end intial map setup
    // var driverLatLng = {lat:this.driverLat, lng:this.driverLng};
    // console.log("driver");
    // console.log(driverLatLng);
     
    var infowindow = new google.maps.InfoWindow();
    //DRIVER MARKER

  //   var markerRespo;
  //   markerRespo = new google.maps.Marker({
  //   position: driverLatLng,
  //   map: that.map,
  //   title: 'Responder driver location',
  //   draggable: false,
  //   icon: {                  
  //     url: "http://46.101.169.33/img/hospital.png"                           
  //   }
 
  //  }); 

  //  google.maps.event.addListener(markerRespo, 'click', (function(marker) {
  //             return function() {
  //               infowindow.setContent("sweet");
  //               infowindow.open(that.map, marker);
  //               // document.getElementById("emegencyButtons").style.display ='';
               
  //              }
  //           })(markerRespo));

  //END MARKER
   

  this.infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //set cvilians location
      
      var civilianLng = pos.lng;
      if(civilianLng){
        that.civilianLat = pos.lat;
        that.civilianLng = pos.lng;
      }

      //marker for user/civilian location
      var markerCivilian;
      markerCivilian = new google.maps.Marker({
            position: pos,
            map: that.map,
            title: 'My location',
            draggable: false,
         
          
          });
          google.maps.event.addListener(markerCivilian, 'click', (function(marker) {
            return function() {
              infowindow.setContent("my Location");
              infowindow.open(that.map, marker);
              // document.getElementById("emegencyButtons").style.display ='';
             
             }
          })(markerCivilian));
          
     
      that.infoWindow.open(that.map);
      that.map.setCenter(pos);

    }, function() {
      this.handleLocationError(true, that.infoWindow, this.map.getCenter(), that.map);
    });
    //api call to get the closest most relevant driver 
    // this.http.get("http://03e873a6.ngrok.io/api/civilian/showalldrivers", this.userDetails)//testing on devapp
    // this.http.get("http://46.101.169.33/api/civilian/showalldrivers", this.userDetails)
    //     this.http.get("http://127.0.0.1:8000/api/civilian/showalldrivers", this.userDetails)

    // .subscribe(data => {
    
    // //set drivers coordinates and distance
    // this.driverLat = parseFloat(data['aDriver']['lat']);
    // this.driverLng = parseFloat(data['aDriver']['lng']);
    // this.driversCompany = [data['driverETA']];

    // //get distnace and company details
    // this.driversDistance = data['distance'];
    // this.driverETA = data['ETA'];
    // this.driversCompany = [data['driverCompany']]
    

    // //  alert('1');
    //   this.driver = [data['aDriver']];
    //   console.log("this driver");
    //   console.log(this.driver);
    // //  console.log(this.responder);
    //   console.log(data);
    //   }, error => {
    //   console.log(error);
    // });
    
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
    let that = this;

    this.userDetails={
      'civilian_id': this.civilianId,
      'lat': that.civilianLat,//current lat
      'lng': that.civilianLng,//current lng
      'driver_id': this.selectedResponder.id,
      'company_id': this.selectedResponder.company.id,
      'emergency_type': this.event,
    }
    // return console.log(this.userDetails);
    // this.http.post("http://03e873a6.ngrok.io/api/civilian/makeRequest", this.userDetails)//testing on devapp
    // this.http.post("http://46.101.169.33/api/civilian/makeRequest", this.userDetails)//live    
    this.http.post("http://127.0.0.1:8000/api/civilian/makeRequest", this.userDetails)//local
    .subscribe(data => {
      console.log(data);

      var msg = data['msg'];
      var status = data['status'];

      const loader = this.loadingCtrl.create({
        content: "Sending request...",
        duration: 3000
      });
      loader.present();

      this.alert.presentAlert("Notification", msg);

      if (status == "OK") {
        this.navCtrl.push("ConfirmPage");
      } 

     }, error => {
      console.log(error);
    });
    this.navCtrl.push('ConfirmPage')
  }

  goHome(){
    this.navCtrl.setRoot('EmergencyPage')
  }
}
