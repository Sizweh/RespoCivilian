import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormBuilder, FormGroup } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-my-locations',
  templateUrl: 'my-locations.html',
})
export class MyLocationsPage {
  address: any;
  L: any;
  Ln: any;
  additional_address: any;
  username: any;
  lat: any;
  lng: any;
  User_Id: any;
  location_collection: any;
  addressType: any;
  description: any;
  map1Form: FormGroup;
  id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    ) {

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;

      this.map1Form = formBuilder.group({

        'user_id': [this.User_Id,],
        'address': ['', ],
        'addressType': ['',],
      })


      this.storage.get('address').then((Sear_location) => {
        this.storage.get('lat').then((L) => {
          this.storage.get('lng').then((Ln) => {
          this.storage.get('addressType').then((addressType) => {
            this.urlService.viewMyLocation({'lat':L,'lng':Ln,'address':Sear_location, 'user_id':this.User_Id, 'addressType':addressType})
            .subscribe(res => {
              this.location_collection = res;
              if (status == "error") {
          /////////////////////////////
              }
              if (status == "OK") {
            ////////////////////////
              }
              }, (err) => {
            });
            });
          });
        });
      });

      
  }

  // ionViewDidEnter() {
  //   //console.log('ionViewDidLoad MyLocationsPage');

  //         this.storage.get('address').then((Sear_location) => {
  //         this.storage.get('lat').then((L) => {
  //           this.storage.get('lng').then((Ln) => {
  //           this.storage.get('addressType').then((addressType) => {
  //             this.urlService.viewMyLocation({'lat':L,'lng':Ln,'address':Sear_location, 'user_id':this.User_Id, 'addressType':addressType})
  //             .subscribe(res => {
  //               this.location_collection = res;
  //               if (status == "error") {
  //           /////////////////////////////
  //               }
  //               if (status == "OK") {
  //             ////////////////////////
  //               }
  //               }, (err) => {
  //             });
  //             });
  //           });
  //         });
  //       });



  // }




  goHome(id){
    

    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: '',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            
var headers = new Headers();
headers.append("Accept", 'application/json');
headers.append('Content-Type', 'application/json' );

var postData = { id:id }
// var postData = this.skinForm.value;
  this.urlService.deleteLocations(postData)
  .subscribe(res => {
   this.location_collection = res;
      if (res.status=='OK') {
       }
  }, (err) => {
      console.log(err);
  });

  let toast = this.toastCtrl.create({
    message: 'Location deleted successfully.',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  toast.present();
            this.navCtrl.setRoot('MyLocationsPage', {
              id:id,
              user_id:this.User_Id,
            
}); 
            
    
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }


  goAddress(){
    this.storage.get('user_id').then((result) => {

      this.navCtrl.push("AddressPage", {
        user_id:result,
      });
    });    
  }

  

  goAddHistory(id,user_id){    
    this.navCtrl.push("AddHistoryPage", {
      data: id,
      user_id:user_id
    });
 
    }

}
