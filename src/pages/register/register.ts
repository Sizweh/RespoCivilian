import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public storage: Storage,



    ) {

      this.menuCtrl.enable(false);
     

      this.registerForm = formBuilder.group({

        'fullName': ['', Validators.compose([Validators.required])],
        'phonenumber': ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]{11}")])],
        'email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
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
    hideShowPassword() {
    this.passwordType = this.passwordType === 'tel' ? 'password' : 'tel';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }


  
  goMedicalDetails(){

    const values = this.registerForm.value;
    this.storage.set('fullName', values.fullName);
    this.storage.set('email', values.email);
    this.storage.set('phonenumber', values.phonenumber);
    this.storage.set('password', values.password);

    this.navCtrl.push('MedicalDetailsPage');
  }







  }











































  







