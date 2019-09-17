import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';




@IonicPage()
@Component({
  selector: 'page-history1',
  templateUrl: 'history1.html',
})
export class History1Page {

  historyForm: FormGroup;
  history1Form: FormGroup;
  history_collection: any;
  history1_collection: any;
  id: any;
  User_Id: any;
  responderName: any;
  responderId: any;

  selectedResponder: any; 
  responderDistance: any;
  civilianLat: any;
  civilianLng: any;
  infoWindow: any;
  map: any;
  reqId: any;
  compId: any;
  request_id: any;
  company_Id: any;
  toConcat: string;
  user_id: string;
  company_id: string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public callNumber: CallNumber,
    public contacts: Contacts,
    public formBuilder: FormBuilder,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public view: ViewController,
    ) {

     

      

      this.storage.get('selected_responder').then((val) => {

        console.log('cd db stuff');
        console.log(val);
        this.selectedResponder = val;
        this.responderId = val.id;
        this.request_id = val.reqId;
        this.responderName= val.driver_name;

        this.storage.get('request_id');
  
      });

        this.storage.get('id').then((val) => {
        console.log(String(val));
        this.id = String(val);  
      });

        this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.user_id = String(val);  
      });

        this.storage.get('company_id').then((val) => {
        console.log(String(val));
        this.company_id = String(val);  
      });
      

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      this.company_Id = navParams.get('company_id') ;
     
      this.historyForm = formBuilder.group({
     

        'user_id': [this.User_Id,],
        'id': [this.id,],
        
        
      })
      this.history1Form = formBuilder.group({
   
        'company_id': [this.company_Id],
        // 'user_id': [this.User_Id,],
        // 'id': [this.id,],
     
        
      })
  }




  
  ionViewDidLoad() {
    console.log('ionViewDidLoad History1Page');

    


      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
    //  const requestOptions = new RequestOptions({ headers: headers });
     
     //pass to back-end
      //  console.log(this.historyForm.value);

      var postData = this.historyForm.value;
        // var postData = {user_id:val};
         //var postData = {id:val};
  
        //THIS IS A BETTER WAY TO MAKE API CALLS
      this.urlService.viewhistory(postData)
      .subscribe(res => {
          // this.presentToast(res.msg, res.status);
         // console.log(res.id);
          //console.log(res.drop_off);
         // this.alert.presentAlert("Notification", res.msg);
       this.history_collection = res;
          if (res.status=='OK') {
            // localStorage.setItem('token', res.token);
            //this.navCtrl.setRoot('HomePage');
          }
      }, (err) => {
          console.log(err);
      });

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
    //  const requestOptions = new RequestOptions({ headers: headers });
     
     //pass to back-end
      //  console.log(this.historyForm.value);
  
     var postData = this.history1Form.value;
    
      this.urlService.companydetails(postData)
      .subscribe(res => {
        console.log(res);
        var reqId = res.request_id;
  
       this.history1_collection = res;
          if (res.status=='OK') {
          
            this.storage.set('request_id', reqId);
            // localStorage.setItem('token', res.token);
            //this.navCtrl.setRoot('HomePage');
          }
      }, (err) => {
          console.log(err);
      }); 
  

  }



  ionViewWillLoad() {
 
 
    }








    goLanding(){



      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
    //  const requestOptions = new RequestOptions({ headers: headers });
     
     //pass to back-end
      //  console.log(this.historyForm.value);
  
     var postData = this.historyForm.value;
    
      this.urlService.companydetails(postData)
      .subscribe(res => {
        console.log(res);
        var reqId = res.request_id;
  
       this.history1_collection = res;
          if (res.status=='OK') {
          
            this.storage.set('request_id', reqId);
            // localStorage.setItem('token', res.token);
            //this.navCtrl.setRoot('HomePage');
          }
      }, (err) => {
          console.log(err);
      }); 


   // this.navCtrl.push('LandingPage')
  }



  // goLanding(company_id){ 

   
        
  //   // this.navCtrl.push("LandingPage", {
   
  //   //   company_id:company_id
  //   // });
 
  //   }


}
