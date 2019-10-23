import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';


@IonicPage()
@Component({
  selector: 'page-next-of-kin',
  templateUrl: 'next-of-kin.html',
})
export class NextOfKinPage {
  remembertoken: boolean;

  nextofkinForm: FormGroup;
  nextofkin2Form : FormGroup;
  registerForm: FormGroup;

  UserId :any;
  Userdata: any;

  fullName:any;
  gender:any;
  myDate:any;
  phonenumber:any;
  email:any;
  password:any;
  confirmPassword:any;


  partial_membership:any;
  member_no:any;
  scheme_name:any;
  prefered_hospital:any;
  chronic_dis:any;
  disability:any;
  Medical_Aid_Status:any;

  phone:any;
  relationship:any;
  name:any;
  surname:any;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController,
    ) {

      this.nextofkinForm = formBuilder.group({

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],


        // 'paymentBrand': ['',Validators.compose([Validators.required])],
        // 'cardHolder': ['', Validators.compose([Validators.required])],
        // 'cardNo': ['', Validators.compose([Validators.required])],
        // //'cardNo': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        // 'expiryMonth': ['', Validators.compose([Validators.required])],
        // 'expiryYear': ['', Validators.compose([Validators.required])],
        // 'CVV': ['', Validators.compose([Validators.required])],
       // 'code': ['', Validators.compose([Validators.required])],
        // 'remembertoken': ['', Validators.compose([Validators.required])],
    
      })
  
  }

  tel='';

  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }

  updateToken() {
    console.log('Remember token new state:' + this.remembertoken);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextOfKinPage');


    /////////////////register//////////////////

    this.storage.get('fullName').then((val) => {
      //  console.log(String(val));
      this.fullName = val;
    });
    this.storage.get('email').then((val) => {
      //  console.log(String(val));
      this.email = val;
    });
    this.storage.get('phonenumber').then((val) => {
      //  console.log(String(val));
      this.phonenumber = val;
    });
    this.storage.get('password').then((val) => {
      //  console.log(String(val));
      this.password = val;
    });
    this.storage.get('confirmPassword').then((val) => {
      //  console.log(String(val));
      this.confirmPassword = val;
    });
     // this.storage.get('gender').then((val) => {
    //   //  console.log(String(val));
    //   this.gender = val;
    // });
    // this.storage.get('myDate').then((val) => {
    //   //  console.log(String(val));
    //   this.myDate = val;
    // });
    //////////////////medical////////////////////////
    
      this.storage.get('member_no').then((val) => {
        //  console.log(String(val));
        this.member_no = val;
      }); 

      this.storage.get('scheme_name').then((val) => {
        //  console.log(String(val));
        this.scheme_name = val;
      });
    
      this.storage.get('partial_membership').then((val) => {
        //  console.log(String(val));
        this.partial_membership = val;
      });
    
      this.storage.get('prefered_hospital').then((val) => {
        //  console.log(String(val));
        this.prefered_hospital = val;
      });
//////////////////nextofkin////////////////////////
    
      this.storage.get('name').then((val) => {
        //  console.log(String(val));
        this.name = val;
      });
      
      this.storage.get('surname').then((val) => {
        //  console.log(String(val));
        this.surname = val;
      });
      
      this.storage.get('phone').then((val) => {
        //  console.log(String(val));
        this.phone = val;
      });
      
      this.storage.get('relationship').then((val) => {
        //  console.log(String(val));
        this.relationship = val;
      });
    



}


goVerifyAccount(){

  const value = this.nextofkinForm.value;
   
  this.storage.set('name', value.name);
  this.storage.set('surname', value.surname);
  this.storage.set('phone', value.phone);
  this.storage.set('relationship', value.relationship);

  this.Userdata = { 
    //medical//
   scheme_name:this.scheme_name,
   member_no:this.member_no,
   partial_membership:this.partial_membership,
   prefered_hospital:this.prefered_hospital,
   medical_aid_status:this.Medical_Aid_Status,
  //  chronic_dis:this.chronic_dis,
  //  disability:this.disability,

    //nextofkin//
   name: this.name,
   surname: this.surname,
   phone:this.phone,
   relationship:this.relationship,
 
   //register//
   fullName: this.fullName,
   phonenumber: this.phonenumber,
   email: this.email,
   password:this.password,
//  gender: this.gender,
//  myDate: this.myDate,
//  confirmPassword: this.confirmPassword, 
 }
 
  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );
     //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.register(this.Userdata)
    .subscribe(res => {
    // console.log(res);
  this.alert.presentAlert("Notification", res.msg);
      if (res.status=='OK') {
      this.navCtrl.push("VerifyAccountPage");
      }
    }, (err) => {
      console.log(err);
    });

 
}

  
  goLogin(){
   this.navCtrl.setRoot('LoginPage')
  }


  goFaq(){
    this.navCtrl.push('FaqPage')
  }


  goRegister(){
     this.navCtrl.push('RegisterPage')
  }
  




}


























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
  //}
  