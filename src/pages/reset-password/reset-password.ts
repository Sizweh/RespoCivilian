import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    
  resetPasswordForm: FormGroup;

  user_id: any;
  id: any;


  constructor(
    public navCtrl: NavController,  
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    ) {

      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.user_id = String(val);  
      });

      this.storage.get('id').then((val) => {
        console.log(String(val));
        this.id = String(val);  
      });

      this.resetPasswordForm = formBuilder.group({
        'email': ['',],
      
      })
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }


  goForgotpassword2(){
    const value = this.resetPasswordForm.value;

    this.storage.set('email', value.email);
   
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    var postData = this.resetPasswordForm.value;
    //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.reset(postData)
      .subscribe(res => {
        console.log(res);
        if (res.status == 'OK' ) {
        }
      }, (err) => {
        console.log(err);
      });

   this.navCtrl.setRoot("Forgotpassword2Page");

  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

}