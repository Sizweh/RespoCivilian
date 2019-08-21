import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController, ToastController  } from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators,  } from '@angular/forms'; 
import { AlertsProvider } from './../../providers/alerts/alerts';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from '../../providers/urlbase/urlbase';

@IonicPage()
@Component({
  selector: 'page-banking-details',
  templateUrl: 'banking-details.html',
})
export class BankingDetailsPage {
  remembertoken: boolean;

  registerForm: FormGroup;
 student_collection: any;
  id: any;
  User_Id: any;
  user_id: any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public http: HttpClient,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private urlService: UrlbaseProvider,
    ) { 


      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.user_id = String(val);  
      });

      this.storage.get('id').then((val) => {
        console.log(String(val));
        this.id = String(val);  
      });

      // this.id = navParams.get('data') ;
      // this.User_Id = navParams.get('user_id') ;

      this.registerForm = formBuilder.group({

        // 'user_id': [this.User_Id,],
        // 'id': [this.id,],

        'user_id': ['103'],
        'id': ['103'],

      'org_id': ['', Validators.compose([Validators.required])],
      'student_no': ['', Validators.compose([Validators.required])],
      // 'name': ['', Validators.compose([Validators.required])],
      // 'email': ['', Validators.compose([Validators.required])],
      // 'gender': ['', Validators.compose([Validators.required])],
      // 'dob': ['', Validators.compose([Validators.required])],
      // 'password': ['', Validators.compose([Validators.required])],

      // 'phonenumber': ['', Validators.compose([Validators.required])],
    })

    }

  ionViewDidLoad() {
    
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
  
    // // pass to back-end
    //    console.log(this.registerForm.value);
    //    var postData = this.registerForm.value;
     
  
    // // THIS IS A BETTER WAY TO MAKE API CALLS
    //    this.urlService.institutionList(postData)
    //    .subscribe(res => {
    //      // this.presentToast(res.msg, res.status);
    //     console.log(res);
    //      // alert(res);
    //      this.alert.presentAlert("Notification", res.msg);
    //      this.student_collection = res;
    //      if (res.status=='OK') {
    //       //this.storage.set('nextofkinform', res.nextofkinform);
    //       //this.storage.set('nextofkinform', res.nextofkin_id);
    //      // this.navCtrl.push("VerifyAccountPage");
    //      // localStorage.setItem('token', res.token);
    //     }
    //    }, (err) => {
    //      console.log(err);
    //    });
    console.log('ionViewDidLoad BankingDetailsPage');
  }

  goLogin(){
    this.navCtrl.push("LoginPage");
  }
  goMyaccount() {
    this.navCtrl.push("MyaccountPage");
  }

  
  goHome(id){


    const values = this.registerForm.value;
   
    this.storage.set('org_id', values.org_id);
    this.storage.set('student_no', values.student_no);
    // this.storage.set('name', values.name);
    // this.storage.set('email', values.email);
    // this.storage.set('gender', values.gender);
    // this.storage.set('dob', values.dob);
    // this.storage.set('password', values.password);

    // this.storage.set('phonenumber', values.phonenumber);


  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );


  // pass to back-end
     console.log(this.registerForm.value);
     var postData = this.registerForm.value;
   

  // THIS IS A BETTER WAY TO MAKE API CALLS
     this.urlService.orgList(postData)
     .subscribe(res => {
       // this.presentToast(res.msg, res.status);
      console.log(res);
       // alert(res);
      // this.alert.presentAlert("Notification", res.msg);
 
       if (res.status=='OK') {
        //this.storage.set('nextofkinform', res.nextofkinform);
        //this.storage.set('nextofkinform', res.nextofkin_id);
       // this.navCtrl.push("VerifyAccountPage");
       // localStorage.setItem('token', res.token);
      }
     }, (err) => {
       console.log(err);
       });
   

        const loading= this.loadingCtrl.create({
      content: "Checking code...",
      duration: 3000
    });
    loading.present();
    let alert = this.alertCtrl.create({
      title: 'Student Details',
      message: 'Student details stored successfully. ',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    alert.present();

   this.navCtrl.setRoot("HomePage");
  }




}
