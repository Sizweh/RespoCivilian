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

      'org_id': ['', Validators.compose([Validators.required])],
      'student_no': ['', Validators.compose([Validators.required])],
      // 'email': ['', Validators.compose([Validators.required])],
      // 'phone_no': ['', Validators.compose([Validators.required])],
      // 'ems_lisence': ['', Validators.compose([Validators.required])],
      // 'address': ['', Validators.compose([Validators.required])],
      // 'city': ['', Validators.compose([Validators.required])],
      // 'province': ['', Validators.compose([Validators.required])],

      

    })

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      console.log(this.registerForm.value);
      var postData = this.registerForm.value;
     



      //THIS IS A BETTER WAY TO MAKE API CALLS
    // this.urlService.institutionList(postData)
    // .subscribe(res => {
    //     // this.presentToast(res.msg, res.status);
    //     console.log(res);
    //     // alert(res);ss
    //     this.alert.presentAlert("Notification", res.msg);

    //     if (res.status=='OK') {

    //     }
    // }, (err) => {
    //     console.log(err);
    // });


    }

  ionViewDidLoad() {
    

    console.log('ionViewDidLoad BankingDetailsPage');
  }




  goLogin(){
    this.navCtrl.push("LoginPage");
  }


  goMyaccount(id) {

    this.storage.get('user_id').then((val) => {
      console.log(String(val));
      this.user_id = String(val);

      const values = this.registerForm.value;

      this.storage.set('org_id', values.org_id);
      this.storage.set('student_no', values.student_no);

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');

      // pass to back-end
      console.log(this.registerForm.value);
      var collection = {
        user_id: val,
        org_id: values.org_id,
        student_no: values.student_no
      };
     
    // THIS IS A BETTER WAY TO MAKE API CALLS
       this.urlService.orgList(collection)
       .subscribe(res => {
         // this.presentToast(res.msg, res.status);
        console.log(res);
         if (res.status=='OK') {
        }
       }, (err) => {
         console.log(err);
       });
  
          const loading= this.loadingCtrl.create({
        content: "Saving...",
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
    });
    this.navCtrl.setRoot("MyaccountPage");
  }

  
  goHome(){
   this.navCtrl.setRoot("HomePage");

  }




}
