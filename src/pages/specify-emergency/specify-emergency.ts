import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FormBuilder,FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-specify-emergency',
  templateUrl: 'specify-emergency.html',
})
export class SpecifyEmergencyPage {

  username :any;
  specify_emergency :any;
  specifyForm: FormGroup;
  specify_collection:any;
  id: any;
  User_Id: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
  
 
    public formBuilder: FormBuilder,

    ) {

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;

      this.specifyForm = formBuilder.group({

        'user_id': [ this.User_Id],
        'id': [this.id,],
        'specify_emergency': ['',],
      })
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecifyEmergencyPage');
  }
 



  goHome(){
    this.navCtrl.setRoot('HomePage')
  }

  
  goSelfAdmission(){

    const value = this.specifyForm.value;
    this.storage.set('specify_emergency', value.specify_emergency);


    this.navCtrl.push('SelfAdmissionPage')
  }


 


}
