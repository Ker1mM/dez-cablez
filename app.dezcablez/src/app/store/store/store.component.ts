import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  items$: Observable<IItem[]>;

  ngOnInit() {
   this.items$ = this.storeService.loadAllItems();
  }
}
