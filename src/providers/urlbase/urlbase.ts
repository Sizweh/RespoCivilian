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
  //pass test on local
  history (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'userhistory', data)
      .pipe(
        tap(_ => this.log('userhistory')),
        catchError(this.handleError('userhistory', []))
      );
  }
  viewhistory (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'history', data)
      .pipe(
        tap(_ => this.log('history')),
        catchError(this.handleError('history', []))
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

  personalDetails (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'userDetails', data)
      .pipe(
        tap(_ => this.log('userDetails')),
        catchError(this.handleError('userDetails', []))
      );
  }
  medicalHistory (data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'userMedicalAid', data)
      .pipe(
        tap(_ => this.log('userMedicalAid')),
        catchError(this.handleError('userMedicalAid', []))
      );
  }
  nextofSkin(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'nextOfKin', data)
      .pipe(
        tap(_ => this.log('nextOfKin')),
        catchError(this.handleError('nextOfKin', []))
      );
  }
  getpenextOfKin(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'get_penextOfKin', data)
      .pipe(
        tap(_ => this.log('nextOfKin')),
        catchError(this.handleError('nextOfKin', []))
      );
  }

  
  contact(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'support', data)
      .pipe(
        tap(_ => this.log('support')),
        catchError(this.handleError('support', []))
      );
  }
  // specify(data): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + 'specify', data)
  //     .pipe(
  //       tap(_ => this.log('specify')),
  //       catchError(this.handleError('specify', []))
  //     );
  // }
  reset(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'resetPassword', data)
      .pipe(
        tap(_ => this.log('resetPassword')),
        catchError(this.handleError('resetPassword', []))
      );
  }
  upload(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updateUserProfile', data)
      .pipe(
        tap(_ => this.log('updateUserProfile')),
        catchError(this.handleError('updateUserProfile', []))
      );
  }
  addNext(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'addnextOfKin', data)
      .pipe(
        tap(_ => this.log('addnextOfKin')),
        catchError(this.handleError('addnextOfKin', []))
      );
  }
  editMedical(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updateMedicalHistory', data)
      .pipe(
        tap(_ => this.log('updateMedicalHistory')),
        catchError(this.handleError('updateMedicalHistory', []))
      );
  }
  editPersonal(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updatePersonal', data)
      .pipe(
        tap(_ => this.log('updatePersonal')),
        catchError(this.handleError('updatePersonal', []))
      );
  }
  editNext(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updateNextofKin', data)
      .pipe(
        tap(_ => this.log('updateNextofKin')),
        catchError(this.handleError('updateNextofKin', []))
      );
  }
  deleteNext(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deleteNextofKin', data)
      .pipe(
        tap(_ => this.log('deleteNextofKin')),
        catchError(this.handleError('deleteNextofKin', []))
      );
  }
  changePassword(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'changePassword', data)
      .pipe(
        tap(_ => this.log('changePassword')),
        catchError(this.handleError('changePassword', []))
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
