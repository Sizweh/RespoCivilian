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
  allResponders: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    ) {
      this.urlService.showalldrivers()
              .subscribe(res => {
              console.log(res);
              this.allResponders = res;
            }, (err) => {
              console.log(err);
            });

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

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectResponderPage');
  }

  // goConfirm(responder){
  //   this.storage.set('selected_responder', responder);
  //   console.log(responder);
  //   this.navCtrl.push('LocationPage')
  // }


  
  goRequestElse(respo) {
       this.storage.set('selected_responder', respo);
   // console.log(respo);
    this.navCtrl.push('RequestElsePage')
  }
  
  goMaps(respo) {
    this.storage.set('selected_responder', respo);
   // console.log(respo);
    this.navCtrl.push('MapsPage')
  }
  

}
