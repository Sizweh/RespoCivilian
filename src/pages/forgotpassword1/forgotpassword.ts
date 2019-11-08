import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms'; 
import { UrlbaseProvider } from '../../providers/urlbase/urlbase';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  beneficiaryForm: FormGroup;
  ben_collection: any;
 
  id: any;
  user_Id: any;
  User_Id: any;
  toConcat: string;
  UserId: string;
  constructor(public navCtrl: NavController, 

    public formBuilder: FormBuilder, 
    public toastCtrl: ToastController,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
     
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;

      this.beneficiaryForm = formBuilder.group({
       
        'user_id': [this.User_Id,],
        'id': [this.id,],

        'name': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
        'dob': ['', Validators.compose([Validators.required])],
        'allergies': ['', Validators.compose([Validators.required])],
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

  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );

  var postData = this.beneficiaryForm.value;
      
   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.beneficiaries(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });



    console.log('ionViewDidLoad ForgotPasswordPage');{
      
    }
  
  }
  goLogin(){
    this.navCtrl.setRoot('LoginPage')
  }

  goHome(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

     var postData = this.beneficiaryForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.editbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });
    let toast = this.toastCtrl.create({
      message: 'Beneficiary details edited successfully',
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
