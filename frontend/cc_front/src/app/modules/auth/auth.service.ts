import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
    });
    user$ = new BehaviorSubject(null);
    userState$ = this.user$.asObservable();
    url="https://de4qepe40m.execute-api.eu-north-1.amazonaws.com/prod"
  
    constructor(private http: HttpClient) {
    }
  
    login(auth: any): Observable<any> {
      return this.http.post<any>(this.url+"/login_user", auth, {
        headers: this.headers,
      });
    }

    signUp(user: any): Observable<any> {
      return this.http.post<any>(this.url+"/register_user", user, {
        headers: this.headers,
      });
    }

    signUpMember(user: any): Observable<any> {
      return this.http.post<any>(this.url+"/register_member", user, {
        headers: this.headers,
      });
    }

    verifyMember(user: any): Observable<any> {
      return this.http.post<any>(this.url+"/share_content_member", user, {
        headers: this.headers,
      });
    }

    logout(): Observable<string> {
      return this.http.get(environment.apiHost + 'api/logout', {
        responseType: 'text',
      });
    }

  
  
    getUsername(): any{
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const id = helper.decodeToken(accessToken).preferred_username;
      return id;
    }

     isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }


  setUser(): void {
    if (this.isLoggedIn()) {
      const accessToken: string = localStorage.getItem('user') || '';
      const helper = new JwtHelperService();
      const sub = helper.decodeToken(accessToken).sub;
      this.user$.next(sub);
    }
    else {
      this.user$.next(null);
    }
  
  }

  
}
