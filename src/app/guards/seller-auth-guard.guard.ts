import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerService } from '../services/seller.service';

export const sellerAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const router: Router = inject(Router);
  const sellerService: SellerService = inject(SellerService);
  if (localStorage.getItem('seller')) {
    return true;
  }

  return sellerService.isSellerLoggedIn;
};
