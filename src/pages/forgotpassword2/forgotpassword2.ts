import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the Forgotpassword2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword2',
  templateUrl: 'forgotpassword2.html',
})
export class Forgotpassword2Page {
  Reset: FormGroup;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     private urlService: UrlbaseProvider,
     public alert: AlertsProvider,
     public menuCtrl: MenuController,
     private storage: Storage,



     ) {
      this.menuCtrl.enable(false);

    this.Reset = formBuilder.group({
      'verificationCode': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6) ])],//, Validators.maxLength(6)])],
      'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6) ])],//, Validators.maxLength(6)])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgotpassword2Page');
  }
  confirmChange () {
    
    var postData = this.Reset.value;

    this.storage.get('user_num').then((val) => {
      console.log('user_num db stuff');
      console.log(val);
      postData['phoneNumber']=val;
       if (postData.password!= postData.confirmPassword) {
      this.alert.presentAlert("Notification", 'Passwords must match and minimum 6 values');
      return;
    }
    this.urlService.confrmForgotPassword(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        this.alert.presentAlert("Notification", res.msg);
        if (res.status=='OK') {
          // this.storage.set('user_name', res.user_name);
          // this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          // this.navCtrl.setRoot('HomePage');
          this.navCtrl.setRoot('LoginPage')

    }
  }, (err) => {
         console.log(err);
  });
    });
   
  }
  goLogin(){
    this.navCtrl.setRoot('LoginPage')
  }

}
