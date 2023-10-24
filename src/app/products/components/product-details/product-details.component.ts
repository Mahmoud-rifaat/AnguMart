import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  id: any;
  productData: any = {};
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProductsService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductData();
  }

  getProductData() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(
      (result) => {
        this.productData = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert(error.message);
      }
    );
  }
}
