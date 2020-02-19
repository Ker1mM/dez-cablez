import { Component, OnInit } from '@angular/core';
import { changeDecimalSign, calculateTotalPrice } from 'src/app/shared/helpers/helper-functions';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart = [];
  totalPrice: string;

  constructor(private cartService: CartService) { 
  }
  
  ngOnInit() {
    this.cart = this.cartService.getCartContent();
    this.totalPrice = changeDecimalSign(calculateTotalPrice(this.cart)).num;
  }

  formatPrice(num: number): string {
    return changeDecimalSign(num).num;
  }

}
