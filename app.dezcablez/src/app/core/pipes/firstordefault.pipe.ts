import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstordefault'
})

//returns first object inside 'value' array that has property
//name equal to 'prop' with value equal to 'toFind'
export class FirstOrDefaultPipe implements PipeTransform {

  transform(value: any[], prop: string, toFind: any): any {
    let result = value.find(x => x[prop] === toFind);

    return result;
  }

}
