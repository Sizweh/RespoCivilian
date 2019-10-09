import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder} from '@angular/forms'; 
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {

      this.storage.get('user_id').then((val) => {
        this.user_id = String(val);  
      });

      this.storage.get('id').then((val) => {
        this.id = String(val);  
      });

      this.beneficiaryForm = formBuilder.group({
        
        'user_id': ['16',],
        'id': ['1',],
  
        'name': ['',],
        'phone': ['',],
        'gender': ['',],
        'dob': ['',],
        'allergies': ['',],
        'relationship': ['',],
        'email': ['',],
        
          
      })







  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad BeneficiaryPage');
  }

  goMyBeneficiaries(){

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
      message: 'Beneficiary added successfully',
      duration: 3000,
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


   // this.navCtrl.setRoot('MyBeneficiariesPage')
  }

}
