import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  remembertoken: boolean;
  loginForm: FormGroup;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private _menuCtrl: MenuController
    ) {

      this.loginForm = formBuilder.group({
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)])],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'tel' ? 'password' : 'tel';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  updateToken() {
    console.log('Remember token new state:' + this.remembertoken);
  }

  public isOnline: boolean = false;
  updateDriverOnlineStatus($event) {
    this.isOnline = !this.isOnline;
  }

  goLogin(){
    // this.navCtrl.push("HomePage");
    this.navCtrl.setRoot("HomePage");
   this._menuCtrl.swipeEnable(false);
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