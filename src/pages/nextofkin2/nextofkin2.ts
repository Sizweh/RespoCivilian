import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-nextofkin2',
  templateUrl: 'nextofkin2.html',
})
export class Nextofkin2Page {

  nextofkin2Form : FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    
    ) {


      this.nextofkin2Form = formBuilder.group({

        'name2': ['', Validators.compose([Validators.required])],
        'surname2': ['', Validators.compose([Validators.required])],
        
        'phoneNumber2': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'relationship2': ['', Validators.compose([Validators.required])],
    
      })





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Nextofkin2Page');
  }













  goLogin(){
    this.navCtrl.push('LoginPage')
 }
  goVerifyAccount(){


    
  const values = this.nextofkin2Form.value;

  this.storage.set('name2', values.name2);
  this.storage.set('surname2', values.surname2);
  this.storage.set('phoneNumber2', values.phoneNumber2);
  this.storage.set('relationship2', values.relationship2);

    //this.navCtrl.push('VerifyAccountPage')
 }

}
