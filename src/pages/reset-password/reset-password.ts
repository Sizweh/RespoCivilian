import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
    public navCtrl: NavController,  
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {

      this.resetPasswordForm = formBuilder.group({
        'email': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("")])],
      })
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }




  goForgotpassword2(){
    this.navCtrl.setRoot("Forgotpassword2Page");

  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

}