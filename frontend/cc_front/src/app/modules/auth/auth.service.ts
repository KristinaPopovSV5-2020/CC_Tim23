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
  
    constructor(private http: HttpClient) {
      this.user$.next(this.getRole());
    }
  
    login(auth: any): Observable<Token> {
      return this.http.post<Token>(environment.apiHost + 'api/user/login', auth, {
        headers: this.headers,
      });
    }

    getRole(): any {
      if (this.isLoggedIn()) {
        const accessToken: any = localStorage.getItem('user');
        const helper = new JwtHelperService();
        const role = helper.decodeToken(accessToken).role[0].name;
        return role;
      }
      return null;
    }
  
    getId(): any{
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const id = helper.decodeToken(accessToken).id;
      return id;
    }

     isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  getUrlPath(): string {
    if (this.getRole() =="ROLE_USER") {
        return "user";
    }else if (this.getRole() == "ROLE_ADMIN") {
      return "admin";
    }
    return "";
  }

  
}
