import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  UserId :any;
  Id :any;
  toConcat:any;
  contactForm: FormGroup;
  contact_collection: any;
  user_id: any;
  User_Id :any;
  id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController 
   
    ) {
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      // this.Id = navParams.get('id') ;

      this.contactForm = formBuilder.group({
        'user_id': [this.User_Id],
        // 'id': [this.Id],

        // 'user_id': ['85'],
        'message': ['', ],
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');

  }


  goHome() {

    const values = this.contactForm.value;
    this.storage.set('message', values.message);


    //  this.storage.get('user_id').then((val) => {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);

      //var postData = {user_id:val};
      var postData = this.contactForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.contact(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.contact_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });


    const loader = this.loadingCtrl.create({
      content: "Sending message...",
      duration: 1200
    });
    loader.present();

    let toast = this.toastCtrl.create({
      message: 'Message sent! ',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

    // let alert = this.alertCtrl.create({
    //   title: 'Message sent ',
    //   message: '',
    //   buttons: [
    //     {
    //       text: 'OK',
    //       handler: () => {
    //        alert.present();
    //       }
    //     }
    //   ]
    // });
  //  });
    //alert.present();
   // this.navCtrl.setRoot("HomePage");
  }


  goContactPage(){
    this.navCtrl.push('ContactPage')
  }

  goFaqPage(){
    this.navCtrl.push('FaqPage')
  }

}
