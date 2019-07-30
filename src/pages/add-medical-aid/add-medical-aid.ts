import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-medical-aid',
  templateUrl: 'add-medical-aid.html',
})
export class AddMedicalAidPage {

  AddMedicalForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public formBuilder: FormBuilder,

    ) {

      this.AddMedicalForm = formBuilder.group({
     
        'scheme_name': ['', Validators.compose([Validators.required])],
        'membership_no': ['', Validators.compose([Validators.required])],

      })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMedicalAidPage');
  }


  goMyprofile(){

    const values = this.AddMedicalForm.value;
   
    this.storage.set('scheme_name', values.scheme_name);
    this.storage.set('membership_no', values.membership_no);

    const loading= this.loadingCtrl.create({
      content: "saving...",
      duration: 1000
    });
    loading.present();
    this.navCtrl.setRoot('MyprofilePage')
  
    }

}
