import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAddress } from 'src/app/store/interfaces/address';
import { UserService } from '../../services/user.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  countries: string[] = ['Bulgaria'];
  submitted: boolean = false;
  addFormVisible = false;
  addresses: IAddress[] = [];
  selectedAddressId: string = '0';



  constructor(private fb: FormBuilder,
    private userService: UserService) { }


  addForm = this.fb.group({ //TODO: Add more validations
    nickname: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', [Validators.required]],
    address1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(220)]],
    address2: ['', [Validators.minLength(2), Validators.maxLength(220)]],
    phone: ['', Validators.required]
  })

  ngOnInit() {
    this.loadAddresses();
  }

  get f() { return this.addForm.controls; } //easy access to fields


  toggle() {
    this.addFormVisible = this.addFormVisible ? false : true;
  }

  loadAddresses() {
    this.userService.getUserAddresses()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.addresses = data;
      })
  }

  handleSubmit() {
    this.submitted = true;
    
    if (this.addForm.invalid) {
      return;
    }

    let address: IAddress = {
      nickname: this.addForm.value.nickname,
      country: this.addForm.value.country,
      city: this.addForm.value.city,
      postalCode: this.addForm.value.postalCode,
      address1: this.addForm.value.address1,
      address2: this.addForm.value.address2,
      phone: this.addForm.value.phone,
    }

    this.userService.addUserAddress(address)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.loadAddresses();
        this.addForm.reset();
        this.addFormVisible = false;
        this.selectedAddressId = data.id;
        this.submitted = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
