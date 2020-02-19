import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../interfaces/item';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { IValidCreate } from 'src/app/shared/interfaces/validResponse';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) { }

    getItem(id: string) {
        return this.http.get<IItem>(`${environment.API}/item/${id}`);
    }

    addItem(item: IItem) {
        return this.http.post<IValidCreate>(`${environment.API}/item/add`, item)
            .pipe(tap((res) => {
                console.log(res);
            }))
    }

    changeThumbnail(itemId: string, link: string) {
        return this.http.post(`${environment.API}/item/image/change`, { itemId, link });
    }
}

