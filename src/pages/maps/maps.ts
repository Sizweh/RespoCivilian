import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, UrlSerializer} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    ) {

      
      this.map1Form = formBuilder.group({
        'map1': ['',],
       
      })
      this.map2Form = formBuilder.group({
        'map2': ['',],
     
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
      zoom: 15,
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
 

   
        var input = document.getElementById('pac-input');
      

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', that.map);

        autocomplete.setFields(
          ['address_components', 'geometry', 'icon', 'name']);

      // var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      // infowindow.setContent();

      var  image = "http://46.101.169.33/icons/moving4.png";
      var marker = new google.maps.Marker({
        map: that.map,
        anchorPoint: new google.maps.Point(0, -29),
         draggable: true,
        icon:image,
        animation: google.maps.Animation.DROP

      });
      
      marker.addListener('click', toggleBounce);
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }


      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        

        // var  test = document.getElementById('infowindow-content');

        var geocodr = new google.maps.Geocoder();
        
       
        marker.addListener('dragend', function(event)  {
            
       //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
       geocodr.geocode({
          'latLng': event.latLng
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                
            
                this.adressess = results[0].formatted_address; 
              
                infowindow.setContent(this.adressess);
                document.getElementById('infowindow-content').innerHTML = this.adressess ;
               
                  this.Adressess = this.adressess;  
            

              }
            }
          });
      });

       
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
        document.getElementById('infowindow-content').innerHTML =address;

        var inputValue = (<HTMLInputElement>document.getElementById('pac-input')).value;
        inputValue = "";
       

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
      //  marrkerCivilian.setVisible(false)
       //   this.init() ; 

        //  infowindow.open(that.map, marker);
        //infowindow.setContent(address);
       // document.getElementById('infowindow-content').innerHTML = "dsjfkjlkjslkjflkjsdlkjflksjl";
        
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




function init(){
   
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
       
        var  image = "http://46.101.169.33/icons/fixed5.png";
        var markerCivilian;
        markerCivilian = new google.maps.Marker({
          position: pos,
          map: that.map,
           
          draggable: false,
          icon:image,
          animation: google.maps.Animation.DROP
        });



        var geocoder  = new google.maps.Geocoder();  
        var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
        
        
        geocoder.geocode({'latLng': location}, function (results, status) {
          if(status == google.maps.GeocoderStatus.OK) {           
          var add=results[0].formatted_address;         
          document.getElementById('infowindow-content').innerText = add;
          }
          });

        var geocodr = new google.maps.Geocoder();
        that.infoWindow.open(that.map);
        that.map.setCenter(pos);

      }, function () {
        this.handleLocationError(true, that.infoWindow, this.map.getCenter(), that.map);
      });
 
    
  }
}
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

      
        //marker for user/civilian location
       
        var  image = "http://46.101.169.33/icons/fixed5.png";
        var markerCivilian;
        markerCivilian = new google.maps.Marker({
          position: pos,
          map: that.map,
           
          draggable: false,
          icon:image,
          animation: google.maps.Animation.DROP
        });

        // var infowindow = new google.maps.InfoWindow();
        // infowindow.setContent('My Location');



        
        var  image = "http://46.101.169.33/icons/moving4.png";
        var marrkerCivilian;
        marrkerCivilian = new google.maps.Marker({
          position: pos,
       
          map: that.map,
          title: 'My location',
          draggable: true,
          icon:image,
          animation: google.maps.Animation.DROP,
       
        });
        
        
        var geocoder  = new google.maps.Geocoder();  
        var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
        
        
        geocoder.geocode({'latLng': location}, function (results, status) {
          if(status == google.maps.GeocoderStatus.OK) {           
          var add=results[0].formatted_address;         
          document.getElementById('infowindow-content').innerText = add;
          }
          });

        var geocodr = new google.maps.Geocoder();
    
        marrkerCivilian.addListener('dragend', function(event)  {

        geocodr.geocode({
          'latLng': event.latLng
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                
            
                this.adressess = results[0].formatted_address; 
              
                infowindow.setContent(this.adressess);
                document.getElementById('infowindow-content').innerHTML = this.adressess ;
                // document.getElementById('infowindow-content').innerHTML = event.latLng ;
               

                this.Adressess = this.adressess; 

              }
            }
          });
      });



      marrkerCivilian.addListener('click', toggleBounce);
        function toggleBounce() {
          if (marrkerCivilian.getAnimation() !== null) {
            marrkerCivilian.setAnimation(null);
          } else {
            
            marrkerCivilian.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(marrkerCivilian.title);
       // document.getElementById('infowindow-content').innerHTML = infowindow.content;
        
         
        infowindow.open(that.map, marrkerCivilian);
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
    console.log('ionViewDidLoad MapsPage');
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
goLocation(){
  
  
  const value = this.map1Form.value;

  this.storage.set('map1', value.map1);

  // const value = this.map2Form.value;

  // this.storage.set('map2', value.map2);

  var  Sear_location = document.getElementById('infowindow-content').innerText;
  
  this.navCtrl.setRoot("LocationPage", {
       sear_location:Sear_location,
  
 });


}


 





}
