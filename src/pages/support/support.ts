import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, FormControl, } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';



import 'rxjs/add/operator/toPromise';





@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  
  data:any;


 nickname = '';
  addmessageForm: FormGroup;
  // messages = [];
  // nickname = '';
  message = '';
  name = '';

  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/imgs/avatar/support.png',
    username: 'MUFSAS Support',
  };

  user = {
    _id: '534b8fb2aa5e7afc1b23e69c',
    pic: 'assets/imgs/avatar/marty-avatar.png',
    username: 'Marty',
  };

  doneLoading = false;

  messages = [
    // {
    //   _id: 1,
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'OH CRAP!!'
    // },
    // {
    //   _id: 2,
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'what??'
    // },
    // {
    //   _id: 3,
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'Pretty long message with lots of content'
    // },
    // {
    //   _id: 4,
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'Pretty long message with even way more of lots and lots of content'
    // },
    // {
    //   _id: 5,
    //   date: new Date(),
    //   userId: this.user._id,
    //   username: this.user.username,
    //   pic: this.user.pic,
    //   text: 'what??'
    // },
    // {
    //   _id: 6,
    //   date: new Date(),
    //   userId: this.toUser._id,
    //   username: this.toUser.username,
    //   pic: this.toUser.pic,
    //   text: 'yes!'
    // }
  ];

  
  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;





  UserId :any;
  Id :any;
  toConcat:any;
  contactForm: FormGroup;
  contact_collection: any;
  user_id: any;
  User_Id :any;
  id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    private socket: Socket,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController 
   
    ) {
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      // this.Id = navParams.get('id') ;

      this.contactForm = formBuilder.group({
        'user_id': [this.User_Id],
        // 'id': [this.Id],

        // 'user_id': ['85'],
        'message': ['', ],
      })

      this.addmessageForm = formBuilder.group({
        'message': ['',],
       
      })


      this.messageForm = formBuilder.group({
        message: new FormControl('')
      });
      this.chatBox = '';
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ContactPage', { nickname: this.nickname});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');

  }

  



  goHome() {

    const values = this.contactForm.value;
    this.storage.set('message', values.message);

    //  this.storage.get('user_id').then((val) => {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);

      //var postData = {user_id:val};
      var postData = this.contactForm.value;

      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.contact(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.contact_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });


    const loader = this.loadingCtrl.create({
      content: "Sending message...",
      duration: 1200
    });
    loader.present();

    let toast = this.toastCtrl.create({
      message: 'Message sent! ',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();

    // let alert = this.alertCtrl.create({
    //   title: 'Message sent ',
    //   message: '',
    //   buttons: [
    //     {
    //       text: 'OK',
    //       handler: () => {
    //        alert.present();
    //       }
    //     }
    //   ]
    // });
  //  });
    //alert.present();
   // this.navCtrl.setRoot("HomePage");
  }


  goContactPage(){
    this.navCtrl.push('ContactPage')
  }

  goFaqPage(){
    this.navCtrl.push('FaqPage')
  }


  send(message) {
    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);

      const messageData =
        {
          toId: this.toUser._id,
          _id: 6,
          date: new Date(),
          userId: this.user._id,
          username: this.toUser.username,
          pic: this.toUser.pic,
          text: message
        };

      this.messages.push(messageData);
      this.scrollToBottom();

      setTimeout(() => {
        const replyData =
          {
            toId: this.toUser._id,
            _id: 6,
            date: new Date(),
            userId: this.toUser._id,
            username: this.toUser.username,
            pic: this.toUser.pic,
            text: 'Welcome to Respo'
          };
        this.messages.push(replyData);
        this.scrollToBottom();
      }, 2500);
    }
    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 2000);
  }


}
