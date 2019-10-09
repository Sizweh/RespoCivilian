import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController} from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms'; 
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

  org_Id: any;
  remembertoken: boolean;
  registerForm: FormGroup;
  register1Form: FormGroup;
  student_collection: any;
  id: any;
  User_Id: any;
  user_id: any;
  org_id: string;

  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,

    public http: HttpClient,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private urlService: UrlbaseProvider,
    ) {
      
      this.storage.get('user_id').then((val) => {
        this.user_id = String(val);  
      });


      this.registerForm = formBuilder.group({
        
      'user_id': ['',],
      'id': ['',],

      'org_id': ['',],
      'student_no': ['', Validators.compose([Validators.required])],
        
    })


    }

  ionViewDidLoad() {

    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );

    //   //THIS IS A BETTER WAY TO MAKE API CALLS
    // this.urlService.institutionList()
    // .subscribe(res => {
    //  this.student_collection = res;
    //     if (res.status=='OK') {
    //     }
    // }, (err) => {
    //     console.log(err);  
    // });
   
    console.log('ionViewDidLoad BankingDetailsPage');
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

  








}
