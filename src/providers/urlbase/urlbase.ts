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
   // apiUrl = 'http://46.101.169.33/api/civilian/';
   apiUrl = 'http://127.0.0.1:8000/api/civilian/';
  constructor(public http: HttpClient) {
    console.log('Hello UrlbaseProvider Provider');
  }
  login (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'loginCivilian', data)
      .pipe(
        tap(_ => this.log('loginCivilian')),
        catchError(this.handleError('loginCivilian', []))
      );
  }

  // showMyRequests (data): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + 'myRequests', data)
  //     .pipe(
  //       tap(_ => this.log('myRequests')),
  //       catchError(this.handleError('myRequests', []))
  //     );
  // }

  // acceptRequest (data): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + 'acceptRequest', data)
  //     .pipe(
  //       tap(_ => this.log('myRequests')),
  //       catchError(this.handleError('myRequests', []))
  //     );
  // }
  

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
