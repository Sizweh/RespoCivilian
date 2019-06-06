import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
/**
 * Generated class for the RequestElsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-else',
  templateUrl: 'request-else.html',
})
export class RequestElsePage {

  oneResponder: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    ) {

      this.urlService.showalldrivers()
      .subscribe(res => {
      console.log(res);
      this.oneResponder = res;
    }, (err) => {
      console.log(err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestElsePage');
  }




  goConfirm(responder){
    this.storage.set('selected_responder', responder);
    console.log(responder);
    this.navCtrl.push('LocationPage')
  }


}
