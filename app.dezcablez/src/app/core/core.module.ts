import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './user/profile/profile.component';
import { CoreRoutingModule } from './core-routing.module';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileNavigationComponent } from './user/profile-navigation/profile-navigation.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { FirstOrDefaultPipe } from './pipes/firstordefault.pipe';



@NgModule({
  declarations: [HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrdersComponent,
    ProfileNavigationComponent,
    AddressesComponent,
    FirstOrDefaultPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule
  ],
  exports: [

  ]
})
export class CoreModule { }
