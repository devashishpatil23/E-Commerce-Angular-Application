import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  searchResult: Product[] | undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const query = params.get('query');
      if (query) {
        this.loadSearchResults(query); 
      } else {
        this.searchResult = undefined;  
      }
    });
  }

  private loadSearchResults(query: string): void {
    this.productService.searchProduct(query).subscribe((data) => {
      this.searchResult = data;
    });
  }
}
