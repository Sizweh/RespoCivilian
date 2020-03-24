import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {
  alerts_collection: any;

  constructor(public navCtrl: NavController,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');

    this.urlService.alerts() 
    .subscribe(res => {
      this.alerts_collection = res;
      if (res.status=='ok'){
       
      }

    })
  }

}
