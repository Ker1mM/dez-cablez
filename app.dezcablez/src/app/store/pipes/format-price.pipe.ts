import { Pipe, PipeTransform } from '@angular/core';
import { StoreService } from '../services/store.service';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  //returns number fixed to 2 decimal points
  //if extra parameter is intPart returns only the int part
  //if extra parameter is decimalPart returns only the decimal part
  transform(value: number, type: string): string {
    let fixedNumber = value.toFixed(2);
    let intPart = fixedNumber.split('.')[0];
    let decimalPart = fixedNumber.split('.')[1];
    let result = `${intPart},${decimalPart}`


    if (type === 'intPart') {
      return intPart;
    }
    else if (type === 'decimalPart') {
      return decimalPart;
    }

    return result;
  }

}