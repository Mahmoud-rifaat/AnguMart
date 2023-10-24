import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: string[] = []; //To be brought from the BackEnd
  products: any[] = []; //To be brought from the BackEnd
  loading: boolean = false;
  productCategory: string = '';
  base64: any = ''; // To set the image src
  form!: FormGroup; // A form group for the add/edit modal
  currentProduct: any = {};

  // To know whether the modal is triggered for editing or for adding:
  isEditing: boolean = false;

  constructor(private productsService: ProductsService, private build: FormBuilder) { }

  ngOnInit() {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
    this.getProducts();
    this.getCategories();
  }

  showError(error: any) {
    // BACKEND DEPENDANT - How the error will be sent from the API
    //Implement a toaster to show the error
    alert(error.message);
  }

  // Getting the products from the backend
  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (result: any) => {
        this.products = result;
        this.loading = false;
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  // To set the form value for category when a selection is made
  selectCategory(event: any) {
    let productCategory = event.target?.value.toLowerCase();
    this.form.get('category')?.setValue(productCategory);
  }

  // Triggered when uploading an img
  getImagePath(e: any) {
    const file = e.target.files[0];

    // For uploading image as base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
    }
    console.log(file);
    console.log(e.target.value);


    // For uploading image as file
    this.form.get('image')?.setValue(file);
  }


  // To get all the categories to be used in the select
  getCategories() {
    this.productsService.getAllCategories().subscribe(
      (result: any) => {
        this.categories = result;
      },
      (error) => {
        this.showError(error);
      }
    );
  }


  // Triggered when Add new button is clicked, sets the modal to be used as add, resets the modal data
  openAddProductModal() {
    this.isEditing = false;
    this.form.reset();
    this.base64 = '';
  }


  // Triggered when we confirm the addition/edit, sends request
  addProduct() {
    let product = this.form.value;

    if (this.isEditing) {
      this.productsService.editProduct(this.currentProduct.id, product).subscribe(result => {
        console.log(result);
        console.log('Product Edited Successfully');
      },
        (error) => {
          this.showError(error);
        })
    }
    else {
      this.productsService.addProduct(product).subscribe(result => {
        console.log(result);
        console.log('Product Added Successfully');
      },
        (error) => {
          this.showError(error);
        })
    }
  }


  // Triggered when we Edit button is clicked, sets the form data
  editProduct(product: any) {
    this.isEditing = true;
    this.currentProduct = product;
    this.form.patchValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    })
    // To show the product image
    this.base64 = product.image;
  }

  deleteProduct(product: any) {
    this.productsService.deleteProduct(product.id).subscribe(result => {
      console.log(result);
    }, (error) => {
      this.showError(error);
    })
  }
}
