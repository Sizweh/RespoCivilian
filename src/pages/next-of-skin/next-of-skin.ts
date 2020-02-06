import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { NextOfSkinPage } from '../next-of-kin/next-of-kin';

@IonicPage()
@Component({
  selector: 'page-next-of-skin',
  templateUrl: 'next-of-skin.html',
})
export class NextOfSkinPage {

  User_ID :any;
  User_Id :any;
  id :any;
  toConcat:any;
  skinForm: FormGroup;
  skin_collection: any;

 // MyprofilePage: MyprofilePage ;
  phone:any;
  relationship:any;
  name:any;
  user_ids:any;
  surname:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController

    ) {

       //this.id = navParams.get('user_id') ;
      // this.User_ID = navParams.get('user_id') ;
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
  
      this.skinForm = formBuilder.group({

        // 'user_id': [this.User_ID,],
        'user_id': [this.User_Id,],
        
        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
      })



  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad NextOfSkinPage');

 
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

      var postData = this.skinForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.nextofSkin(postData)
    .subscribe(res => {
     this.skin_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });
  }

  goNextOfSkin(id){


    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: '',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

var headers = new Headers();
headers.append("Accept", 'application/json');
headers.append('Content-Type', 'application/json' );

var postData = { id:id }

  this.urlService.deleteNext(postData)
  .subscribe(res => {

   this.skin_collection = res;
      if (res.status=='OK') {

       }
  }, (err) => {
      console.log(err);
  });
            this.navCtrl.setRoot('MyaccountPage', {
            id:id,
            user_id:this.User_Id,
          }); 
          const loading= this.loadingCtrl.create({
            content: "Deleting...",
            duration: 700
          });
          loading.present();

    let toast = this.toastCtrl.create({
      message: 'Next of Kin deleted successfully.',
      duration: 3500,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
            
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
  


    confirm.present();

    // let toast = this.toastCtrl.create({
    //   message: 'Medical details edited successfully',
    //   duration: 3500,
    //   position: 'bottom'
    // });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    // toast.present();
  
     


    }



  goNextofkin2(){
 
 this.storage.get('user_id').then((result) => {
  this.navCtrl.push("Nextofkin2Page", {
      user_id:result,
    });
});
    
}

    goModal(id,user_id){    
    
      this.navCtrl.push("ModalPage", {
        data: id,
        user_id:user_id
      });
   
      }







}
