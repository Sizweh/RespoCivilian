import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms'; 
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from '../../providers/urlbase/urlbase';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-beneficiary',
  templateUrl: 'beneficiary.html',
})
export class BeneficiaryPage {

  beneficiaryForm: FormGroup;
  user_id: any;
  ben_collection: any;
  id: string;
  User_Id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {

      // this.storage.get('user_id').then((val) => {
      //   this.user_id = String(val);  
      // });

      // this.storage.get('id').then((val) => {
      //   this.id = String(val);  
      // });

      this.User_Id = navParams.get('user_id') ;

      this.beneficiaryForm = formBuilder.group({
        
        'user_id': [this.User_Id],
        // 'user_id': ['16',],

        'name': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
        'dob': ['', Validators.compose([Validators.required])],
        'allergies': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
          
      })

  }

  tel='';

  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeneficiaryPage');
  }

  goHome(){

    const value = this.beneficiaryForm.value;

    this.storage.set('name', value.name);
    this.storage.set('email', value.email);
    this.storage.set('phone', value.phone);  
    this.storage.set('gender', value.gender);
    this.storage.set('allergies', value.allergies);
    this.storage.set('relationship', value.relationship);
    this.storage.set('gender', value.gender);
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
 
    var postData = this.beneficiaryForm.value;

    this.urlService.beneficiary(postData)
    .subscribe(res => {
       //// this.alert.presentAlert("Notification", res.msg);
     this.ben_collection = res;
        if (res.status=='OK') {
         }
    }, (err) => {
        console.log(err);
    });
    let toast = this.toastCtrl.create({
      message: 'Beneficiary added successfully!',
      duration: 3500,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
      const loading= this.loadingCtrl.create({
        content: "saving...",
        duration: 700
      });
      loading.present();
    this.navCtrl.setRoot('HomePage')
  }

}
