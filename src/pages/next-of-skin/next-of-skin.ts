import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  User_Id :any;
  toConcat:any;
  skinForm: FormGroup;
  skin_collection: any;

  NextOfSkinPage: NextOfSkinPage ;
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

    ) {


  
      this.skinForm = formBuilder.group({

        'user_id': ['85',],
        
        'name': ['', Validators.compose([Validators.required])],
        'User_Id': ['', Validators.compose([Validators.required])],
   
        'surname': ['', Validators.compose([Validators.required])],
      })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextOfSkinPage');

 
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.skinForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.nextofSkin(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.skin_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });



  }

  goMyprofile(id){


var headers = new Headers();
headers.append("Accept", 'application/json');
headers.append('Content-Type', 'application/json' );

var postData = 
{
id:id
}


  this.urlService.deleteNext(postData)
  .subscribe(res => {
      // this.presentToast(res.msg, res.status);
     // console.log(res.id);
      //console.log(res.drop_off);
     //// this.alert.presentAlert("Notification", res.msg);
   this.skin_collection = res;
      if (res.status=='OK') {
    //    this.storage.set('user_name', res.user_name);
      //  this.storage.set('user_id', res.user_id);
        // localStorage.setItem('token', res.token);
        //this.navCtrl.setRoot('HomePage');
       }
  }, (err) => {
      console.log(err);
  });

  let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Are you sure?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('No clicked');
      
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
         
        }
      }
    ]
  });
  alert.present();


  // const loading= this.loadingCtrl.create({
  //   content: "deleting details",
  //   duration: 1000
  // });
  // loading.present();

     //this.navCtrl.setRoot('MyprofilePage')
  
    }

  // goNextofkin2(){
 
  //   this.navCtrl.push("Nextofkin2Page", {
    
  //   });
  //   }

  goNextofkin2(user_id){
 
    this.navCtrl.push("Nextofkin2Page", {
      user_id: this.User_Id,
    
    });
    }
    goModal(id,user_id){    
    
      this.navCtrl.push("ModalPage", {
        data: id,
        user_id:user_id
      });
   
      }







}
