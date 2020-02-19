import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orders$: Observable<IOrder>;

  ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }

}
