import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,} from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-banking-details',
  templateUrl: 'banking-details.html',
})
export class BankingDetailsPage {



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,

 
    ) {
      
  

    }

  ionViewDidLoad() {


    console.log('ionViewDidLoad BankingDetailsPage');
  }





 

  




 

}












 // goMyaccount(id) {

  //   this.storage.get('user_id').then((val) => {
  //     console.log(String(val));
  //     this.user_id = String(val);

  //     const values = this.registerForm.value;

  //     this.storage.set('org_id', values.org_id);
  //     this.storage.set('student_no', values.student_no);

  //     var headers = new Headers();
  //     headers.append("Accept", 'application/json');
  //     headers.append('Content-Type', 'application/json');

  //     // pass to back-end
  //     console.log(this.registerForm.value);
  //     var collection = {
  //       user_id: val,
  //       org_id: values.org_id,
  //       student_no: values.student_no
  //     };
     
  //   // THIS IS A BETTER WAY TO MAKE API CALLS
  //      this.urlService.orgList(collection)
  //      .subscribe(res => {
  //       console.log(res);
  //        if (res.status=='OK') {
  //       }
  //      }, (err) => {
  //        console.log(err);
  //      });

  //         const loading= this.loadingCtrl.create({
  //       content: "Saving...",
  //       duration: 3000
  //     });
  //     loading.present();
  //     let alert = this.alertCtrl.create({
  //       title: 'Student Details',
  //       message: 'Student details stored successfully. ',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: () => {
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   });
  //   this.navCtrl.setRoot("MyaccountPage");
  // }

























//   this.socialSharing.canShareViaEmail().then(() => {
//     // Sharing via email is possible
//   }).catch(() => {
//     // Sharing via email is not possible
//   });
  
//  // Share via email
//   let socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
//     // Success!
//   }).catch(() => {
//     // Error!
//   });











// shareWhatsapp() {

// this.socialSharing.shareViaWhatsApp(this.text, null)
// .then(()=>{

// }).catch(()=>{

// });

// }

// shareFacebook() {

// this.socialSharing.shareViaFacebook(this.text, null ,this.url)
// //this.socialSharing.canShareVia('Facebook', null ,this.url)
// .then(()=>{

// }).catch(()=>{

// });

// }

// linkedInShare() {

// this.socialSharing.share(this.text, null ,this.url)
// .then(()=>{

// }).catch(()=>{

// });

// }
// smsShare() {

// this.socialSharing.shareViaSMS(this.message,null)
// .then(()=>{

// }).catch(()=>{

// });

// }

// twitterShare() {

// this.socialSharing.shareViaTwitter(this.text, null ,this.url)
// .then(()=>{

// }).catch(()=>{

// });

// }

// emailShare() {

// this.socialSharing.share(this.text,null)
// .then(()=>{

// }).catch(()=>{

// });

// }



// whatsappShare(link){
//  //var url  = this.shareViaWhatsApp(url);
//   // this.socialSharing.shareViaWhatsApp(msg,');
//    this.socialSharing.shareViaWhatsApp(link ,"https://respo.co.za/download/");
//  }


//  facebookShare(url){
//   //  var url  = this.compileurl(index);
//     this.socialSharing.shareViaFacebook(url, 'https://respo.co.za/download/');
//   }