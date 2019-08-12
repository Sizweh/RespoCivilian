import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


declare var google;

@IonicPage()
@Component({
  selector: 'page-history1',
  templateUrl: 'history1.html',
})
export class History1Page {

  historyForm: FormGroup;
  history_collection: any;
  id: any;
  User_Id: any;
  responderName: any;

  selectedResponder: any; 
  responderDistance: any;
  civilianLat: any;
  civilianLng: any;
  infoWindow: any;
  map: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber,
    public contacts: Contacts,
    public formBuilder: FormBuilder,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    ) {
      

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
     
      this.historyForm = formBuilder.group({
        // 'user_id': ['',],

        'user_id': [this.User_Id,],
        'id': [this.id,],
        
      })
  }

  ngOnInit() {
    let that = this;
    setTimeout(function () {
      that.googleMap();
    }, 2000)
  }

  googleMap() {

    let that = this;
    //intial map setup, if no geolaction available
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 19,
      center: { lat: -29.856278, lng: 31.028828 }
    });
    //end intial map setup
    // var driverLatLng = {lat:this.driverLat, lng:this.driverLng};
    // console.log("driver");
    // console.log(driverLatLng);

    var infowindow = new google.maps.InfoWindow();

    this.infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //set cvilians location

        var civilianLng = pos.lng;
        if (civilianLng) {
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

        google.maps.event.addListener(markerCivilian, 'click', (function (marker) {
          return function () {
            infowindow.setContent("my Location");
            infowindow.open(that.map, marker);
            // document.getElementById("emegencyButtons").style.display ='';
          }
        })(markerCivilian));


        that.infoWindow.open(that.map);
        that.map.setCenter(pos);

      }, function () {
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
    console.log('ionViewDidLoad History1Page');

    // this.storage.get('responderName').then((val) => {
    //   console.log('respo db stuff');
    //   console.log(val);
    //   this.selectedResponder = val;
    //   this.responderName = val.driver_name;
    //   alert(this.responderName);
    //   var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    //   this.responderDistance = randomnumber;
    // });

     // this.storage.get('id').then((val) => {
    // this.storage.get('user_id').then((val) => {

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
    //  const requestOptions = new RequestOptions({ headers: headers });
     
     //pass to back-end
      //  console.log(this.historyForm.value);

      var postData = this.historyForm.value;
        // var postData = {user_id:val};
         //var postData = {id:val};
  
        //THIS IS A BETTER WAY TO MAKE API CALLS
      this.urlService.viewhistory(postData)
      .subscribe(res => {
          // this.presentToast(res.msg, res.status);
         // console.log(res.id);
          //console.log(res.drop_off);
         // this.alert.presentAlert("Notification", res.msg);
       this.history_collection = res;
          if (res.status=='OK') {
            // localStorage.setItem('token', res.token);
            //this.navCtrl.setRoot('HomePage');
          }
      }, (err) => {
          console.log(err);
      });
  
      // });
  }








  goSupport(){
    this.navCtrl.push('SupportPage')
  }


}
