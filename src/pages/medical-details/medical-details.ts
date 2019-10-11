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

        'member_no': ['',],
        'scheme_name': ['',],
        'partial_membership': ['',],
        'prefered_hospital': ['',],
        'chronic_dis': ['',],
        'disability': ['',]

      })


  

    }

  ionViewDidLoad() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.medList()
    .subscribe(res => {
      //console.log(res)
     this.medical_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });

    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.institutionList()
    .subscribe(res => {
     this.student_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);  
    });


    console.log('ionViewDidLoad MedicalDetailsPage');
  }

  goMyaccount(){
    this.navCtrl.setRoot('MyaccountPage')
  }

  goEditsuccessfully(){
    this.navCtrl.push('EditsuccessfullyPage')
  }

  goNextOfKin(){


const value = this.medicaldetailsForm.value;

   this.storage.set('member_no', value.member_no);
   this.storage.set('scheme_name', value.scheme_name);  
   this.storage.set('partial_membership', value.partial_membership);
   this.storage.set('prefered_hospital', value.prefered_hospital);
   
   this.storage.set('chronic_dis', value.chronic_dis);
   this.storage.set('disability', value.disability);

   this.navCtrl.push('NextOfKinPage')
  }


  goRegister(){
    this.navCtrl.push('RegisterPage')
  }

  goLogin(){
    this.navCtrl.push('LoginPage')
  }
  
}
