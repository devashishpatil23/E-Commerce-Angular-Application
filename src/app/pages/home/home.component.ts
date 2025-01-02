import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  popularProducts: Product[] | undefined;
  trendyProducts: Product[] | undefined;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    forkJoin({
      popular: this.productService.popularPoducts(),
      trendy: this.productService.trendyroducts(),
    }).subscribe({
      next: ({ popular, trendy }) => {
        this.popularProducts = popular;
        this.trendyProducts = trendy;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
}
