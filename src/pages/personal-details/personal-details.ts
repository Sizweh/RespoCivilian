import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PersonalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {


  UserId :any;
  toConcat:any;
  personalForm: FormGroup;
  personal_collection: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {


      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.  toConcat =   this.UserId =String(val);
      
        
      });
   
      this.personalForm = formBuilder.group({
        'user_id': ['70',],
      
       
      })
  }

  ionViewDidLoad() {
   

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.personalForm.value;



      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.personalDetails(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.personal_collection = res;
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




  goMyprofile(){
    const loading= this.loadingCtrl.create({
      content: "saving...",
      duration: 1000
    });
    loading.present();
    this.navCtrl.setRoot('MyprofilePage')
  
    }

  






}
