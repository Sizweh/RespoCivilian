import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public alertCtrl: AlertController,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
   
    ) {

      this.medicaldetailsForm = formBuilder.group({

        'member_no': ['', Validators.compose([Validators.required])],
        'scheme_name': ['', Validators.compose([Validators.required])],
        'partial_membership': ['', Validators.compose([Validators.required])],


        'chronic_dis': ['', Validators.compose([Validators.required])],
        'disability': ['', Validators.compose([Validators.required])],
        'prefered_hospital': ['', Validators.compose([Validators.required])],

      })


  

    }

  ionViewDidLoad() {
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
   this.storage.set('chronic_dis', value.chronic_dis);
   this.storage.set('disability', value.disability);
   this.storage.set('prefered_hospital', value.prefered_hospital);

  
  
  

   this.navCtrl.push('NextOfKinPage')
  }


  goRegister(){
    this.navCtrl.push('RegisterPage')
  }

  goLogin(){
    this.navCtrl.push('LoginPage')
  }
  
}
