import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { FormGroup, FormBuilder, FormControl, } from '@angular/forms';




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
 
 
    public formBuilder: FormBuilder,

   
    ) {
      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;


      this.contactForm = formBuilder.group({
        'user_id': [this.User_Id],
        'message': ['', ],
      })

      this.messageForm = formBuilder.group({
        message: new FormControl('')
      });
      this.chatBox = '';
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');

  }

  send(message) {
    if (message && message !== '') {


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
            text: 'Dear valued user, thank you for sending us a message. Our team will get back to you via your email as soon as possible.'
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
