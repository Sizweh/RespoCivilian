import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, UrlSerializer} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


declare var google;


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
specify_emergency: any;

selectedResponder      : any; 
responderName: any;
responderPlate: any;
responderDistance: any;
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  zone: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    ) {

    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = []
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
 
 

 
    this.storage.get('category').then((val) => {
      console.log('cater db stuff');
      console.log(val);
      this.category = val;
      this.event = val.category;
    });
    // this.storage.get('specify_emergency').then((val) => {
    //   console.log('cater db stuff');
    //   console.log(val);
    //   this.specify_emergency = val;
    //   this.event = val.specify_emergency;
    // });


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
      zoom: 14,
      center: { lat: -29.856278, lng: 31.028828 },

      disableDefaultUI: true,









      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ff4400"
              },
              {
                  "saturation": -68
              },
              {
                  "lightness": -4
              },
              {
                  "gamma": 0.72
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#be0c0c"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#1f00ff"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#0077ff"
              },
              {
                  "gamma": 3.1
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#d5e6f9"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#0d57aa"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "hue": "#ff0000"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "saturation": "0"
              },
              {
                  "color": "#4aa738"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#44ff00"
              },
              {
                  "saturation": -23
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#f2f4f6"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffcb04"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "weight": "6.28"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffcb04"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffcb04"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "saturation": -64
              },
              {
                  "hue": "#ff9100"
              },
              {
                  "lightness": 16
              },
              {
                  "gamma": 0.47
              },
              {
                  "weight": 2.7
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": -48
              },
              {
                  "hue": "#ff5e00"
              },
              {
                  "gamma": 1.2
              },
              {
                  "saturation": -23
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#00ccff"
              },
              {
                  "gamma": 0.44
              },
              {
                  "saturation": -33
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "hue": "#007fff"
              },
              {
                  "gamma": 0.77
              },
              {
                  "saturation": 65
              },
              {
                  "lightness": 99
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "gamma": 0.11
              },
              {
                  "weight": 5.6
              },
              {
                  "saturation": 99
              },
              {
                  "hue": "#0091ff"
              },
              {
                  "lightness": -86
              }
          ]
      }
  ]
  
  























 
    });
 

   
        var input = document.getElementById('pac-input');
       

    

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', that.map);

        autocomplete.setFields(
          ['address_components', 'geometry', 'icon', 'name']);

      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      // infowindow.setContent();

      
      var marker = new google.maps.Marker({
        map: that.map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
       
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {

          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          that.map.fitBounds(place.geometry.viewport);
        } else {
          that.map.setCenter(place.geometry.location);
          that.map.setZoom(17);

        }
        marker.setPosition(place.geometry.location);
        
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }
        infowindow.setContent(address);
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(that.map, marker);
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
          draggable: true,
        });

        google.maps.event.addListener(markerCivilian, 'click', (function (marker) {
          return function () {
            // infowindow.setContent("my Location");
            infowindow.open(that.map, marker);
            // document.getElementById("emegencyButtons").style.display ='';
          }
        })(markerCivilian));



        var geocodr = new google.maps.Geocoder();
        markerCivilian.addListener('dragend', function(event)  {
          
       //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
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

      



        that.infoWindow.open(that.map);
        that.map.setCenter(pos);

      }, function () {
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
  this.userDetails = {
    'civilian_id': this.civilianId,
    'lat': that.civilianLat,//current lat
    'lng': that.civilianLng,//current lng
    'driver_id': this.selectedResponder.id,
    'company_id': this.selectedResponder.company.id,
    'emergency_type': this.event,
    // 'specify_emergency': this.event    
  }


  this.urlService.makeRequest(this.userDetails)
    .subscribe(res => {
      // this.presentToast(res.msg, res.status);
      console.log(res);
      // alert(res);ss
      var msg = res.msg;
      var status = res.status;
      var reqId = res.request_id;

      const loader = this.loadingCtrl.create({
        content: "Sending request...",
        duration: 3000
      });

      this.alert.presentAlert("Notification", msg);
      if (status == "OK") {
        loader.present();
        this.storage.set('request_id', reqId);
        this.navCtrl.push("ConfirmPage");
      }
    }, (err) => {
      console.log(err);
    });


// return console.log(this.userDetails);
// this.http.post("http://03e873a6.ngrok.io/api/civilian/makeRequest", this.userDetails)//testing on devapp
// this.http.post("http://46.101.169.33/api/civilian/makeRequest", this.userDetails)//live    
// this.http.post("http://127.0.0.1:8000/api/civilian/makeRequest", this.userDetails)//local
// .subscribe(data => {
//  console.log(data);

//   var msg = data['msg'];
//   var status = data['status'];
//   var reqId = data['request_id'];

//   const loader = this.loadingCtrl.create({
//     content: "Sending request...",
//     duration: 3000
//   });

//   this.alert.presentAlert("Notification", msg);

//   if (status == "OK") {
//     loader.present();
//     this.storage.set('request_id', reqId);
//     this.navCtrl.push("ConfirmPage");
//   } 

//  }, error => {
//   console.log(error);
// });
// this.navCtrl.push('ConfirmPage')
}

goHome(){
this.navCtrl.setRoot('HomePage')

}


 





}
