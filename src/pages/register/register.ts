import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { HttpClient } from '@angular/common/http';
import { MenuController } from 'ionic-angular';
// import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { Storage } from '@ionic/storage';

import { AlertController } from 'ionic-angular';
import { NextOfKinPage } from '../next-of-kin/next-of-kin';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  NextOfKinPage: NextOfKinPage ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,
    public http: HttpClient,
    public menuCtrl: MenuController,
    // private urlService: UrlbaseProvider,
    public storage: Storage,
    public alertCtrl: AlertController

    ) {

      this.menuCtrl.enable(false);
     

      this.registerForm = formBuilder.group({
        'fullName': ['', Validators.compose([Validators.required])],
        // 'gender': ['', Validators.compose([Validators.required])],
        // 'myDate': ['', Validators.compose([Validators.required])],
        'phonenumber': ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]{11}")])],
        'email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        // 'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6) ])],
      })
   
  }
  phone='';

  convert(){
    if(this.phone.substr(0,1)==='0'){
      this.phone='27'+this.phone.substr(1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

   
  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

  goNextofkin(){
    this.navCtrl.push('NextofkinPage');
  }
  
  goMedicalDetails(){

    // const confirm = this.alertCtrl.create({
    //   title: 'Are you on medical aid?',
    //   message: '',
    //   buttons: [
    //     {
    //       text: 'Yes',
    //       handler: () => {
    //         this.storage.set('Medical_Aid_Status', 'Yes');
    //         console.log('Agree clicked');  
    //       }
    //     },
    //     {
    //       text: 'No',
    //       handler: () => {
    //         this.storage.set('Medical_Aid_Status', 'No');
    //         console.log('Disagree clicked');
    //         this.navCtrl.push('NextOfKinPage');
    //       }
    //     }
    //   ]
    // });
    // confirm.present();

    const values = this.registerForm.value;
   
    // this.storage.set('student_no', values.student_no);
    // this.storage.set('org_name', values.org_name);
    this.storage.set('fullName', values.fullName);
    // this.storage.set('gender', values.gender);
    // this.storage.set('myDate', values.myDate);
    this.storage.set('email', values.email);
    this.storage.set('phonenumber', values.phonenumber);
    this.storage.set('password', values.password);
    // this.storage.set('confirmPassword', values.confirmPassword);


    this.navCtrl.push('MedicalDetailsPage');
  }

   // var headers = new Headers();
    //headers.append("Accept", 'application/json');
    //headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      //console.log(this.registerForm.value);
      //var postData = this.registerForm.value;


      //THIS IS A BETTER WAY TO MAKE API CALLS
    //this.urlService.register(this.Userdata)
    //.subscribe(res => {
        // this.presentToast(res.msg, res.status);
        //console.log(res);
        // alert(res);ss
        //this.alert.presentAlert("Notification", res.msg);

        //if (res.status=='OK') {
     
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('VerifyAccountPage');
        //}
    //}, (err) => {
        //console.log(err);
    //}//);



  //    this.http.post("http://46.101.169.33/api/civilian/registerCivilian", postData)
   
  //     .subscribe(data => {
  //      console.log(data);
  //       // alert("Done")
  //       var msg = data['msg'];
  //       var status = data['status'];
  //       if (status == "OK") {
  //         this.alert.presentAlert("Notification", msg);
  //         this.navCtrl.push("VerifyAccountPage");
  //        } //else {
  //       //   this.alert.presentAlert("Whoops!", 'User Taken');
  //       // }

  //      }, error => {
  //       console.log(error);
  //     });




    // console.log(this.chronicDisease);





  }



























  







