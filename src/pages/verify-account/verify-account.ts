import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { MenuController } from 'ionic-angular';
// import { MainServiceProvider } from './../../providers/main-service/main-service'
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
    public http: HttpClient,
    public alert: AlertsProvider,
    private storage: Storage,
    public menuCtrl: MenuController,
    // public mainService: MainServiceProvider,
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
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      console.log(this.verificationCode.value);
      var postData = this.verificationCode.value;
      // this.http.post("http://03e873a6.ngrok.io/api/civilian/activateCivilian", postData)
    // this.http.post("http://46.101.169.33/api/civilian/activateCivilian", postData)
    this.http.post("http://127.0.0.1:8000/api/civilian/activateCivilian", postData)

      .subscribe(data => {
       console.log(data);
        var msg = data['msg'];
        var status = data['status'];
        const loader = this.loadingCtrl.create({
          content: "Checking code...",
          duration: 3000
        });
        loader.present();
        this.alert.presentAlert("Notification", msg);
        if (status == "OK") {
            //save user details
            this.storage.set('user_name', data['user_name']);
             this.storage.set('user_id', data['user_id']);

          this.navCtrl.push("HomePage");
        } else {
        }

       }, error => {
        console.log(error);
      });
  }

  }