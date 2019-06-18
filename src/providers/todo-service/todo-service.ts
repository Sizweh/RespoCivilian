import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppSettingsProvider } from "../../providers/app-settings/app-settings";

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class TodoServiceProvider {

    apiUrl = this.appSettings.getApiURL();
  constructor(public http: HttpClient, public appSettings: AppSettingsProvider

    
    ) {
    console.log('Hello TodoServiceProvider Provider');
  }


public getTodos() {
  return this.http.get(this.apiUrl + 'todos')
  .map(res => res.json().result);
}

public addTodo(newTodo) {
  return this.http.post(this.apiUrl + 'todos', {'text': newTodo})
    .map(res => res.json());
}

public deleteTodo(todoId) {
  return this.http.delete(this.apiUrl + 'todos/' + todoId)
    .map(res => res.json());
}


}
