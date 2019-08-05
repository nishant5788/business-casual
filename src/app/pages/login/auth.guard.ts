import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { loginService } from './login.service';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private loginService: loginService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean | UrlTree>  
    {
        return this.loginService.user.pipe(take(1),map(user => {
            const isAuth =  !!user;
            if(isAuth) {
                return true
            }

            return this.router.createUrlTree(['/login']);
        }))
    }
}