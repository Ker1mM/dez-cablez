import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IItem } from '../interfaces/item';
import { tap } from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import { changeDecimalSign } from 'src/app/shared/helpers/helper-functions';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  items: IItem[];

  ngOnInit() {
    this.storeService.loadAllItems().subscribe(
      (data: IItem[]) => {
        this.items = data;
      },
      (error) => {

      })
  }

  
  getPrice (price: number) {
    return changeDecimalSign(price).intPart;
  }

  getPrecision(price: number) {
    return changeDecimalSign(price).decimalPart;
  }
}
