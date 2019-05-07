import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertsProvider } from './../../providers/alerts/alerts';
import { HttpClient } from '@angular/common/http';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,
    public http: HttpClient,
    public menuCtrl: MenuController,

    ) {
      this.menuCtrl.enable(false);

      this.registerForm = formBuilder.group({
        'fullName': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
      
        'myDate': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        // 'Email': '',//['', Validators.compose([Validators.required])],
        'Email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],

        'password': ['', Validators.compose([Validators.required, Validators.minLength(6) ])],//, Validators.maxLength(6)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6) ])],//, Validators.maxLength(6)])],

      })
      // this.registerForm.valid.;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

  goVerifyAccount(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      // console.log(this.registerForm.value);
      var postData = this.registerForm.value;
      if (postData.password!= postData.confirmPassword) {
        this.alert.presentAlert("Notification", 'Passwords must match and minimum 6 values');
        return;
      }
      postData['user_role']=  "Civilian";
     this.http.post("http://46.101.169.33/api/civilian/registerCivilian", postData)
   
      .subscribe(data => {
       console.log(data);
        // alert("Done")
        var msg = data['msg'];
        var status = data['status'];
        if (status == "OK") {
          this.alert.presentAlert("Notification", msg);
          this.navCtrl.push("VerifyAccountPage");
         } //else {
        //   this.alert.presentAlert("Whoops!", 'User Taken');
        // }

       }, error => {
        console.log(error);
      });
  }

}