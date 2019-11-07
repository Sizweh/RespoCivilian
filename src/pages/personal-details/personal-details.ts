import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {


  User_Id :any;
  UserId :any;
  toConcat:any;
  personalForm: FormGroup;
  personal_collection: any;
  username:any; 
  id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
     


   
      this.personalForm = formBuilder.group({
     
        'user_id': [this.User_Id],
        // 'user_id': [this.User_Id],

        'fullName': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
        'myDate': ['', Validators.compose([Validators.required])],
     
        'phonenumber': [Validators.compose([Validators.required, Validators.minLength(11)])],
       
 
        'email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],

      })
  }

  tel='';

  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }

  ionViewDidLoad() {
   
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );


      var postData = this.personalForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.personalDetails(postData)
    .subscribe(res => {
     this.personal_collection = res;
        if (res.status=='OK') {
        
        }
    }, (err) => {
        console.log(err);
    }); 
  }

  goMyprofile(){

    const values = this.personalForm.value;
    this.storage.set('fullName', values.fullName);
    this.storage.set('gender', values.gender);
    this.storage.set('myDate', values.myDate);
    this.storage.set('email', values.email);
    this.storage.set('phonenumber', values.phonenumber);

    var postData = this.personalForm.value;

    //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.editPersonal(postData)
  .subscribe(res => {
   this.personal_collection = res;
      if (res.status=='OK') {
       }
  }, (err) => {
      console.log(err);
  });


  let toast = this.toastCtrl.create({
    message: 'Personal details edited successfully',
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

     this.navCtrl.setRoot('MyprofilePage')
  
    }

  






}
