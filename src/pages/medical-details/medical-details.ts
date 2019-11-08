import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';



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



   
    ) {

      this.medicaldetailsForm = formBuilder.group({

      })

    }



  ionViewDidLoad() {



    console.log('ionViewDidLoad MedicalDetailsPage');
  }


  goNextOfKin(){
      this.storage.set('MA', 'Non-Medical');
   this.navCtrl.push('NextOfKinPage')
  }


  goForSelf(){
      this.storage.set('MA', 'Medical-Aid');
    this.navCtrl.push('ForSelfPage')
  }


  
}
