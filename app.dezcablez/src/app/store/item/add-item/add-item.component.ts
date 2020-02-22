import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { IItem } from '../../interfaces/item';
import { ɵNgStyleImpl } from '@angular/common';
import { Router } from '@angular/router';
import { resources } from 'src/app/shared/resources';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemTypes: string[] = ['Cable', 'Connector', 'Paracord', 'Sleeve', 'Other'];

  validIdPattern = '^[0-9a-zA-Z\-]+$';
  extraFields = 0;
  submitted = false;
  extraFieldItems: FormArray;
  private subscription: Subscription;

  addItemForm = this.fb.group({
    itemId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern(this.validIdPattern)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(220)]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]],
    stock: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
    extras: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router) {
  }

  ngOnInit() {
  }

  createExtraField(): FormGroup {
    return this.fb.group({
      extraName: ['', [Validators.required]],
      extraValue: ['', [Validators.required]]
    });
  }

  addExtraField(): void {
    if (this.extraFields < 7) {
      this.extraFields++;
      this.extraFieldItems = this.addItemForm.get('extras') as FormArray;
      this.extraFieldItems.push(this.createExtraField());
    }
  }

  removeExtraField(): void {
    if (this.extraFields > 0) {
      this.extraFields--;
      this.extraFieldItems.removeAt(this.extraFields);
    }
  }

  get f() { return this.addItemForm.controls; } //easy access to fields

  get extraFieldControls() {
    return this.addItemForm.get('extras')['controls'];
  }

  handleSubmit() {

    this.submitted = true;
    if (this.addItemForm.invalid) {
      return;
    }

    let item: IItem = {
      id: this.addItemForm.value.itemId,
      name: this.addItemForm.value.name,
      description: this.addItemForm.value.description,
      type: this.addItemForm.value.type,
      price: this.addItemForm.value.price,
      stock: this.addItemForm.value.stock,
      thumbnail: resources.DefaultThumbnail
    }

    for (let i = 0; i < this.addItemForm.value.extras.length; i++) {
      let name = `extra${i + 1}Name`;
      let value = `extra${i + 1}Value`;

      item[name] = this.addItemForm.value.extras[i].extraName;
      item[value] = this.addItemForm.value.extras[i].extraValue;
    }

    this.subscription = this.itemService.addItem(item)
      .subscribe((res) => {
        this.router.navigate([`item/${res.id}`])
      }, (error) => {
        if (error.source === 'id') {
          this.f.itemId.setErrors({ taken: true })
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
