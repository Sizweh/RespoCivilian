import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://127.0.0:3001'
}

@Injectable()
export class AppSettingsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AppSettingsProvider Provider');
  }

  public getApiURL() {
    return CONFIG.apiUrl;
  }
}
