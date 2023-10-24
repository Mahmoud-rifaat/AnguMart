import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  showError(error: any) {
    // BACKEND DEPENDANT - How the error will be sent from the API
    //Implement a toaster to show the error
    alert(error.message);
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (result: any) => {
        this.products = result;
        this.loading = false;
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  getProductsOfCategory(category: string) {
    this.loading = true;
    if (category != 'All') {
      this.service.getProductsOfCategory(category).subscribe(
        (result: any) => {
          this.products = result;
          this.loading = false;
        },
        (error) => {
          this.showError(error);
        }
      );
    }
  }

  getCategories() {
    this.service.getAllCategories().subscribe(
      (result: any) => {
        this.categories = result;
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  filterCategory(e: any) {
    let category: any = e.target?.value;
    category.toLowerCase() == 'all'
      ? this.getProducts()
      : this.getProductsOfCategory(category);
  }

  addToCart(event: any | undefined) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    if (this.cartProducts.find((product) => product.item.id == event.item.id)) {
      // Implement a toaster here
      alert('Product is already in your cart!');
    } else {
      if (event.quantity > 0) this.cartProducts.push(event);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
}
