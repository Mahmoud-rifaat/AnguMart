import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productData!: IProduct;
  @Output() item = new EventEmitter();

  isAddBtnOppened: boolean = false;
  amount: number = 1;

  ngOnInit(): void { }

  addToCart() {
    this.item.emit({ item: this.productData, quantity: this.amount });
  }
}
