import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private router: Router, private http: HttpClient) {}
  register(user) {
      return this.http.post('/register', user);
  }

  login(user) {
     return this.http.post('/login', user);
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return localStorage.getItem('user');
  }
}
