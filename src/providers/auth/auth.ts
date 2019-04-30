
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]

})




@Injectable()
export class AuthProvider {
    login: any;

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

}