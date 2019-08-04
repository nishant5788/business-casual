import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { LoginUser } from './login-user.model';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
    }

@Injectable({
    providedIn: 'root'
})
export class loginService {

    user = new BehaviorSubject<LoginUser>(null);
    private tokenExpirationTimer: any;

    constructor(
    private http: HttpClient,
    private router: Router
    ) {}


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAcGpyddOoFSqkQ3DdsfLy8aNLJ0-oq47k', 
        {
           email: email,
           password: password,
           returnSecureToken: true
       }
        )
        .pipe(
         catchError(this.errorHandling),
         tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
         })
         );
    }


    logout() {
        this.user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }
  
  
      autoLogout(expirationDuration: number) {
       this.tokenExpirationTimer =  setTimeout(() => {
          this.logout();
        }, (expirationDuration));
      }
  
      autoLogin() {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        console.log("userData from Autologin is" +userData);
        
        if (!userData) {
          return;
        }
  
        const loadedUser = new LoginUser(
          userData.email, 
          userData.id, 
          userData._token,
          new Date(userData._tokenExpirationDate));
  
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  
          // This token property is from Getter stored in User Model
          if(loadedUser.token) {
            this.user.next(loadedUser);
            this.autoLogout(expirationDuration);
          }
      }


    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new LoginUser(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
       }


    private errorHandling(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }

}