import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the ShowdriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdrivers',
  templateUrl: 'showdrivers.html',
})
export class ShowdriversPage {
  allDrivers: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient,

    ) 
    {

          //oninit
          //api call to get all driver 
        // this.http.get("http://03e873a6.ngrok.io/api/civilian/showalldrivers", this.userDetails)//testing on devapp
        // this.http.get("http://46.101.169.33/api/civilian/showalldrivers", this.userDetails)
        this.http.get("http://127.0.0.1:8000/api/civilian/showalldrivers")
        .subscribe(data => {
          this.allDrivers = data;
        
          console.log(data);
          }, error => {
          console.log(error);
        });
    

    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdriversPage');
  }

}
