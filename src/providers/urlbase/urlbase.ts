import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
/*
/*
  Generated class for the UrlbaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlbaseProvider {
  //  apiUrl = 'http://46.101.169.33/api/civilian/';
   apiUrl = 'http://127.0.0.1:8000/api/civilian/';
  constructor(public http: HttpClient) {
    console.log('Hello UrlbaseProvider Provider');
  }

  requestNewPassword (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'requestNewPassword', data)
      .pipe(
        tap(_ => this.log('loginCivilian')),
        catchError(this.handleError('loginCivilian', []))
      );
  }

  confrmForgotPassword (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'confrmForgotPassword', data)
      .pipe(
        tap(_ => this.log('confrmForgotPassword')),
        catchError(this.handleError('confrmForgotPassword', []))
      );
  }

  //pass test on local
  login (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'loginCivilian', data)
      .pipe(
        tap(_ => this.log('loginCivilian')),
        catchError(this.handleError('loginCivilian', []))
      );
  }

  //pass test on local
  register (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'registerCivilian', data)
      .pipe(
        tap(_ => this.log('registerCivilian')),
        catchError(this.handleError('registerCivilian', []))
      );
  }

    //pass test on local, verify page
  activate (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'activateCivilian', data)
      .pipe(
        tap(_ => this.log('activateCivilian')),
        catchError(this.handleError('activateCivilian', []))
      );
  }

  updatePlayerId (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updatePlayerId', data)
      .pipe(
        tap(_ => this.log('updatePlayerId')),
        catchError(this.handleError('updatePlayerId', []))
      );
  }

  //pass test on local, select-responder page
  showalldrivers (): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'showalldrivers')
      .pipe(
        tap(_ => this.log('showalldrivers')),
        catchError(this.handleError('showalldrivers', []))
      );
  }

  //pass test on local, confirm page
  makeRequest (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'makeRequest', data)
      .pipe(
        tap(_ => this.log('makeRequest')),
        catchError(this.handleError('makeRequest', []))
      );
  }

  //pass test on local, confirm page
  //fail on live, url maybe isnt on back end
  checkRespoAccept (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'checkRespoAccept', data)
      .pipe(
        tap(_ => this.log('checkRespoAccept')),
        catchError(this.handleError('checkRespoAccept', []))
      );
  }

 
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }


}
