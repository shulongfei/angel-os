import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  CanActivateChild, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../sevices/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router,
    private authService: AuthService) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    if (this.authService.getToken()) {
      if (url === '/login') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
