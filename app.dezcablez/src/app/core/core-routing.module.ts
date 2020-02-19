import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileNavigationComponent } from './user/profile-navigation/profile-navigation.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: {
            isLoggedIn: false
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: {
            isLoggedIn: false
        }
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ProfileNavigationComponent
            },
        ]
    },
];

export const CoreRoutingModule = RouterModule.forChild(routes);
