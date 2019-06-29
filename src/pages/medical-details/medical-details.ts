import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public storage: Storage,
    public alertCtrl: AlertController
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

  goNextOfKin(){

    const confirm = this.alertCtrl.create({
      title: 'Are you on medical aid?',
      message: '',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();


    this.navCtrl.push('NextOfKinPage')
  }

  goRegister(){
    this.navCtrl.push('RegisterPage')
  }

  goLogin(){
    this.navCtrl.push('LoginPage')
  }
  
}
