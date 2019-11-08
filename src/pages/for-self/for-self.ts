import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-for-self',
  templateUrl: 'for-self.html',
})
export class ForSelfPage {
  
  UserId :any;
  User_Id :any;
  id: any;
  toConcat:any;
  medicaldetailsForm: FormGroup;
  student_collection: any;
  medical_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
 
    ) {
      

      this.medicaldetailsForm = formBuilder.group({

        'member_no': ['', Validators.compose([Validators.required])],
        'scheme_name': ['', Validators.compose([Validators.required])],
        'partial_membership': ['', Validators.compose([Validators.required])],
        'prefered_hospital': ['', Validators.compose([Validators.required])],


    })


  }

ionViewDidLoad() {

 var headers = new Headers();
 headers.append("Accept", 'application/json');
 headers.append('Content-Type', 'application/json' );

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.medList()
    .subscribe(res => {

     this.medical_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });

    console.log('ionViewDidLoad ForSelfPage');
  }


  goNextOfKin(){

  const value = this.medicaldetailsForm.value;

   this.storage.set('member_no', value.member_no);
   this.storage.set('scheme_name', value.scheme_name);  
   this.storage.set('partial_membership', value.partial_membership);
   this.storage.set('prefered_hospital', value.prefered_hospital);

    this.navCtrl.push('NextOfKinPage')
  }



}




































//  goMyaccount(){ 

//   const values = this.registerForm.value;
   
//   this.storage.set('org_id', values.org_id);
//   this.storage.set('student_no', values.student_no);
 
//   var headers = new Headers();
//   headers.append("Accept", 'application/json');
//   headers.append('Content-Type', 'application/json' );
//  //pass to back-end
//     var postData = this.registerForm.value;
//     //THIS IS A BETTER WAY TO MAKE API CALLS
//   this.urlService.editDetails(postData)
//   .subscribe(res => {
//    this.student_collection = res;
//       if (res.status=='OK') {
//       }
//   }, (err) => {
//       console.log(err);
//   });

//   let toast = this.toastCtrl.create({
//     message: 'Form edited successfully.',
//     duration: 3000,
//     position: 'bottom'
//   });
//   toast.onDidDismiss(() => {
//     console.log('Dismissed toast');
//   });
//   toast.present();
//   const loading= this.loadingCtrl.create({
//     content: "saving...",
//     duration: 700
//   });
//   loading.present();


//  this.navCtrl.setRoot("MyaccountPage");
//  }

































 // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);

  //   var Data = this.historyForm.value;
  //  // var postData = {id:val};

  //   this.urlService.companydetails(Data)
  //   .subscribe(res => {
  //     console.log(res);
  //     var reqId = res.request_id;

  //    this.history_collection = res;
  //       if (res.status=='OK') {
        
  //         this.storage.set('request_id', reqId);
  //         // localStorage.setItem('token', res.token);
  //         //this.navCtrl.setRoot('HomePage');
  //       }
  //   }, (err) => {
  //       console.log(err);
  //   }); 


  // this.id = navParams.get('data') ;
  //     this.User_Id = navParams.get('user_id') ;
  //     this.company_Id = navParams.get('company_id') ;

     
  //     this.storage.get('id').then((val) => {
  //       console.log(String(val));
  //       this.id = String(val);  
  //     });

 
  //     this.storage.get('user_id').then((val) => {
  //       console.log(String(val));
  //       this.  toConcat =   this.user_Id =String(val); 
  //     });

  //     this.storage.get('company_id').then((val) => {
  //       console.log(String(val));
  //       this.  toConcat =   this.company_Id =String(val); 
  //     });


  //     this.historyForm = formBuilder.group({
  //       // 'user_id': ['',],

  //       'user_id': [this.User_Id,],
  //       'id': [this.id,],
       
        
  //     })
  //     this.historyForm = formBuilder.group({
  //       // 'user_id': ['',],

        
  //       'company_id': ['1'],
       
  //     })