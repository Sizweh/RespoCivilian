import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, UrlSerializer} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';



declare var google;


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {


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
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  zone: any;
  specify_emergency: any;
adressess: string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    ) {

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];


  }

  updateSearchResults(){
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
  // this.storage.get('specify_emergency').then((val) => {
  //   console.log('specify db stuff');
  //   console.log(val);
  //   this.specify_emergency = val;
  //   this.event = val.specify_emergency;
    
  // });

  // this.storage.get('specify_emergency').then((val) => {
  //   //  console.log(String(val));
  //   this.specify_emergency = val;
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


  function CoordMapType(tileSize) {
    this.tileSize = tileSize;
  }

  CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('div');
    div.innerHTML = coord;
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.fontSize = '10';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px';
    div.style.borderColor = '#AAAAAA';
    return div;
  };


  
  let that = this;
  
//intial map setup, if no geolaction available
 this.map = new google.maps.Map(document.getElementById('map'), {   
    zoom: 14,
    center: {lat:-29.856278, lng:31.028828},
    disableDefaultUI: true,






    
     styles: [{"stylers": [{ "saturation": -100 }]}]

  });
  
  // var trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(that.map);



  


  // this.map.overlayMapTypes.insertAt(
  //   0, new CoordMapType(new google.maps.Size(200, 200)));



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


      var  image = "../../assets/mapi/moving4.png";
      var markerCivilian;
      markerCivilian = new google.maps.Marker({
            position: pos,
            map: that.map,
            title: 'My location',
            draggable: true,
            icon:image,

          });

      
         var  image = "../../assets/mapi/fixed5.png";
      var markerr;
      markerr = new google.maps.Marker({
            position: {lat: -29.8587, lng:31.0218},
            map: that.map,
            title: 'location',
            draggable:false,
         icon:image,
          
          });
          




          

          
          google.maps.event.addListener(markerCivilian, 'click', (function(marker) {
            return function() {
              //console.log(this.adressess+'hhhhhhh');
         
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
        // google.maps.event.addListener(that.map, 'click', function(event) {
        //   geocoderr.geocode({
        //     'latLng': event.latLng
        //   }, function(results, status) {
        //     if (status == google.maps.GeocoderStatus.OK) {
        //       if (results[0]) {
        //         alert(results[0].formatted_address);
        //       }
        //     }
        //   });
        // });







        this.getAdressess ="ffffffffffffffffffffffffffffffffffffff";







  
          google.maps.event.addListener(markerr, 'click', (function(markerr) {
            return function() {
              infowindow.setContent('CCCCCCCCCCC');
              infowindow.open(that.map, markerr);
              // document.getElementById("emegencyButtons").style.display ='';



            //   geocoderr.geocode({
            // 'latLng': markerr.latLng
            // }, function(results, status) {
            //   if (status == google.maps.GeocoderStatus.OK) {
            //     if (results[0]) {
              
            //       this.adressess = results[0].formatted_address; 
            //       alert(  this.adressess);
                  

            //     }
            //   }
            // }); 
        
             }
          })(markerr));

          var geocoderr = new google.maps.Geocoder();
          markerr.addListener('dragend', function(event)  {
         //   alert(event.latLng.lat() + ' ' +  event.latLng.lng());
            geocoderr.geocode({
            'latLng': event.latLng
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
              
                  this.adressess = results[0].formatted_address; 
                  alert(  this.adressess);
                  

                }
              }
            });
        });
        google.maps.event.addListener(that.map, 'click', function(event) {
          geocoderr.geocode({
            'latLng': event.latLng
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                alert(results[0].formatted_address);
              }
            }

          });
        });
        

    

       





          
     
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
    console.log('ionViewDidLoad MapPage');

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
      'specify_emergency': this.event,
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
    this.navCtrl.push('LocationPage')

  }


 





}
