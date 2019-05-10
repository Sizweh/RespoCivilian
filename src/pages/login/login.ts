import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { AuthProvider } from './../../providers/auth/auth'
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
// import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
// import { updateDate } from 'ionic-angular/umd/util/datetime-util';

// import { MainServiceProvider } from './../../providers/main-service/main-service'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  remembertoken: boolean;
  loginForm: FormGroup;
  playerId :any; 

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    // private http: HttpClient,
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,
    public auth: AuthProvider,
    private storage: Storage,
    public menuCtrl: MenuController,
    private urlService: UrlbaseProvider,
    // private mainService: MainServiceProvider,

    ) {
      this.menuCtrl.enable(false);

      this.loginForm = formBuilder.group({
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'password': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
      })
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  updateToken() {
    console.log('Remember token new state:' + this.remembertoken);
  }

  goLogin(){
   
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      console.log(this.loginForm.value);
      var postData = this.loginForm.value;


      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.login(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        // alert(res);ss
        this.alert.presentAlert("Notification", res.msg);

        if (res.status=='OK') {
          this.storage.set('user_name', res.user_name);
          this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });


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
  

  }


  goHome(){
    this.navCtrl.push("HomePage");
  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }

  goResetPassword(){
    this.navCtrl.push("ResetPasswordPage");
  }


}