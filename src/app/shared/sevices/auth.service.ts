import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  getToken():any {
    return localStorage.getItem('angular-token');
  }

  setToken(token):any {
    localStorage.setItem('angular-token', token);
  }

  removeToken():any {
    localStorage.removeItem('angular-token');
  }
  
}