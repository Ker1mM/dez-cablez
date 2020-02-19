import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IItem } from '../interfaces/item';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private cookieService: CookieService) { }

    private cartSub = new Subject<String>();

    watchStorage(): Observable<any> {
        return this.cartSub.asObservable();
    }

    getCartContent() {
        let content = this.cookieService.get('cart');
        let cartContent = [];
        if (content) {
            let cart = JSON.parse(content);
            let keys = Object.keys(cart);

            for (let key of keys) {
                cartContent.push({
                    itemId: key,
                    name: cart[key].name,
                    quantity: cart[key].quantity,
                    thumbnail: cart[key].thumbnail,
                    price: cart[key].price
                });
            }
        }

        return cartContent;
    }

    addItem(id: string, name: string, price: number, thumbnail: string) {

        let cartContent = this.cookieService.get('cart');
        let cart = {};
        if (!cartContent) {
            this.cookieService.set('cart', JSON.stringify({}));
            cartContent = '{}';
        }

        cart = JSON.parse(cartContent);
        if (cart[id]) {
            cart[id].quantity++;
        } else {
            cart[id] = { name, price, thumbnail, quantity: 1 };
        }
        this.cookieService.set('cart', JSON.stringify(cart));
        this.cartSub.next('changed');
    }

    removeItem(id: string) {
        let cart = JSON.parse(this.cookieService.get('cart'));

        if (cart[id]) {
            if (cart[id] <= 1) {
                delete cart[id];
            } else {
                cart[id]--;
            }
            this.cookieService.set('cart', JSON.stringify(cart));
            this.cartSub.next('changed');
        }
    }

    clearCart(){
        this.cookieService.set('cart', '');
        this.cartSub.next('changed');
    }
}

