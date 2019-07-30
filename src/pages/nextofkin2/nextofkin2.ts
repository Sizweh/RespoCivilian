import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';



@IonicPage()
@Component({
  selector: 'page-nextofkin2',
  templateUrl: 'nextofkin2.html',
})
export class Nextofkin2Page {

  nextofkin2Form : FormGroup;
  User_Id :any;
  Userdata: any;
  toConcat:any;
  skin_collection: any;

  phone:any;
  relationship:any;
  name:any;
  surname:any;
  email:any;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private urlService: UrlbaseProvider,
    private toastCtrl: ToastController
    ) {

    
      this.User_Id = navParams.get('user_id') ;


      this.nextofkin2Form = formBuilder.group({
         
        'user_id': [this.User_Id],

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        
        'phone': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'email': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],
    
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Nextofkin2Page');
  }


  goLogin(){
    this.navCtrl.push('LoginPage')
 }


  goNextOfSkin(){
    this.navCtrl.push('NextOfSkinPage')
 }

  goMyprofile(){

    const values = this.nextofkin2Form.value;
    this.storage.set('name', values.name);
    this.storage.set('surname', values.surname);
    this.storage.set('phone', values.phone);
    this.storage.set('email', values.email);
    this.storage.set('relationship', values.relationship);

    this.Userdata = { 

      //nextofkin//
   
     name: this.name,
     surname: this.surname,
     phone:this.phone,
     email:this.email,
     relationship:this.relationship,
  
 
   }
   
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.nextofkin2Form.value);
      var postData = this.nextofkin2Form.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.addNext(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.skin_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
         }
    }, (err) => {
        console.log(err);
    });

    let toast = this.toastCtrl.create({
      message: 'Next of kin was added successfully',
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



    
 
    //this.navCtrl.push('VerifyAccountPage')
 

}
