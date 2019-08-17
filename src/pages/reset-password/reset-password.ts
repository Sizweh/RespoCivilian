import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  numberType: string = 'number';
  numberIcon: string = 'eye-off';


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

      this.resetPasswordForm = formBuilder.group({
        'email': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("")])],
        // 'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern("")])],
      })
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }


  goForgotpassword2(){



    const value = this.resetPasswordForm.value;

    this.storage.set('email', value.email);
    // this.storage.set('password', value.password);


    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    //  const requestOptions = new RequestOptions({ headers: headers });


   // pass to back-end
    console.log(this.resetPasswordForm.value);
    var postData = this.resetPasswordForm.value;

    // postData['user_role']=  "Civilian";

    //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.reset(postData)
      .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        // alert(res);
         // this.alert.presentAlert("Notification", res.msg);

        if (res.status == 'OK' ) {
            
          // this.navCtrl.push("VerifyAccountPage");
          // this.navCtrl.push("Forgotpassword2Page");
        }
      }, (err) => {
        console.log(err);
      });

   // this.navCtrl.setRoot("Forgotpassword2Page");

  }

  goLogin(){

    this.navCtrl.push("LoginPage");
  }

}