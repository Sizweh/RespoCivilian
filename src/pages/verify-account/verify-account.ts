import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { MenuController } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


@IonicPage()
@Component({
  selector: 'page-verify-account',
  templateUrl: 'verify-account.html',
})
export class VerifyAccountPage {

  verificationCode: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public alert: AlertsProvider,
    private storage: Storage,
    public menuCtrl: MenuController,
    private urlService: UrlbaseProvider,

     ) {
      this.menuCtrl.enable(false);
      this.verificationCode = formBuilder.group({
        'verificationCode': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyAccountPage');
  }

  verifyCode(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

   
   //pass to back-end
      console.log(this.verificationCode.value);
      var postData = this.verificationCode.value;

      this.urlService.activate(postData)
      .subscribe(res => {
  
      console.log(res);
      const loader = this.loadingCtrl.create({
        content: "Checking code...",
        duration: 3000
      });
      loader.present();      
      
      this.alert.presentAlert("Notification", res.msg);
      if (res.status=='OK') {
        this.storage.set('user_name', res.user_name);
        this.storage.set('user_id', res.user_id);
        this.navCtrl.setRoot('HomePage');
      }
    }, (err) => {
      console.log(err);
    });
    
   
  }

  }