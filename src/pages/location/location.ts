import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,} from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';




declare var google;


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})

export class LocationPage {


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

    ) {


      this.address = navParams.get('sear_location');
      this.additional_address = navParams.get('number');
  
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = []
  }

  ionViewDidLoad() {
        console.log('ionViewDidLoad LocationPage');

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

    this.storage.get('forWho').then((val) => {
      this.forWho = val;
    });


}

goConfirm(){

  this.userDetails = {

    'civilian_id': this.idcivilian,
    'lat': this.L,
    'lng': this.Ln,
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
 
    //  var msg = res.msg;
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
    