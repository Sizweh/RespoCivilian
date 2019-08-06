import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController,NavController,  AlertController, LoadingController, ToastController } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  skinForm: FormGroup;
  User_Id :any;
  toConcat:any;
  skin_collection: any;
  id: any;
  
  constructor(public navParams: NavParams, 
    public view: ViewController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl:  NavController,
    private toastCtrl: ToastController

    ) {
  //    this.id = navParams.get('data');

    
  this.id = navParams.get('data') ;
  this.User_Id = navParams.get('user_id') ;
 
      
   
      this.skinForm = formBuilder.group({

        'user_id': [this.User_Id,],
        'id': [this.id,],

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        'email': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],

      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.skinForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.getpenextOfKin(postData)
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
  }

  // ionViewWillLoad() {
  // const data = this.navParams.get('data');
  // console.log(data);
  // }

  // closeModal() {
  //   const data = {
  //    name: 'john doe',
  //    occupation: 'Milkman'
  //   }
  //    this.view.dismiss(data);
  // }

 
  // goHome(){
  //   const loading= this.loadingCtrl.create({
  //     content: "Checking code...",
  //     duration: 3000
  //   });
  //   loading.present();
  //   let alert = this.alertCtrl.create({
  //     title: 'Self Admission',
  //     message: 'Admission details sent successfully, your medical aid will reply with confirmation',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  //   this.navCtrl.setRoot("HomePage");
  //   }

  goMyprofile() {

    const values = this.skinForm.value;
    this.storage.set('name', values.name);
    this.storage.set('surname', values.surname);
    this.storage.set('phone', values.phone);
    this.storage.set('email', values.email);
    this.storage.set('relationship', values.relationship);

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.skinForm.value;

    //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.editNext(postData)
      .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        // console.log(res.id);
        //console.log(res.drop_off);
        //// this.alert.presentAlert("Notification", res.msg);
         this.skin_collection = res;
        if (res.status == 'OK') {
          //    this.storage.set('user_name', res.user_name);
          //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
      }, (err) => {
        console.log(err);
      });

    let toast = this.toastCtrl.create({
      message: 'Edited Successfully!',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();


    const loading = this.loadingCtrl.create({
      content: "saving...",
      duration: 800
    });
    loading.present();

      this.navCtrl.setRoot("MyprofilePage");
      }

}
