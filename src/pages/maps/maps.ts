import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, } from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
//import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})

export class MapsPage implements OnInit {

marrkerCivilian:any;
map         : any;
infoWindow  : any;
marker      : any;
event       : any;
value :any 
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
Adressess: any;

map1Form: FormGroup;
map2Form: FormGroup;
map_collection: any;
additional_address : any ; 
  geoLatitude: number;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
   // private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    private geolocation: Geolocation,

    ) {

      
      this.map1Form = formBuilder.group({
        'address': ['',],
      })

      this.map2Form = formBuilder.group({
        'additional_address': ['',],
      })

    
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

    let that = this;
    //intial map setup, if no geolaction available

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: -29.856278, lng: 31.028828 },

      disableDefaultUI: true,
      styles: [
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



    this.infoWindow = new google.maps.InfoWindow();

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



        var image = "https://blooming-waters-81867.herokuapp.com/icons/moving4.png";
        var marrkerCivilian;
        marrkerCivilian = new google.maps.Marker({
          position: pos,

          map: that.map,
          title: 'My location',
          draggable: true,
          icon: image,
          animation: google.maps.Animation.DROP,

        });

        var images = "https://blooming-waters-81867.herokuapp.com/icons/fixed5.png";
        var markerCivilian;
        markerCivilian = new google.maps.Marker({
          position: pos,

          map: that.map,
          title: 'My location',
          draggable: false,
          icon: images,
          animation: google.maps.Animation.DROP,

        });


        var input = document.getElementById('pac-input');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', that.map);

        autocomplete.setFields(
          ['address_components', 'geometry', 'icon', 'name']);

        // var infowindow = new google.maps.InfoWindow();

        autocomplete.addListener('place_changed', function () {
          infowindow.close();


          var geocodr = new google.maps.Geocoder();
          marrkerCivilian.addListener('dragend', function (event) {

            //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
            geocodr.geocode({
              'latLng': event.latLng
            }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  this.adressess = results[0].formatted_address;
                  infowindow.setContent(this.adressess);
                  document.getElementById('infowindow-content').innerHTML = this.adressess;
                  this.Adressess = this.adressess;
                }
              }
            });
          });


          marrkerCivilian.setVisible(false);
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
          marrkerCivilian.setPosition(place.geometry.location);

          marrkerCivilian.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          document.getElementById('infowindow-content').innerHTML = address;

          var inputValue = (<HTMLInputElement>document.getElementById('pac-input')).value;

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
  //  marrkerCivilian.setVisible(false)
   //   this.init() ; 

    //  infowindow.open(that.map, marker);
    //infowindow.setContent(address);
   // document.getElementById('infowindow-content').innerHTML = "dsjfkjlkjslkjflkjsdlkjflksjl";
    
  });

var infowindowContent = document.getElementById('infowindow-content');

var infowindow = new google.maps.InfoWindow();
infowindow.setContent(markerCivilian.title);
infowindow.open(that.map, markerCivilian );


var geocoder = new google.maps.Geocoder();
var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


// let la = position.coords.latitude;
// let lo= position.coords.longitude;

// this.storage.set('lat', la);
// this.storage.set('long', lo);

geocoder.geocode({'latLng':location}, function (results, status) {
if(status == google.maps.GeocoderStatus.OK){

  var add = results [0].formatted_address;
  // document.getElementById('infowindow-content').innerText = add;
}
});
        var geocodrr = new google.maps.Geocoder();

        marrkerCivilian.addListener('dragend', function (event) {
          //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
          geocodrr.geocode({
            'latLng': event.latLng
          }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                this.adressess = results[0].formatted_address;
                infowindow.setContent(this.adressess);
                document.getElementById('infowindow-content').innerHTML = this.adressess;
                this.Adressess = this.adressess;
              }
            }
          });
        });
 //marker for user/civilian location

        var infowindow = new google.maps.InfoWindow();
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

  this.geolocation.getCurrentPosition().then((data)=>{
    this.geoLatitude = data.coords.latitude;
    var tut =(`Lat : ${data.coords.latitude  } and Long : ${data.coords.longitude  }`);
    console.log(tut);
    document.getElementById('infowindow-content').innerHTML = tut;     
  });

console.log('ionViewDidLoad MapsPage');
}

goHome(){
this.navCtrl.setRoot('HomePage')
}

goSelectResponder() {

    var Sear_location = document.getElementById('infowindow-content').innerText;
    var number = (<HTMLInputElement>document.getElementById("add")).value;

    this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((data)=>{
      this.storage.set('Latitude',data.coords.latitude);
      this.storage.set('Longitude',data.coords.longitude);
    })


     this.storage.set('address', Sear_location);
    this.storage.set('additional_address', number);
  

    this.navCtrl.push("SelectResponderPage", {
      sear_location: Sear_location,  number:number 
    });
    //console.log(Sear_location);
    //console.log(number);
    
  }


 

}



  // var postData = this.map1Form.value;

  // this.urlService.saveAddress(postData)
  // .subscribe(res => {
  //  this.map_collection = res;
  //     if (res.status=='OK') {
  //      }
  // }, (err) => {
  //     console.log(err);
  // });

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


            // infowindow.setContent(marrkerCivilian.title);
       // document.getElementById('infowindow-content').innerHTML = infowindow.content;
        
         
        // infowindow.open(that.map, marrkerCivilian);
        // document.getElementById('infowindow-content').innerHTML = this.infowindow.setConten;


        // var geocodr = new google.maps.Geocoder();
        // markerCivilian.addListener('dragend', function(event)  {
          
       //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
    //    geocodr.geocode({
    //       'latLng': event.latLng
    //       }, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //           if (results[0]) {
            
    //             this.adressess = results[0].formatted_address; 
              
    //             infowindow.setContent(this.adressess);
              
                

    //           }
    //         }
    //       });
    //   });
