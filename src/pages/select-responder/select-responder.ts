import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectResponderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private http: HttpClient,
    private storage: Storage,


    ) {
       //oninit
          //api call to get all driver 
        // this.http.get("http://03e873a6.ngrok.io/api/civilian/showalldrivers", this.userDetails)//testing on devapp
        // this.http.get("http://46.101.169.33/api/civilian/showalldrivers", this.userDetails)
      this.http.get("http://127.0.0.1:8000/api/civilian/showalldrivers")
      .subscribe(data => {
        this.allResponders = data;
      
        console.log(data);
        }, error => {
        console.log(error);
      });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectResponderPage');
  }
  goConfirm(responder){
    this.storage.set('selected_responder', responder);
    console.log(responder);
    this.navCtrl.push('LocationPage')
  }
  

}
