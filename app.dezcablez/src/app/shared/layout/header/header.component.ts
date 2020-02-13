import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/store/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private cartItemsCount = 0;

  constructor(private authSrvice: AuthService,
    private cookieService: CookieService,
    private cartService: CartService) { }


  get isLogged() { return this.authSrvice.isLoggedIn() }

  ngOnInit() {
    this.cartItemsCount = this.getCartQuantity();
    this.cartService.watchStorage().subscribe(data => {
      this.cartItemsCount = this.getCartQuantity();
    });
  }

  private getCartQuantity() {
    let currentCount = 0;
    let cartContent = this.cookieService.get('cart');
    if (!cartContent) {
      this.cookieService.set('cart', JSON.stringify({}));

      return 0;
    }

    let content = JSON.parse(cartContent);
    for (let item of Object.keys(content)) {
      currentCount += content[item].quantity;
    }

    return currentCount;
  }

}
