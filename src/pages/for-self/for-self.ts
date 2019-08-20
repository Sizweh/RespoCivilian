import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-for-self',
  templateUrl: 'for-self.html',
})
export class ForSelfPage {
  
  UserId :any;
  User_Id :any;
  id: any;
  toConcat:any;
  registerForm: FormGroup;
  student_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {

      // this.id = navParams.get('data') ;
      // this.User_Id = navParams.get('user_id') ;

      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.  toConcat =   this.UserId =String(val); 
      });

      this.storage.get('id').then((val) => {
        console.log(String(val));
        this.id = String(val);  
      });

   
      this.registerForm = formBuilder.group({

        // 'user_id': [this.User_Id,],
        // 'id': [this.id,],
<<<<<<< HEAD
      'org_name': ['', Validators.compose([Validators.required])],
      'company_registration': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'phone_no': ['', Validators.compose([Validators.required])],
      'ems_lisence': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'province': ['', Validators.compose([Validators.required])],
=======

        'user_id': ['103'],
        'id': ['103'],

      'org': ['', Validators.compose([Validators.required])],
      'student_no': ['', Validators.compose([Validators.required])],
      // 'email': ['', Validators.compose([Validators.required])],
      // 'name': ['', Validators.compose([Validators.required])],
      // 'gender': ['', Validators.compose([Validators.required])],
      // 'dob': ['', Validators.compose([Validators.required])],
      // 'password': ['', Validators.compose([Validators.required])],
      // 'province': ['', Validators.compose([Validators.required])],
>>>>>>> 6e87605cb142f3a6cee19ca4ebb1f49a388f1e94
    })



  }

  ionViewDidLoad() {
    this.storage.get('user_id').then((val) => {
      console.log(String(val+"llllllllll"));
      this.  toConcat =   this.UserId =String(val); 

      var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   //pass to back-end
      var postData = {user_id:val};
      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.studentDetails(postData)
    .subscribe(res => {
     this.student_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });

    });
    

    console.log('ionViewDidLoad ForSelfPage');
  }

  goHome(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   //pass to back-end
      var postData = this.registerForm.value;
      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.deleteForm(postData)
    .subscribe(res => {
     this.student_collection = res;
        if (res.status=='OK') {
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
      title: 'Self Admission',
      message: 'Admission details sent successfully, your medical aid will reply with confirmation',
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


 goSelfAdmission(){    
 this.navCtrl.push("SelfAdmissionPage");
 }


 goMyaccount(){ 

  const values = this.registerForm.value;
   
  this.storage.set('org', values.org);
  this.storage.set('student_no', values.student_no);
  // this.storage.set('email', values.email);
  // this.storage.set('name', values.name);
  // this.storage.set('gender', values.gender);
  // this.storage.set('dob', values.dob);
  // this.storage.set('password', values.password);
  // this.storage.set('phonenumber', values.phonenumber);

  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );
 //pass to back-end
    var postData = this.registerForm.value;
    //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.editDetails(postData)
  .subscribe(res => {
   this.student_collection = res;
      if (res.status=='OK') {
      }
  }, (err) => {
      console.log(err);
  });

  let toast = this.toastCtrl.create({
    message: 'Form edited successfully.',
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


 this.navCtrl.setRoot("MyaccountPage");
 }

}
