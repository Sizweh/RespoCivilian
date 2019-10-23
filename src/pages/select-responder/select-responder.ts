import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


@IonicPage()
@Component({
  selector: 'page-select-responder',
  templateUrl: 'select-responder.html',
})
export class SelectResponderPage {
  allResponders: any[];
  additional_address: any;
  address: any;
  address_loacation: any;
  responder_positions :any[]=[];
  allResponders_Distance : any[]=[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    ) {

      let lat = 0;
      let long =0;
      this.storage.get('Latitude').then(lt => lat=lt);
      this.storage.get('Longitude').then(lg => long=lg);


      this.urlService.showalldrivers()
              .subscribe(res => {
              console.log(res);
              this.allResponders = res;

              res.forEach((responder, i)=>{

                console.log(responder);

                //radians
                let lat1 = (lat * 2.0 * Math.PI) / 60.0 / 360.0;      
                let long1 = (long * 2.0 * Math.PI) / 60.0 / 360.0;    
                let lat2 = (parseFloat(responder.lat) * 2.0 * Math.PI) / 60.0 / 360.0;   
                let long2 = (parseFloat(responder.lng) * 2.0 * Math.PI) / 60.0 / 360.0;

                // use to different earth axis length    
                var a = 6378137.0;        // Earth Major Axis (WGS84)    
                var b = 6356752.3142;     // Minor Axis    
                var f = (a-b) / a;        // "Flattening"    
                var e = 2.0*f - f*f;      // "Eccentricity"

                var beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));    
                var cos = Math.cos( lat1 );    
                var x = beta * cos * Math.cos( long1 );    
                var y = beta * cos * Math.sin( long1 );    
                var z = beta * ( 1 - e ) * Math.sin( lat1 );


                beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));    
                cos = Math.cos( lat2 );   
                x -= (beta * cos * Math.cos( long2 ));    
                y -= (beta * cos * Math.sin( long2 ));    
                z -= (beta * (1 - e) * Math.sin( lat2 ));

                var dist = (Math.sqrt( (x*x) + (y*y) + (z*z) )/1000)*100;


                let r_loc ={

                  company_name: responder.company.company_name,
                  distance: dist.toString().substr(0,5)

                };

                let newRes = {
                  company: responder.company,
                  company_id: responder.company_id,
                  id: responder.id,
                  distance: dist.toString().substr(0,5)
                }

                this.allResponders_Distance[i]=newRes;

                this.responder_positions[i]=r_loc;

              });


            }, (err) => {
              console.log(err);
            });


          this.address_loacation = navParams.get('sear_location');
          this.additional_address = navParams.get('number');


            this.storage.get('additional_address').then((val) => {
              this.additional_address = val;
            });
            this.storage.get('address').then((val) => {
              this.address = val;
            });


     
  }


  sortArray(){
    let newArr:any[] = [];

    
    
    this.allResponders_Distance.forEach((itm,i)=>{
      console.log("++++++++++++Sorting++++++++++++")
      console.log(itm.distance);

    let num = [];
    num[i]=itm.distance;
    newArr.concat(num);

    });

    
    console.log("++++++++++++Printing new array++++++++++");
    console.log(newArr);
  }


  ionViewDidLoad() {

    
    
    console.log('+++++Printing old array+++++++++++');
    console.log(this.allResponders_Distance);
    this.sortArray();
  }


  
  goRequestElse(respo) {
       this.storage.set('selected_responder', respo);
   // console.log(respo);
    this.navCtrl.push('RequestElsePage')
  }
  goMaps() {
    this.navCtrl.setRoot("MapsPage")
  }
  
  goLocation(respo) {
    this.storage.set('selected_responder', respo);
   // console.log(respo);
    this.navCtrl.push('LocationPage')
  }
  

}



       //oninit
          //api call to get all driver 
        // this.http.get("http://03e873a6.ngrok.io/api/civilian/showalldrivers", this.userDetails)//testing on devapp
         //this.http.get("http://46.101.169.33/api/civilian/showalldrivers", this.userDetails)
  //        this.http.get("http://46.101.169.33/api/civilian/showalldrivers")
  //     .subscribe(data => {
  //       this.allResponders = data;
      
  //       console.log(data);
  //       }, error => {
  //       console.log(error);
  //     });
