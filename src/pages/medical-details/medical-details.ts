import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/**
 * Generated class for the MedicalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-details',
  templateUrl: 'medical-details.html',
})
export class MedicalDetailsPage {

  medicaldetailsForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    ) {

      this.medicaldetailsForm = formBuilder.group({

        'MembershipNo': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'SchemeName': ['', Validators.compose([Validators.required])],
        'GapCover': ['', Validators.compose([Validators.required])],


        'ChronicDisease': ['', Validators.compose([Validators.required])],
        'Disabilities': ['', Validators.compose([Validators.required])],
        'PreferredHospital': ['', Validators.compose([Validators.required])],

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
    this.navCtrl.push('NextOfKinPage')
  }
  goRegister(){
    this.navCtrl.push('RegisterPage')
  }
  
}
