import { Component } from "@angular/core";
import { IonicPage,NavController,NavParams, ModalController} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { AlertController, ToastController } from 'ionic-angular'


import { TodoServiceProvider } from "../../providers/todo-service/todo-service";
@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  todos: Observable<any>;
  
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController, 
    public toastCtrl: ToastController,
    public todoService: TodoServiceProvider
  ) { 
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: "Enter the text for your new todo",
      inputs: [
        {
          name: 'text',
          placeholder: 'Buy Milk'
        },
      ],

      buttons: [
        {
          text: 'Cancel'
        },

        {
          text: 'Save',
          handler: data => {
            this.todoService.addTodo(data.text).subscribe(data => {
              this.showToast(data.msg);
              this.loadTodos();
            });
          }
        }
      ]
    });
    prompt.present();
  }


  removeTodo(id) {
    this.todoService.deleteTodo(id).subscribe(data => {
      this.showToast(data.msg);
      this.loadTodos();
    })
  }


  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
 


}