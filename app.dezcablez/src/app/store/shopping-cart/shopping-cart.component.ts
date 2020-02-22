import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart = [];
  totalPrice: number;

  constructor(private cartService: CartService,
    private router: Router) { 
  }
  
  ngOnInit() {
    this.cart = this.cartService.getCartContent();
    this.totalPrice = this.cart.reduce((acc, cur) => (acc + (cur.quantity * cur.price)), 0);
  }

  emptyCart(){
    this.cartService.clearCart();
    this.cart = this.cartService.getCartContent();
  }
}
