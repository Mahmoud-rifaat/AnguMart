import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  getAllCarts(param?: any) {
    let params = new HttpParams();
    params = params.append('startDate', param?.start).append('endDate', param?.end)
    return this.http.get(environment.baseURL + 'carts', { params });
  }

  getCartById(cartId: number) {
    return this.http.get(environment.baseURL + 'carts/' + cartId);
  }

  deleteCart(cartId: number) {
    return this.http.delete(environment.baseURL + 'carts/' + cartId);
  }

}
