import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    ) {

      this.registerForm = formBuilder.group({
        'fullName': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
      
        'myDate': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        // 'Email': ['', Validators.compose([Validators.required])],
        'Email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],

        'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],

      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }

  goVerifyAccount(){
    this.navCtrl.push("VerifyAccountPage");
  }

}