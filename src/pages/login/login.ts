 import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';

import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { NextOfKinPage } from '../next-of-kin/next-of-kin';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
// import { updateDate } from 'ionic-angular/umd/util/datetime-util';

// import { MainServiceProvider } from './../../providers/main-service/main-service'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  NextOfKinPage: NextOfKinPage ;

  remembertoken: boolean;
  loginForm: FormGroup;
  playerId :any; 
  username :any;
  user_id:any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  sideMenu: any;
 
  constructor(
    // private http: HttpClient,
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,

    private storage: Storage,
    public menuCtrl: MenuController,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController
    // private mainService: MainServiceProvider,

    ) {
 
      this.menuCtrl.enable(false);
      this.menuCtrl.close();

      this.loginForm = formBuilder.group({
        'phoneNumber': [ Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]{11}")])],
        'password': ['',],
      })

  }

  // Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])

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

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }




  ionViewDidLoad() {
   console.log('ionViewDidLoad LoginPage');

  // this.menu.close();


    this.storage.get('user_id').then((val) => {
      //console.log('cater db stuff');
     //console.log(val);
     this.user_id = val;
     //console.log("note  login" + this.user_id)
     if(this.user_id === null)
     {
      // console.log("Note  login")
        
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
  updateToken() {
    //console.log('Remember token new state:' + this.remembertoken);
  }

  goHome(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   //pass to back-end

      //console.log(this.loginForm.value);
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
       // console.log(err);
    });

  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }


  goResetPassword(){
    this.navCtrl.push("ResetPasswordPage");
  }



 

}









    //END API CALL
      // this.http.post("http://03e873a6.ngrok.io/api/civilian/loginCivilian", postData)
    // this.http.post("http://46.101.169.33/api/civilian/loginCivilian", postData)

    // this.mainService.login(postData) //need to do smething like this
       

    //     var msg = data['msg'];
    //     var status = data['status'];
    //     if (status == "OK") {
    //       this.alert.presentAlert("Notification", msg);

    //        //save user details
           
    //          this.storage.set('user_name', data['user_name']);
    //          this.storage.set('user_id', data['user_id']);

    //         //  console.log(this.auth.userDetails);
    //         // this.auth.userDetails = data['user_name'];
          

    //       this.navCtrl.push("HomePage");
    //     } else {
    //       this.alert.presentAlert("Please try again.", msg);
    //     }

    //    }, error => {
    //     console.log(error);
    //   });
  