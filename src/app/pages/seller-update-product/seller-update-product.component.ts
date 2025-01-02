import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss',
})
export class SellerUpdateProductComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  productService: ProductService = inject(ProductService);
  productData: Product | undefined;
  alertMsg: string | undefined;
  alertType: string | undefined;
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');

    productId &&
      this.productService.getProduct(productId).subscribe((res) => {
        this.productData = res;
      });
  }

  submitProduct(data: Product, form: NgForm) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.upadteProduct(data).subscribe((res) => {
      this.alertMsg = 'Product Updated successfully';
      this.alertType = 'primary';
      form.resetForm();
      this.hideAlert();
    });
  }

  hideAlert() {
    setTimeout(() => {
      this.alertMsg = '';
      this.alertType = '';
      this.router.navigateByUrl('seller-home');
    }, 1000);
  }
}
