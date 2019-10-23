import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';


@IonicPage()
@Component({
  selector: 'page-medical-details',
  templateUrl: 'medical-details.html',
})
export class MedicalDetailsPage {


  medicaldetailsForm: FormGroup;
  localStorage: any;
  medical_collection: any;
  student_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public alertCtrl: AlertController,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
   
    ) {

      this.medicaldetailsForm = formBuilder.group({


        // 'member_no': ['',],
        // 'scheme_name': ['',],
        // 'partial_membership': ['',],
        // 'prefered_hospital': ['',],
        // 'chronic_dis': ['',],
        // 'disability': ['',]

      })

    }

    tel='';

    convert(){
      if(this.tel.substr(0,1)==='0'){
        this.tel='27'+this.tel.substr(1);
      }
    }

  ionViewDidLoad() {

    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );

    //   //THIS IS A BETTER WAY TO MAKE API CALLS
    // this.urlService.medList()
    // .subscribe(res => {
    //   //console.log(res)
    //  this.medical_collection = res;
    //     if (res.status=='OK') {
    //     }
    // }, (err) => {
    //     console.log(err);
    // });

    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );

      //THIS IS A BETTER WAY TO MAKE API CALLS
    // this.urlService.institutionList()
    // .subscribe(res => {
    //  this.student_collection = res;
    //     if (res.status=='OK') {
    //     }
    // }, (err) => {
    //     console.log(err);  
    // });


    console.log('ionViewDidLoad MedicalDetailsPage');
  }

  goMyaccount(){
    this.navCtrl.setRoot('MyaccountPage')
  }

  goEditsuccessfully(){
    this.navCtrl.push('EditsuccessfullyPage')
  }

  goNextOfKin(){

    
       this.storage.set('MA', 'Non-Medical');
   
   this.navCtrl.push('NextOfKinPage')
  }


  goForSelf(){

         this.storage.set('MA', 'Medical-Aid');

    this.navCtrl.push('ForSelfPage')
  }

  goLogin(){
    this.navCtrl.push('LoginPage')
  }
  
}
