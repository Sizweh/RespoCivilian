import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/**
 * Generated class for the EditRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-registration',
  templateUrl: 'edit-registration.html',
})
export class EditRegistrationPage {
  editRegistrationForm: FormGroup;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,


     ) {
      this.editRegistrationForm = formBuilder.group({

        'fullName': ['', Validators.compose([Validators.required])],
        'gender': ['', Validators.compose([Validators.required])],
       
        'myDate': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        // 'Email': ['', Validators.compose([Validators.required])],
        'Email': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],

        'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
        'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],

      })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRegistrationPage');
  }
  goMyaccount(){
    this.navCtrl.setRoot('MyaccountPage')
  }

  goEditsuccessfully(){
    this.navCtrl.setRoot('EditsuccessfullyPage')
  }


}
