import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,} from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import {  FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})

export class LocationPage implements OnInit {


L: any;
event: any;
userDetails: any;
category: any;
specify_emergency: any;
specify: any;
driver_name: any;
responderDistance: any;
GoogleAutocomplete: any;
autocomplete: { input: string; };
autocompleteItems: any[];
address: any;
additional_address : any ; 
map2Form: FormGroup;
showText: boolean;
Sear_location: any;
selectedResponder: any; 
responderName: any;
responderId: any;
forWho: any;
Latitude: any;
Longitude: any;
geoLatitude: number;
Beneficiary_id: any;
request_id: any;
Ln: any;
allResponders_Distance: any;
idcivilian: any;
    

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    private geolocation: Geolocation,
    ) {


      this.address = navParams.get('sear_location');
      this.additional_address = navParams.get('number');
  
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = []
  }

  ionViewDidLoad() {
        console.log('ionViewDidLoad LocationPage');

      this.geolocation.getCurrentPosition().then((data)=>{
        this.geoLatitude = data.coords.latitude;
        var tut =(`Lat : ${data.coords.latitude  } and Long : ${data.coords.longitude  }`);
        console.log(tut);
        document.getElementById('infowindow-content').innerHTML = tut;     
      });
    
    this.storage.get('Beneficiary_id').then((val) => {
        this.Beneficiary_id = val;
      });
      
    this.storage.get('additional_address').then((val) => {
        this.additional_address = val;
      });
    this.storage.get('request_id').then((val) => {
        this.request_id = val;
      });

    this.storage.get('lat').then((val) => {
        this.L = val;
      });
    this.storage.get('lng').then((val) => {
        this.Ln = val;
      });

    this.storage.get('forWho').then((val) => {
        this.forWho = val;
      });



     
   

this.showText = true;
setTimeout(()=>{  
      this.showText = true;
 },3000);

}



  ngOnInit() {
    let that = this;
    setTimeout(function () {
      that.googleMap();
    }, 2000)
  }


googleMap() {

this.storage.get('specify_emergency').then((val) => {
this.specify_emergency = val;
this.event = val.specify_emergency;
});

this.storage.get('category').then((val) => {
this.category = val;
this.event = val.category;
});

this.storage.get('user_id').then((val) => {
this.idcivilian = val;
});


this.storage.get('address').then((val) => {
this.address = val;
});

this.storage.get('lat').then((val) => {
this.L = val;
});

this.storage.get('lng').then((val) => {
this.Ln = val;
});

this.storage.get('selected_responder').then((val) => {
this.selectedResponder = val;
this.responderId = val.company_id;
this.responderName = val.driver_name;
var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
this.responderDistance = randomnumber;
}); 
}

goConfirm(){

  this.userDetails = {

    'civilian_id': this.idcivilian,
    'lat': this.L,//current lat
    'lng': this.Ln,//current lng
    'driver_id': this.selectedResponder.id, 
    'company_id': this.selectedResponder.company_id,
    'emergency_type': this.event,
    'specify_emergency': this.specify_emergency,
    'address':this.address,
    'additional_address':this.additional_address,
    'forWho':this.forWho,
    'Beneficiary_id':this.Beneficiary_id,
  }

  this.urlService.makeRequest(this.userDetails)
    .subscribe(res => {
      //console.log(res);
      var msg = res.msg;
      var status = res.status;
      var reqId = res.request_id;
      var specify = res.specify_emergency;

      const loader = this.loadingCtrl.create({
        content: "Sending request...",
        duration: 3000
      });
      if (status == "error") {
        this.alert.presentAlert("Respo", 'Please try again... connecting to the server');
      }
      if (status == "OK") {
        loader.present();
        this.storage.set('request_id', reqId);
        this.storage.set('specify_emergency', specify);
        this.storage.remove( 'specify_emergency');
        this.navCtrl.push("ConfirmPage");
      }
    }, (err) => {

    });

}


goHome(){
this.navCtrl.setRoot('HomePage')
}


 





}
    