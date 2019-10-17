import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, LoadingController, NavParams, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
@IonicPage()
@Component({
  selector: 'page-chat2',
  templateUrl: 'chat2.html'
})
export class Chat2Page {

  beneficiaryForm: FormGroup;
  ben_collection: any;
  id: any;
  user_Id: any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder, 
    public modalctrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    public storage: Storage,
    private urlService: UrlbaseProvider,
  
    ) {

      
      this.id = navParams.get('data') ;
      this.user_Id = navParams.get('user_id') ;
      // this.id = navParams.get('id') ;
  
      this.beneficiaryForm = formBuilder.group({

       'user_id': [this.user_Id,],
        // 'user_id': ['16'],
        //'id': ['1'],
        
        // 'name': ['',],
        'Beneficiary_id': ['',],
      })

  }

  ionViewDidLoad() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.beneficiaryForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.viewbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
      });




    console.log('ionViewDidLoad Chat2Page');
  }

  goMaps(){

   const value = this.beneficiaryForm.value;
   this.storage.set('Beneficiary_id', value.Beneficiary_id);
    this.navCtrl.setRoot ("MapsPage");
  }



}