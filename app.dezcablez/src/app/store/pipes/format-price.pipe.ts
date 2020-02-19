import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../services/store.service';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any { //TODO: change all template functions with pipes
    return null;
  }

}