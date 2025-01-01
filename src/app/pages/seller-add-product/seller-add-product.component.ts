import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss',
})
export class SellerAddProductComponent {
  productService: ProductService = inject(ProductService);
  alertMsg: string | undefined;
  alertType = 'info';
  submitProduct(data: Product, form: NgForm) {
    this.productService.addProduct(data).subscribe((res) => {
      this.alertMsg = 'Product successfulluy added';
      this.alertType = 'success';
      form.resetForm();
      setTimeout(() => {
        this.alertMsg = '';
        this.alertType = '';
      }, 3000);
    });
  }
}
