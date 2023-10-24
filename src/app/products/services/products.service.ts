import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Dependency Injection
  constructor(private http: HttpClient) { }

  // WE can optimize all those requests by filtering the data in the service
  getAllProducts() {
    return this.http.get(environment.baseURL + 'products');
  }

  getProductsOfCategory(category: string) {
    return this.http.get(environment.baseURL + `products/category/${category}`);
  }

  getAllCategories() {
    return this.http.get(environment.baseURL + 'products/categories');
  }

  getProductById(prodictId: any) {
    return this.http.get(environment.baseURL + 'products/' + prodictId);
  }

  addProduct(product: any) {
    return this.http.post(environment.baseURL + 'products/', product);
  }

  editProduct(prodictId: any, product: any) {
    return this.http.put(environment.baseURL + 'products/' + prodictId, product);
  }

  deleteProduct(productId: any) {
    return this.http.delete(environment.baseURL + 'products/' + productId);
  }
}
