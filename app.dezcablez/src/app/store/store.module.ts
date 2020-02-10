import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AddItemComponent } from './item/add-item/add-item.component';
import { DetailsComponent } from './item/details/details.component';



@NgModule({
  declarations: [
    StoreComponent,
    AddItemComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
