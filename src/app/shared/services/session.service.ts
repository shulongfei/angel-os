import { Injectable } from '@angular/core';
import { BaseStorage } from './base-storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseStorage {
  _storage = window.sessionStorage
}
