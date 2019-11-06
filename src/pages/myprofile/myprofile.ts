import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController, MenuController  } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {



  profileForm: FormGroup;
  id: any;
  User_Id :any;
  user_id:any;
  profile_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    ) {

  }
 

 

  ionViewDidLoad() {

 this.storage.get('user_id').then((result) => {

   var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
 
    var postData = {user_id:result}
    //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.personalDetails(postData)
  .subscribe(res => {
   this.profile_collection = res;
      if (res.status=='OK') {
       }
  }, (err) => {
      console.log(err);
  });
 });
}



  

  goLogin() {
    const loading = this.loadingCtrl.create({
      content: "logging out...",
      duration: 2000
    });
    loading.present();
    this.storage.clear();
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot('LoginPage')

  }

  
goPersonalDetails(){
  this.storage.get('user_id').then((result) => {
    this.navCtrl.push("PersonalDetailsPage", {
      user_id:result,
    });
  }); 
}

goChangePassword(){
this.storage.get('user_id').then((result) => {
   this.navCtrl.push("ChangePasswordPage", {
      user_id:result,
    });
  });
}

 

}



