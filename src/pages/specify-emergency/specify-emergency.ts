import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';

@IonicPage()
@Component({
  selector: 'page-specify-emergency',
  templateUrl: 'specify-emergency.html',
})
export class SpecifyEmergencyPage {

  username :any;
  //specify_emergency :any;
  specifyForm: FormGroup;
  specify_collection:any;
  
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
    console.log('ionViewDidLoad SpecifyEmergencyPage');
  }
 
 
  goLocation(){
    this.navCtrl.push('LocationPage')
  }


  goHome(){
    this.navCtrl.setRoot('HomePage')
  }
  goSelfAdmission(){
    this.navCtrl.push('SelfAdmissionPage')
  }


  goSelectResponder(){

    const value = this.specifyForm.value;
    this.storage.set('specify_emergency', value.specify_emergency);

    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json');
    // var postData = this.specifyForm.value
    // this.urlService.specify(postData)
    //   .subscribe(res => {
    //     this.specify_collection = res;
    //     if (res.status == 'OK') {
    //     }
    //   }, (err) => {
    //     console.log(err);
    //   });

   this.navCtrl.push('SelectResponderPage')
  }


}
