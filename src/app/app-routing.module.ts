import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Auth } from './shared/class/auth/auth';
import { CommentsComponent } from './views/comments/comments.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileViewComponent } from './views/profileview/profileview.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [Auth] },
  { path: 'profileview', component: ProfileViewComponent, canActivate: [Auth] },
  { path: 'comments', component: CommentsComponent, canActivate: [Auth] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
