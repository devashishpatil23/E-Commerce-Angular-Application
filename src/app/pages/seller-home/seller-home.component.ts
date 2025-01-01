import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss',
})
export class SellerHomeComponent {
  productService: ProductService = inject(ProductService);
  productList: Product[] | undefined = [];
  alertMsg: string | undefined;
  alertType: string | undefined;
  faTrash = faTrash;
  faEdit = faEdit;

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.productList().subscribe((res) => {
      this.productList = res;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.alertMsg = 'Product deleted successfully';
        this.alertType = 'primary';
        this.getProductList();
        this.hideAlert();
      },
      error: (err) => {
        this.alertMsg = err.message;
        this.alertType = 'danger';
        this.hideAlert();
      },
    });
  }

  hideAlert() {
    setTimeout(() => {
      this.alertMsg = '';
      this.alertType = '';
    }, 3000);
  }
}
