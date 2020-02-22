import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { IOrder } from 'src/app/core/interfaces/order';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private subscription: Subscription;


  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }

  cart = [];
  totalPrice: number;

  ngOnInit() {
    this.cart = this.cartService.getCartContent();
    this.totalPrice = this.cart.reduce((acc, cur) => (acc + (cur.quantity * cur.price)), 0);
  }

  order() {
    let orderItems = [];
    for (let item of this.cart) {
      orderItems.push({
        itemId: item.itemId,
        quantity: item.quantity,
        unitPrice: item.price
      });
    }

    let order: IOrder = {
      orderItems
    }

    this.subscription = this.orderService.sendOrder(order).subscribe((data) => {
      this.cartService.clearCart();
      this.router.navigate(['profile']);
    });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
