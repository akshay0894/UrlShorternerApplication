import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login(user) {
    this.authService.login(user).subscribe((data) => {
      this.router.navigate(['/shorturl']);
      localStorage.setItem('user', JSON.stringify(data));
    });
  }

}
