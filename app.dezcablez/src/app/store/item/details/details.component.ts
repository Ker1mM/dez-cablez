import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { IItem } from '../../interfaces/item';
import { CartService } from '../../services/cart.service';
import { ImageService } from '../../services/imageService';
import { flatMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private _imageFile: File;
  private _unsubscribe$ = new Subject<void>();
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private router: Router,
    private imageService: ImageService,
    private authService: AuthService) { }

  itemId: string;
  item: IItem;

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(paramMap => {
        this.itemId = paramMap.get('id');
      })
    this._loadItem();

  }

  private _loadItem() {
    this.itemService.getItem(this.itemId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (data) => {
          this.item = data;
        },
        (error) => {
          this.router.navigate(['404'])
        }
      )
  }

  get isLogged() {
    return this.authService.isLoggedIn();
  }

  buy() {
    this.cartService.addItem(this.item.id, this.item.name, this.item.price, this.item.thumbnail);
    this.item.stock--;
  }

  imageInputChange(imageInput: any) {
    this._imageFile = imageInput.files[0];
  }

  addImage() {
    let infoObject = {
      title: this.item.id,
      description: this.item.name,
    }

    this.imageService.uploadImage(this._imageFile, infoObject).pipe(
      flatMap((res1) => this.itemService.changeThumbnail(this.item.id, res1['data'].link)))
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (data) => {
          this._loadItem();
          this.imageInput.nativeElement.value = null;
        });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
