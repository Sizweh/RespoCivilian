import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
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
  password:AbstractControl;
  fullName:AbstractControl;
  email:AbstractControl;
  phonenumber:AbstractControl;
  civsurname:AbstractControl;

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
        'civsurname': ['', Validators.compose([Validators.required])],
        'phonenumber': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     
      })

      this.password = this.registerForm.controls['password'];
      this.fullName = this.registerForm.controls['fullName'];
      this.email = this.registerForm.controls['email'];
      this.phonenumber = this.registerForm.controls['phonenumber'];
      this.civsurname = this.registerForm.controls['civsurname'];

   
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

  goNextofkin(){
    this.navCtrl.push('NextofkinPage');
  }
  
  goMedicalDetails(){

    const values = this.registerForm.value;
    this.storage.set('fullName', values.fullName);
    this.storage.set('civsurname', values.civsurname);
    this.storage.set('email', values.email);
    this.storage.set('phonenumber', values.phonenumber);
    this.storage.set('password', values.password);


    this.navCtrl.push('MedicalDetailsPage');
  }







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
























  







