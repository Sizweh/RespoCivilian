import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-medical-history',
  templateUrl: 'medical-history.html',
})
export class MedicalHistoryPage {

  Employee:any;

  UserId :any;
  User_Id :any;
  id: any;
  toConcat:any;
  medicalForm: FormGroup;
  medical_collection: any;

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
   
      this.medicalForm = formBuilder.group({
        
        'user_id': [this.User_Id,],
        // 'user_id': [this.User_Id],

        'member_no': ['', Validators.compose([Validators.required])],
        'scheme_name': ['', Validators.compose([Validators.required])],
        'partial_membership': ['', Validators.compose([Validators.required])],
        'chronic_dis': ['', Validators.compose([Validators.required])],
        'disability': ['', Validators.compose([Validators.required])],
        'prefered_hospital': ['', Validators.compose([Validators.required])],

      })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalHistoryPage');

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
   //pass to back-end
      var postData = this.medicalForm.value;
      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.medicalHistory(postData)
    .subscribe(res => {
     this.medical_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });




  }


  goHome(){

    const values = this.medicalForm.value;
    this.storage.set('member_no', values.member_no);
    this.storage.set('scheme_name', values.scheme_name);
    this.storage.set('partial_membership', values.partial_membership);
    this.storage.set('prefered_hospital', values.prefered_hospital);
    this.storage.set('chronic_dis', values.chronic_dis);
    this.storage.set('disability', values.disability);

    var postData = this.medicalForm.value;

    //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.editMedical(postData)
  .subscribe(res => {
   this.medical_collection = res;
      if (res.status=='OK') {
        
       }
  }, (err) => {
      console.log(err);
  });

  let toast = this.toastCtrl.create({
    message: 'Medical details edited successfully',
    duration: 3500,
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
    

    this.navCtrl.setRoot('HomePage');
    }


  goAddMedicalAid(){
    this.navCtrl.push('AddMedicalAidPage')
    }

 

    
}
