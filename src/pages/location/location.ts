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

Userdata: any;
L:any;
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
specify_emergency: any;
specifyEmergency: any;
specify: any;


driver_name: any;
responderPlate: any;
responderDistance: any;
GoogleAutocomplete: any;
autocomplete: { input: string; };
autocompleteItems: any[];
zone: any;
address: any;
address_loacation : any ; 
additional_address : any ; 

map2Form: FormGroup;
showText: boolean;
Sear_location: any;
pick_up: any;
allResponders: any;
selectedResponder: any; 
responderName: any;
responderId: any;
company_name: any;
forWho: any;
Latitude: any;
Longitude: any;
geoLatitude: number;
Beneficiary_id: any;
  request_id: any;
    

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    private geolocation: Geolocation,
    ) {

      this.storage.get('address').then((val) => {
          this.address = val;
      });
     
this.storage.get('selected_responder').then((val) => {

    this.selectedResponder = [val];
    this.responderId = val.id;
    this.responderName = val.driver_name;
    var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    this.responderDistance = randomnumber;
    }); 
     
      this.address = navParams.get('sear_location');
      this.additional_address = navParams.get('number');
      //console.log('ssssssssssssss'+ this.address_loacation );
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

    this.storage.get('address').then((val) => {
        this.address = val;
      });
    // this.storage.get('Latitude').then((val) => {
    //     this.Latitude = val;
    //   });
    // this.storage.get('Longitude').then((val) => {
    //     this.Longitude = val;
    //   });

    this.storage.get('lat').then((val) => {
      this.address = val;
  });
  this.storage.get('long').then((val) => {
      this.address = val;
  });





    this.storage.get('forWho').then((val) => {
        this.forWho = val;
      });

      this.storage.get('specify_emergency').then((val) => {
        this.specify_emergency = val;
        this.specify_emergency = val.specify_emergency;
      this.storage.remove( 'specify_emergency');
      });


    this.showText = true;

setTimeout(()=>{  
      this.showText = true;
 },3000);

}
  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
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
      this.storage.remove( 'specify_emergency');
      });

    this.storage.get('category').then((val) => {
        // console.log('cater db stuff');
        // console.log(val);
        this.category = val;
        this.event = val.category;
      });
      
      this.storage.get('user_id').then((val) => {
        // console.log('user db stuff');
        // console.log(val);
        this.civilianId = val;
      });

      this.storage.get('address').then((val) => {
        this.address = val;
      });

      this.storage.get('Latitude').then((val) => {
        this.Latitude = val;
      });
      
    this.storage.get('Longitude').then((val) => {
        this.Longitude = val;
      });

      this.storage.get('selected_responder').then((val) => {
        this.selectedResponder = val;
        this.responderId = val.id;
        this.responderName = val.driver_name;
        var randomnumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
        this.responderDistance = randomnumber;

        //polling, should look for alternatives
       // this.timeInt();
      }); 


    let that = this;
    //intial map setup, if no geolaction available
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: { lat: -29.856278, lng: 31.028828 },

      disableDefaultUI: true,

      
     styles:[
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ]
   
    });
        
      var infowindowContent = document.getElementById('infowindow-content');
      // infowindow.setContent();

      var  image = "https://blooming-waters-81867.herokuapp.com/icons/fixed5.png";
      var marker = new google.maps.Marker({
        map: that.map,
        // anchorPoint: new google.maps.Point(0, -29),
        draggable: true,
        icon:image
    

      });

        var geocodr = new google.maps.Geocoder();
        
        marker.addListener('dragend', function(event)  {
            
       //  alert(event.latLng.lat() + ' ' +  event.latLng.lng());
       geocodr.geocode({
          'latLng': event.latLng
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
            
                this.adressess = results[0].formatted_address; 
              
                infowindow.setContent(this.adressess);
                
              }
            }
          });
      });


   

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
        var  image = "https://blooming-waters-81867.herokuapp.com/icons/fixed5.png";
        var markerCivilian;
        markerCivilian = new google.maps.Marker({
          position: pos,
          map: that.map,
          title: 'My location',
          draggable: false,
          icon:image,
          animation: google.maps.Animation.DROP
        });

        var geocoder  = new google.maps.Geocoder();  
        var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
        
        geocoder.geocode({'latLng': location}, function (results, status) {
          if(status == google.maps.GeocoderStatus.OK) {           
          var add=results[0].formatted_address;         
         // document.getElementById('infowindow-content').innerHTML=add;    
          }
          });
        marker.addListener('click', toggleBounce);
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent("My location");
            infowindow.open(that.map, markerCivilian);


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



goConfirm(){

    this.Userdata = { 
        address:this.address,
    }
  let that = this;
  this.userDetails = {

    'civilian_id': this.civilianId,
    'lat': that.civilianLat,//current lat
    'lng': that.civilianLng,//current lng
    'driver_id': this.selectedResponder.id,
    'company_id': this.selectedResponder.company.id,
    'emergency_type': this.event,
    'specify_emergency': this.specify_emergency,
    'address':this.address,
    'additional_address':this.additional_address,
    'forWho':this.forWho,
    'Latitude':this.Latitude,
    'Longitude':this.Longitude,
    'Beneficiary_id':this.Beneficiary_id,
    'request_id':this.request_id,

 
  }
  this.urlService.makeRequest(this.userDetails)
    .subscribe(res => {
      // this.presentToast(res.msg, res.status);
      console.log(res);
      // alert(res);ss
      var msg = res.msg;
      var status = res.status;
      var reqId = res.request_id;

      var specify = res.specify_emergency;
      var L = document.getElementById('getLat').innerHTML
      let Ln = document.getElementById('getLong').innerHTML
  
      const loader = this.loadingCtrl.create({
        content: "Sending request...",
        duration: 3000
      });
      if (status == "error") {
        //  console.log(msg + 'server')
        this.alert.presentAlert("Respo", 'Please try again... connecting to the server');
      }
      if (status == "OK") {
        loader.present();
        this.storage.set('request_id', reqId);
        this.storage.set('specify_emergency', specify);
        this.storage.remove( 'specify_emergency');
        this.navCtrl.push("ConfirmPage");

        this.storage.set('lat',L);
        this.storage.set('Long',Ln);
      }
    }, (err) => {
     // console.log(err);
    });
   // this.navCtrl.push("ConfirmPage");
}

goMaps(){
this.navCtrl.setRoot('MapsPage')

}
goSelectResponder(){
this.navCtrl.push('SelectResponderPage')

}
goHome(){
this.navCtrl.setRoot('HomePage')

}


 





}
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