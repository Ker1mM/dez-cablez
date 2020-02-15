import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AddItemComponent } from './item/add-item/add-item.component';
import { DetailsComponent } from './item/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormatPricePipe } from './pipes/format-price.pipe';



@NgModule({
  declarations: [
    StoreComponent,
    AddItemComponent,
    DetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    FormatPricePipe
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
