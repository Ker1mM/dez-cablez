import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { combineAll } from 'rxjs/operators';
import { ProfileComponent } from './core/user/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
