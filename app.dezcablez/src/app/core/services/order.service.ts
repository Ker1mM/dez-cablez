import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order';
import { IValidCreate } from 'src/app/shared/interfaces/validResponse';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  getAllOrders() {
    return this.http.get<IOrder>(`${environment.API}/user/order/all`)
    .pipe(tap(x => {console.log(x)}));
  }

  sendOrder(order: IOrder) {
    return this.http.post<IValidCreate>(`${environment.API}/user/order/add`, order);
  }
}
