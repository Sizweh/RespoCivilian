import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { MenuController } from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    
  resetPasswordForm: FormGroup;

  remembertoken: boolean;"0787463734"
  resetpasswordForm: FormGroup;

  numberType: string = 'number';
  numberIcon: string = 'eye-off';


  constructor(
    public alert: AlertsProvider,
    public navCtrl: NavController,  
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    public menuCtrl: MenuController,
    private storage: Storage,


    ) {
      this.menuCtrl.enable(false);


      this.resetPasswordForm = formBuilder.group({
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("")])],
      })
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }




  goForgotpassword2(){
    var postData = this.resetPasswordForm.value;

    this.urlService.requestNewPassword(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        // alert(res);ss
        this.alert.presentAlert("Notification", res.msg);

        if (res.status=='OK') {
          this.storage.set('user_num', this.resetPasswordForm.value.phoneNumber);
          alert(this.resetPasswordForm.value.phoneNumber);
          // this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          this.navCtrl.setRoot("Forgotpassword2Page");
        }
    }, (err) => {
        console.log(err);
    });

  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

}