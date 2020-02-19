import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { changeDecimalSign, calculateTotalPrice } from 'src/app/shared/helpers/helper-functions';
import { IOrder } from 'src/app/core/interfaces/order';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }

  cart = [];
  totalPrice: number;

  ngOnInit() {
    this.cart = this.cartService.getCartContent();
    this.totalPrice = calculateTotalPrice(this.cart);
  }

  formatPrice(num: number) {
    return changeDecimalSign(num).num;
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
    console.log(order); //TODO: unsub
    this.orderService.sendOrder(order).subscribe((data) => {
      this.cartService.clearCart();
      this.router.navigate(['profile']);
    });
  }
}
