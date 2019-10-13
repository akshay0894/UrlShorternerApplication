import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 user: User = {
    fullName: '',
    email: '',
    password: ''
 };
 message = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  register(newuser: User) {
    this.authService.register(newuser).subscribe(data => {
      this.message = 'registered Successfully . Continue to login';
    }, (error) => {
      this.message = 'something wrong! try again';
    });
  }

}
