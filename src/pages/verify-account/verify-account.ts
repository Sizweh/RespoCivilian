import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

     ) {

      this.verificationCode = formBuilder.group({
        'verificationCode': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyAccountPage');
  }

  verifyCode(){ ///<-- call this function straight with static button in html
    let alert = this.alertCtrl.create({
      title: 'Verification ',
      message: 'Code Verified Succesfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push("LoginPage");
           }
                }
      ]
    });
    alert.present();

      const loader = this.loadingCtrl.create({
        content: "Checking code...",
        duration: 3000
      });
      loader.present();
    }

  }