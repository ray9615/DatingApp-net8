import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  
  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+ 'User');
  }

  getMember(username:string){
    return this.http.get<Member>(this.baseUrl+'User/'+username);
  }

  updateMember(member:Member){
    //return this.http.put(this.baseUrl+'User', member);
    return this.http.put(this.baseUrl + 'User', member)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

