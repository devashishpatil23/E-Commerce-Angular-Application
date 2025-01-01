import { Component, inject, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../../models/interface';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss',
})
export class SellerAuthComponent implements OnInit {
  sellerService: SellerService = inject(SellerService);
  private router: Router = inject(Router);
  showSignUp: boolean = false;

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }
  signUp(data: SignUp): void {
    this.sellerService.userSignUp(data);
  }
  login(data: Login): void {
    this.sellerService.userLogin(data);
  }
}
