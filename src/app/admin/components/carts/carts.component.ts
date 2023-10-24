import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  constructor(private CartsService: CartsService, private build: FormBuilder, private productsService: ProductsService) { }
  carts: any[] = [];
  isCartDeleted: boolean = false;

  productsInViewedCart: any[] = [];

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: ['']
    })

    this.getAllCarts();
  }



  getAllCarts() {
    this.CartsService.getAllCarts().subscribe((result: any) => {
      this.carts = result
    })
  }

  applyFilter() {
    let date = this.form.value;
    this.CartsService.getAllCarts(date).subscribe((result: any) => {
      this.carts = result
    })

  }

  deleteCart(cartId: number) {
    this.CartsService.deleteCart(cartId).subscribe((result: any) => {
      this.getAllCarts();
      this.isCartDeleted = true;
    })
  }

  viewCart(products: any) {
    this.productsInViewedCart = []
    products.forEach((product: any) => {
      this.productsService.getProductById(product.productId).subscribe((result: any) => {
        this.productsInViewedCart.push({ product: result, quantity: product.quantity })
      })
    })
    console.log(this.productsInViewedCart)
  }
}
