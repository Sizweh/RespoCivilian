import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
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
    private storage: Storage,
    ) {

      this.medicaldetailsForm = formBuilder.group({

        'membershipNo': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'schemeName': ['', Validators.compose([Validators.required])],
        'gapCover': ['', Validators.compose([Validators.required])],


        'chronicDisease': ['', Validators.compose([Validators.required])],
        'disability': ['', Validators.compose([Validators.required])],
        'preferredHospital': ['', Validators.compose([Validators.required])],

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

  goNextOfKin(medicaldetailsForm){
    this.storage.set('category', medicaldetailsForm);

    this.navCtrl.push('NextOfKinPage')
  }
  goRegister(){
    this.navCtrl.push('RegisterPage')
  }
  
}
