import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.css']
})
export class ShorturlComponent implements OnInit {
  urlObject = {
    longurl: '',
};
 shorturl = '';
  constructor(private http: HttpClient, private authService: AuthService) {
  }

ngOnInit() {
  }

addUrl(form: NgForm) {
    this.urlObject = { longurl: form.value.longUrl};
    this.http.post<{longurl: string, shorturl: string}>('/shorten', this.urlObject)
    .subscribe((responseData)  => {
     this.shorturl = responseData.shorturl;
     form.reset();
    });
  }

  logout() {
    this.authService.logout();
  }
}
