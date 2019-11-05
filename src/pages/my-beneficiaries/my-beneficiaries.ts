import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-beneficiaries',
  templateUrl: 'my-beneficiaries.html',
})
export class MyBeneficiariesPage {

  beneficiaryForm: FormGroup;
  ben_collection: any;
  User_Id: any;
  id: any;
  user_id: any;
  phone: any;
  user_Id: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {

      this.storage.get('user_id').then((val) => {
        this.user_Id = String(val);  
      });

      this.id = navParams.get('data') ;
      this.user_Id = navParams.get('user_id') ;
   

      this.beneficiaryForm = formBuilder.group({

       'user_id': [this.user_Id,],

        'phone': ['',],
      })
  }


  ionViewDidLoad() {

    // this.storage.get('user_id').then((val) => {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.beneficiaryForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.viewbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
      });
      
   
      // this.user_Id = String(val);  
//  });


    console.log('ionViewDidLoad MyBeneficiariesPage');
  }





  // goForgotpassword(){
  //   this.navCtrl.push('ForgotpasswordPage')
  // }

  // goBeneficiary(id,user_id){
  //      this.navCtrl.push("BeneficiaryPage", {
  //         // user_id:result,
  //         data: id,
  //         user_id:user_id
  //       });
  //  }

   goBeneficiary(){
    this.storage.get('user_id').then((result) => {
       this.navCtrl.push("BeneficiaryPage", {
          user_id:result,
        });
    });
   }

  goForgotpassword(id,user_id){    
    this.navCtrl.push("ForgotpasswordPage", {
      data: id,
      user_id:user_id
    });
 
    }

   goHome(id){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    
    var postData = { id:id }
    // var postData = this.skinForm.value;
    
      this.urlService.deleletBen(postData)
      .subscribe(res => {
      
       this.ben_collection = res;
          if (res.status=='OK') {
           }
      }, (err) => {
          console.log(err);
      });
    
        const confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: '',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                this.navCtrl.setRoot('HomePage'); 
              }
            },
            {
              text: 'No',
              handler: () => {

         
              }
            }
          ]
        });
        confirm.present();

  }
   
  













  
}
