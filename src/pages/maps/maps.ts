import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation, } from '@ionic-native/geolocation';




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
userDetails: any;
selectedResponder      : any; 
responderName: any;
GoogleAutocomplete: any;
autocomplete: { input: string; };
autocompleteItems: any[];
zone: any;
Adressess: any;
map1Form: FormGroup;
map2Form: FormGroup;
map_collection: any;
additional_address : any ; 
enableHighAccuracy:any;
geoLatitude: number;
geoLongitude: number;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
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
  
    
 
    this.storage.get('user_id').then((val) => {
      this.civilianId = val;
    });

    let that = this;



    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16.4,
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


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      

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
          map: that.map,
          position: pos,
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
        autocomplete.addListener('place_changed', function () {
          infowindow.close();


          var geocodr = new google.maps.Geocoder();
          marrkerCivilian.addListener('dragend', function (event) {
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
            that.map.setZoom(12);

          }
          var latcoords = place.geometry.location.lat().toFixed(6);
          var lngcoords = place.geometry.location.lng().toFixed(6);
          var z = document.getElementById('getaccuracy')
          var display = (`<b>Your GPS coordinates:</b>`);
              z.innerHTML = display;
          
          let L = document.getElementById('getLat')
          let Ln = document.getElementById('getLong')
              L.innerHTML = latcoords;
              Ln.innerHTML = lngcoords;
          
      
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
          console.log(latcoords);
          console.log(lngcoords);


          
          document.getElementById('infowindow-content').innerHTML = address;

          var inputValue = (<HTMLInputElement>document.getElementById('pac-input')).value;

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;

    
  });

var infowindowContent = document.getElementById('infowindow-content');

var infowindow = new google.maps.InfoWindow();
infowindow.setContent(markerCivilian.title);
infowindow.open(that.map, markerCivilian );


var geocoder = new google.maps.Geocoder();
var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

var lat = position.coords.longitude;
console.log(lat);


geocoder.geocode({'latLng':location}, function (results, status) {
if(status == google.maps.GeocoderStatus.OK){

  var ADD = results [0].formatted_address;
  let AD = document.getElementById('infowindow-content')
  AD.innerText = ADD;
  console.log(position.coords.latitude);
}

});
console.log();
        var geocodrr = new google.maps.Geocoder();

        marrkerCivilian.addListener('dragend', function (event) {
       
        var lat = event.latLng.lat().toFixed(6);
        var longg = event.latLng.lng().toFixed(6);
        var run  = (`<b>Your GPS coordinates:</b>`);
        var u = document.getElementById('getaccuracy')
            u.innerHTML = run;

                  
        let L = document.getElementById('getLat')
        let Ln = document.getElementById('getLong')
        L.innerHTML = lat;
        Ln.innerHTML = longg;
       console.log(lat);
       console.log(longg);

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


        var infowindow = new google.maps.InfoWindow();
        that.infoWindow.open(that.map);
        that.map.setCenter(markerCivilian,marrkerCivilian);
      }, function () {
        this.handleLocationError(true, that.infoWindow, this.map.getCenter(), that.map);
      });
    } else {
  
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


  let option = {
   enableHighAccuracy:true,
   maximumAge: 100,
   timeout:3000
  };

    this.geolocation.getCurrentPosition(option).then((data)=>{
    this.geoLatitude = data.coords.latitude;
    this.geoLongitude = data.coords.longitude;
    this.enableHighAccuracy =  data.coords.accuracy ;

        let RoundedLat = this.geoLatitude.toFixed(6);
        let RoundedLng = this.geoLongitude.toFixed(6);
        var x = document.getElementById('getaccuracy');
        var GPS = (`<b>Your GPS coordinates:</b>`);
        x.innerHTML = GPS;
      
          
        let L = document.getElementById('getLat');
        let Ln = document.getElementById('getLong');
        L.innerHTML = RoundedLat;
        Ln.innerHTML = RoundedLng;
       

        console.log(RoundedLat);

        console.log(RoundedLng);
        
        
    }); 

 console.log('ionViewDidLoad MapsPage');
}



goHome(){
this.navCtrl.setRoot('HomePage')
}

goSelectResponder() {

    var Sear_location = document.getElementById('infowindow-content').innerText;
    var number = (<HTMLInputElement>document.getElementById("add")).value;

    var L = document.getElementById('getLat').innerHTML
    let Ln = document.getElementById('getLong').innerHTML

    this.storage.set('lat',L);
    this.storage.set('lng',Ln);

    this.storage.set('address', Sear_location);
    this.storage.set('additional_address', number);

    this.navCtrl.push("SelectResponderPage", {
      sear_location: Sear_location,  number:number 
    });

    
  }


 

}


