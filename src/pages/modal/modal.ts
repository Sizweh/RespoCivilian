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
        'phone': ['', Validators.compose([Validators.required, Validators.minLength(11)])],
        // 'email': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],

      })

  }

  tel='';

  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    
   //pass to back-end

      var postData = this.skinForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.getpenextOfKin(postData)
    .subscribe(res => {
     this.skin_collection = res;
        if (res.status=='OK') {
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

 


  goHome() {

    const values = this.skinForm.value;
    this.storage.set('name', values.name);
    this.storage.set('surname', values.surname);
    this.storage.set('phone', values.phone);
    // this.storage.set('email', values.email);
    this.storage.set('relationship', values.relationship);

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.skinForm.value;

    //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.editNext(postData)
      .subscribe(res => {
         this.skin_collection = res;
        if (res.status == 'OK') {
        }
      }, (err) => {
        console.log(err);
      });

    let toast = this.toastCtrl.create({
      message: 'Next of kin details edited successfully!',
      duration: 3500,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();


    const loading = this.loadingCtrl.create({
      content: "saving...",
      duration: 700
    });
    loading.present();

      this.navCtrl.setRoot("HomePage");
      }

}
