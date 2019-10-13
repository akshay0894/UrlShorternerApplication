import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShorturlComponent } from './shorturl/shorturl.component';
import { AuthGaurdService } from './guard/authgaurd.service';

export const APPROUTES: Routes = [
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'shorturl', canActivate: [AuthGaurdService], component: ShorturlComponent},
{path: '', redirectTo: 'login', pathMatch: 'full'}
];
