import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';
/**
 * Generated class for the NextOfKinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-of-kin',
  templateUrl: 'next-of-kin.html',
})
export class NextOfKinPage {

  nextofkinForm: FormGroup;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
    ) {

      this.nextofkinForm = formBuilder.group({

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'relationship': ['', Validators.compose([Validators.required])],
    
      })
      // this.registerForm.valid.;
      this.nextofkinForm = formBuilder.group({

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'relationship': ['', Validators.compose([Validators.required])],
    
      })
// this.registerForm.valid.;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextOfKinPage');

  }


  

  goVerifyAccount(){


    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });

 
   //pass to back-end
      // console.log(this.nextofkinForm.value);
      var postData = this.nextofkinForm.value;
      if (postData.password!= postData.confirmPassword) {
        this.alert.presentAlert("Notification", 'Passwords must match and minimum 6 values');
        return;
      }
      postData['user_role']=  "Civilian";


      //THIS IS A BETTER WAY TO MAKE API CALLS
      this.urlService.register(postData)
      .subscribe(res => {
        // this.presentToast(res.msg, res.status);
        console.log(res);
        // alert(res);ss
        this.alert.presentAlert("Notification", res.msg);
  
        if (res.status=='OK') {
          this.navCtrl.push("VerifyAccountPage");
          // localStorage.setItem('token', res.token);
        }
      }, (err) => {
        console.log(err);
      });

       //    this.http.post("http://46.101.169.33/api/civilian/registerCivilian", postData)
   
  //     .subscribe(data => {
  //      console.log(data);
  //       // alert("Done")
  //       var msg = data['msg'];
  //       var status = data['status'];
  //       if (status == "OK") {
  //         this.alert.presentAlert("Notification", msg);
  //         this.navCtrl.push("VerifyAccountPage");
  //        } //else {
  //       //   this.alert.presentAlert("Whoops!", 'User Taken');
  //       // }

  //      }, error => {
  //       console.log(error);
  //     });
  }
  
 

 

  goMedicalDetails(){
    this.navCtrl.setRoot('MedicalDetailsPage')
  }

}
