import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  
  UserId :any;
  id :any;
  User_Id :any;
  toConcat:any;
  passwordForm: FormGroup;
  password_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private urlService: UrlbaseProvider,

    ) {
      
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
  
   
      this.passwordForm = formBuilder.group({

        'user_id': [this.User_Id,],
        'id': [this.id,],
  

        'password': ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
        'new_password': ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.maxLength(6) ])],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');


  //   var postData = this.passwordForm.value;

  //   //THIS IS A BETTER WAY TO MAKE API CALLS
  // this.urlService.password(postData)
  // .subscribe(res => {
  //     // this.presentToast(res.msg, res.status);
  //    // console.log(res.id);
  //     //console.log(res.drop_off);
  //    //// this.alert.presentAlert("Notification", res.msg);
  //  this.password_collection = res;
  //     if (res.status=='OK') {
  //   //    this.storage.set('user_name', res.user_name);
  //     //  this.storage.set('user_id', res.user_id);
  //       // localStorage.setItem('token', res.token);
  //       //this.navCtrl.setRoot('HomePage');
  //      }
  // }, (err) => {
  //     console.log(err);
  // });


  }

  goMyprofile(){

    const values = this.passwordForm.value;

    this.storage.set('password', values.password);
    this.storage.set('new_password', values.new_password);
    this.storage.set('confirmPassword', values.confirmPassword);


    var postData = this.passwordForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.changePassword(postData)
  .subscribe(res => {
  //     // this.presentToast(res.msg, res.status);
  //    // console.log(res.id);
  //     //console.log(res.drop_off);
  //    //// this.alert.presentAlert("Notification", res.msg);
   this.password_collection = res;
      if (res.status=='OK') {
  //   //    this.storage.set('user_name', res.user_name);
  //     //  this.storage.set('user_id', res.user_id);
  //       // localStorage.setItem('token', res.token);
  //       //this.navCtrl.setRoot('HomePage');
        }
  }, (err) => {
      console.log(err);
  });


  let toast = this.toastCtrl.create({
    message: 'Password edited successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();


    const loading= this.loadingCtrl.create({
      content: "saving...",
      duration: 700
    });
    loading.present();
    // this.navCtrl.setRoot('MyprofilePage')
  
    }

}
