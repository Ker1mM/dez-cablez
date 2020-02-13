import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AddItemComponent } from './item/add-item/add-item.component';
import { DetailsComponent } from './item/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    StoreComponent,
    AddItemComponent,
    DetailsComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
