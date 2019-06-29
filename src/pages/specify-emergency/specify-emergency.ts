import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';
/**
 * Generated class for the SpecifyEmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specify-emergency',
  templateUrl: 'specify-emergency.html',
})
export class SpecifyEmergencyPage {
  username :any;
  specify_emergency :any;

  
  specifyForm: FormGroup;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public alert: AlertsProvider,
    ) {


      this.specifyForm = formBuilder.group({

        'specify_emergency': ['', Validators.compose([Validators.required])],

      })
  }



  otherCategories = [
    {
      faultID: 10,
      category: "Other",
      placeholder: "",
      imageUrl: "http://46.101.169.33/icons/R8.png",
      icon: "alarm"
     
    },
  
  ];
  





  ionViewDidLoad() {
    this.storage.set('specify_emergency', this.specify_emergency);
    console.log(this.specify_emergency);
    console.log('ionViewDidLoad SpecifyEmergencyPage');
  }
 
 
  goLocation(){
  


    this.navCtrl.push('LocationPage')
  }
  goHome(){
    this.navCtrl.setRoot('HomePage')
  }

  goSelectResponder(specify_emergency){
       this.storage.set('specify_emergency', specify_emergency);
    console.log(specify_emergency);
  
  
    this.navCtrl.push('SelectResponderPage')
  }


}
