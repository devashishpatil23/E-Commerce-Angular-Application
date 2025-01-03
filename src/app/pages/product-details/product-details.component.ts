import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  productData: undefined | Product;
  productQuatity: number = 1;

  ngOnInit(): void {
    let ProductId = this.activatedRoute.snapshot.paramMap.get('productId');
    ProductId &&
      this.productService.getProduct(ProductId).subscribe((data) => {
        this.productData = data;
      });
  }

  handleQuantity(val: string) {
    if (this.productQuatity < 10 && val === 'add') {
      this.productQuatity += 1;
    } else if (this.productQuatity > 1 && val === 'min') {
      this.productQuatity -= 1;
    }
  }
}
