import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5208/api/';
  currentUser = signal<User | null>(null);

  login(model:any){
    return this.http.post<User>(this.baseUrl+'Account/login',model).pipe(
      map(user => {
         if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
         }
         return user;
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'Account/register',model).pipe(
      map(user => {
         if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
         }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}