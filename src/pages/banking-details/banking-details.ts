import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators,  } from '@angular/forms'; 
import { AlertsProvider } from './../../providers/alerts/alerts';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the BankingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-banking-details',
  templateUrl: 'banking-details.html',
})
export class BankingDetailsPage {
  remembertoken: boolean;

  registerForm: FormGroup;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alert: AlertsProvider,
    public http: HttpClient,
    public formBuilder: FormBuilder,
    ) { 

      this.registerForm = formBuilder.group({

      'credit/debitCard': ['', Validators.compose([Validators.required])],
      'cardholderName': ['', Validators.compose([Validators.required])],
      'expiryDate': ['', Validators.compose([Validators.required])],
      'cvc': ['', Validators.compose([Validators.required])],


    })
   // this.registerForm.valid.;
    }
  updateToken() {
    console.log('Remember token new state:' + this.remembertoken);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankingDetailsPage');
  }

  goVerifyAccount(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
      // console.log(this.registerForm.value);
      var postData = this.registerForm.value;
      if (postData.password!= postData.confirmPassword) {
        this.alert.presentAlert("Notification", 'Passwords must match and minimum 6 values');
        return;
      }
      postData['user_role']=  "Civilian";
     this.http.post("http://46.101.169.33/api/civilian/registerCivilian", postData)
   
      .subscribe(data => {
       console.log(data);
        // alert("Done")
        var msg = data['msg'];
        var status = data['status'];
        if (status == "OK") {
          this.alert.presentAlert("Notification", msg);
          this.navCtrl.push("VerifyAccountPage");
         } //else {
        //   this.alert.presentAlert("Whoops!", 'User Taken');
        // }

       }, error => {
        console.log(error);
      });
  }

  goNextOfKin(){
    this.navCtrl.push("NextOfKinPage");
         }
  goFaq(){
    this.navCtrl.push("FaqPage");
         }

}
