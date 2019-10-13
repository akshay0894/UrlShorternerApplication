import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token;
    const user = JSON.parse(this.authService.isAuthenticated());
    if (!user) {
      return next.handle(req);
    }
    token = user.token;

    const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
    return next.handle(authRequest);
  }
}
