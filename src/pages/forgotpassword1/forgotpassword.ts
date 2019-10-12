import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder} from '@angular/forms'; 
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from '../../providers/urlbase/urlbase';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';






@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
   phone_number: string = "";
  create_password: string = "";
  confirm_password: string = "";
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
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
     

     
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      // this.id = navParams.get('id') ;

      this.beneficiaryForm = formBuilder.group({

        // 'user_id': [this.User_ID,],
        // 'user_id': ['16'],
        // 'id': ['3'],
       
        'user_id': [this.User_Id,],
        'id': [this.id,],

        
        'name': ['',],
        'phone': ['',],
        'gender': ['',],
        'dob': ['',],
        'allergies': ['',],
        'relationship': ['',],
        'email': ['',],

      })

    }

    tel='';

    convert(){
      if(this.tel.substr(0,1)==='0'){
        this.tel='27'+this.tel.substr(1);
      }
    }
    






  ionViewDidLoad(id) {

    // this.storage.get('id').then((val) => {
    //   console.log(String(val));
    //   this.  toConcat =   this.UserId =String(val); 

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //   pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.beneficiaryForm.value;
      
      // var postData = {id:val};

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.beneficiaries(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });

  // });


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
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //   pass to back-end
    //  console.log(this.historyForm.value);
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




    this.navCtrl.setRoot('HomePage')
  }







   
  goForgotpassword2(){
    this.navCtrl.push('Forgotpassword2Page')
    if(this.phone_number=="0787463734"){
      const toast = this.toastCtrl.create({
        message: 'Password reset successfully',
        duration: 3000
      });
      toast.present();
    }else if (this.create_password=="12345"){}
    const toast = this.toastCtrl.create({
      message: 'Successfull...',
      duration: 8000
    });
    toast.present();



  }
}
