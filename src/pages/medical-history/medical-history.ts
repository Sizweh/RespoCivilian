import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**

/**
 * Generated class for the MedicalHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-history',
  templateUrl: 'medical-history.html',
})
export class MedicalHistoryPage {

  UserId :any;
  toConcat:any;
  medicalForm: FormGroup;
  medical_collection: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    ) {


      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.  toConcat =   this.UserId =String(val);
      
        
      });
   
      this.medicalForm = formBuilder.group({
        'user_id': ['1',],
      })
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalHistoryPage');



    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.medicalForm.value;



      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.medicalHistory(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.medical_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });






  }

}
