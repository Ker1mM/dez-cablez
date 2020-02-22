import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('orderTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders$: Observable<IOrder>;

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }

}
