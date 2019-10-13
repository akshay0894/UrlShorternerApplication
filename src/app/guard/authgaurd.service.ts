import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot , CanActivate, UrlTree} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService  implements CanActivate{

constructor(private authService: AuthService, private router: Router){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 if (this.authService.isAuthenticated()) {
   return true;
 }
 this.router.navigate(['/login']);


 return false;
}
}
