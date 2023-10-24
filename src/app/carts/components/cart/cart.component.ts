import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { AuthenticationService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  cartTotal: number = 0;
  success: boolean = false;
  constructor(private service: CartsService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.cartProducts);
    this.getCartTotal();
  }

  increaseQuantity(index: number) {
    this.cartProducts[index].quantity++;
    this.updateLocalStorage();
  }

  decreaseQuantity(index: number) {
    this.cartProducts[index].quantity--;
    if (this.cartProducts[index].quantity <= 0) {
      this.deleteProduct(index);
    }
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateLocalStorage();
  }

  clearCart() {
    this.cartProducts.splice(0, this.cartProducts.length);
    this.updateLocalStorage();
  }

  getCartTotal() {
    this.cartTotal = 0;
    this.cartProducts.forEach(
      (product) =>
      (this.cartTotal =
        this.cartTotal + product.quantity * product.item.price)
    );
    console.log(this.cartTotal);
  }

  // BACKEND DEPENDANT
  orderNow() {
    let productsIds = this.cartProducts.map((product) => {
      return { prodictId: product.item.id, quantity: product.quantity };
    });

    let Model = {
      userId: 5,
      date: new Date(),
      products: productsIds,
    };
    console.log(Model);
    //Here we should send
    this.service.createNewCart(Model).subscribe(
      (result) => {
        this.success = true;
      },
      (error) => console.log(error.message)
    );
  }
}
