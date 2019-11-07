 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertsProvider } from './../../providers/alerts/alerts';

import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { UrlbaseProvider } from './../../providers/urlbase/urlbase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  remembertoken: boolean;
  loginForm: FormGroup;
  playerId :any; 
  username :any;
  user_id:any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  sideMenu: any;
 
  constructor(
   
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,

    private storage: Storage,
    public menuCtrl: MenuController,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController
 

    ) {
 
      this.menuCtrl.enable(false);
      this.menuCtrl.close();

      this.loginForm = formBuilder.group({
        'phoneNumber': [ Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]{11}")])],
        'password': ['',],
      })

  }

  

  tel='';

  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }
  


  ionViewDidEnter() {

this.menuCtrl.enable(false);
  this.menuCtrl.close();
    this.menuCtrl.swipeEnable(false);

   
  }




  ionViewDidLoad() {
   console.log('ionViewDidLoad LoginPage');



    this.storage.get('user_id').then((val) => {
 
     this.user_id = val;

     if(this.user_id === null)
     {

        
     }
     else{
     this.navCtrl.setRoot('HomePage');
     }
      

    });


  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'tel' ? 'password' : 'tel';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  goHome(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

      var postData = this.loginForm.value;
      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.login(postData)
    .subscribe(res => {
        this.alert.presentAlert("Notification", res.msg);
        if (res.status=='OK') {
          this.storage.set('user_name', res.user_name);
          this.storage.set('user_id', res.user_id);
          this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
     
    });

  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }


  goResetPassword(){
    this.navCtrl.push("ResetPasswordPage");
  }



 

}








