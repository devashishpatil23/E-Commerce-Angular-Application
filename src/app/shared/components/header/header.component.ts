import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);
  menuType: string = 'default';
  sellerName: string = '';

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.includes('seller')) {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
      if (localStorage.getItem('seller')) {
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore ? JSON.parse(sellerStore)[0] : null;
        this.sellerName = sellerData.name;
      } else {
        this.sellerName = '';
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
