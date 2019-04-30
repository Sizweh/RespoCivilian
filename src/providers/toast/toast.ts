// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  toast: Toast;

  constructor(
    // public http: HttpClient,
    public toastCtrl: ToastController
    ) {
    console.log('Hello ToastProvider Provider');
  }

  create(message, ok = false, duration = 2000) {
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message,
      duration: ok ? null : duration,
      position: 'bottom',
      showCloseButton: ok,
      closeButtonText: 'OK'
    });
    this.toast.present();
  }

}